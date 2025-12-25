package com.iterable.reactnative;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.iterable.iterableapi.AuthFailure;
import com.iterable.iterableapi.InboxSessionManager;
import com.iterable.iterableapi.IterableAction;
import com.iterable.iterableapi.IterableActionContext;
import com.iterable.iterableapi.IterableApi;
import com.iterable.iterableapi.IterableAttributionInfo;
import com.iterable.iterableapi.IterableAuthHandler;
import com.iterable.iterableapi.IterableAuthManager;
import com.iterable.iterableapi.IterableConfig;
import com.iterable.iterableapi.IterableCustomActionHandler;
import com.iterable.iterableapi.IterableEmbeddedMessage;
import com.iterable.iterableapi.IterableHelper;
import com.iterable.iterableapi.IterableInAppCloseAction;
import com.iterable.iterableapi.IterableInAppHandler;
import com.iterable.iterableapi.IterableInAppLocation;
import com.iterable.iterableapi.IterableInAppManager;
import com.iterable.iterableapi.IterableInAppMessage;
import com.iterable.iterableapi.IterableInboxSession;
import com.iterable.iterableapi.IterableLogger;
import com.iterable.iterableapi.IterableUrlHandler;
import com.iterable.iterableapi.RNIterableInternal;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class RNIterableAPIModuleImpl implements IterableUrlHandler, IterableCustomActionHandler, IterableInAppHandler, IterableAuthHandler, IterableInAppManager.Listener, IterableEmbeddedUpdateHandler {
    public static final String NAME = "RNIterableAPI";

    private static String TAG = "RNIterableAPIModule";
    private final ReactApplicationContext reactContext;

    private IterableInAppHandler.InAppResponse inAppResponse = IterableInAppHandler.InAppResponse.SHOW;

    //A CountDownLatch. This helps decide whether to handle the in-app in Default way by waiting for JS to respond in runtime.
    private CountDownLatch jsCallBackLatch;

    private CountDownLatch authHandlerCallbackLatch;
    private String passedAuthToken = null;

    private final InboxSessionManager sessionManager = new InboxSessionManager();

    public RNIterableAPIModuleImpl(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void initializeWithApiKey(String apiKey, ReadableMap configReadableMap, String version, Promise promise) {
        IterableLogger.d(TAG, "initializeWithApiKey: " + apiKey);
        IterableConfig.Builder configBuilder = Serialization.getConfigFromReadableMap(configReadableMap);

        if (configReadableMap.hasKey("urlHandlerPresent") && configReadableMap.getBoolean("urlHandlerPresent") == true) {
            configBuilder.setUrlHandler(this);
        }

        if (configReadableMap.hasKey("customActionHandlerPresent") && configReadableMap.getBoolean("customActionHandlerPresent") == true) {
            configBuilder.setCustomActionHandler(this);
        }

        if (configReadableMap.hasKey("inAppHandlerPresent") && configReadableMap.getBoolean("inAppHandlerPresent") == true) {
            configBuilder.setInAppHandler(this);
        }

        if (configReadableMap.hasKey("authHandlerPresent") && configReadableMap.getBoolean("authHandlerPresent") == true) {
            configBuilder.setAuthHandler(this);
        }

        IterableConfig config = configBuilder.build();
        IterableApi.initialize(reactContext, apiKey, config);

        // Update retry policy on existing authManager if it was already created
        // This fixes the issue where retryInterval is not respected after
        // re-initialization
        // TODO [SDK-197]: Fix the root cause of this issue, instead of this hack
        try {
            // Use reflection to access package-private fields and methods
            java.lang.reflect.Field configRetryPolicyField = config.getClass().getDeclaredField("retryPolicy");
            configRetryPolicyField.setAccessible(true);
            Object retryPolicy = configRetryPolicyField.get(config);

            if (retryPolicy != null) {
                java.lang.reflect.Method getAuthManagerMethod = IterableApi.getInstance().getClass().getDeclaredMethod("getAuthManager");
                getAuthManagerMethod.setAccessible(true);
                IterableAuthManager authManager = (IterableAuthManager) getAuthManagerMethod.invoke(IterableApi.getInstance());

                if (authManager != null) {
                    // Update the retry policy field on the authManager
                    java.lang.reflect.Field authRetryPolicyField = authManager.getClass().getDeclaredField("authRetryPolicy");
                    authRetryPolicyField.setAccessible(true);
                    authRetryPolicyField.set(authManager, retryPolicy);
                    IterableLogger.d(TAG, "Updated retry policy on existing authManager");
                }
            }
        } catch (Exception e) {
            IterableLogger.e(TAG, "Failed to update retry policy: " + e.getMessage());
        }

        IterableApi.getInstance().setDeviceAttribute("reactNativeSDKVersion", version);

        IterableApi.getInstance().getInAppManager().addListener(this);
        IterableApi.getInstance().getEmbeddedManager().syncMessages();

        // MOB-10421: Figure out what the error cases are and handle them appropriately
        // This is just here to match the TS types and let the JS thread know when we are done initializing
        promise.resolve(true);
    }

    public void initialize2WithApiKey(String apiKey, ReadableMap configReadableMap, String version, String apiEndPointOverride, Promise promise) {
        IterableLogger.d(TAG, "initialize2WithApiKey: " + apiKey);
        IterableConfig.Builder configBuilder = Serialization.getConfigFromReadableMap(configReadableMap);

        if (configReadableMap.hasKey("urlHandlerPresent") && configReadableMap.getBoolean("urlHandlerPresent") == true) {
            configBuilder.setUrlHandler(this);
        }

        if (configReadableMap.hasKey("customActionHandlerPresent") && configReadableMap.getBoolean("customActionHandlerPresent") == true) {
            configBuilder.setCustomActionHandler(this);
        }

        if (configReadableMap.hasKey("inAppHandlerPresent") && configReadableMap.getBoolean("inAppHandlerPresent") == true) {
            configBuilder.setInAppHandler(this);
        }

        if (configReadableMap.hasKey("authHandlerPresent") && configReadableMap.getBoolean("authHandlerPresent") == true) {
            configBuilder.setAuthHandler(this);
        }

        // NOTE: There does not seem to be a way to set the API endpoint
        // override in the Android SDK.  Check with @Ayyanchira and @evantk91 to
        // see what the best approach is.

        IterableConfig config = configBuilder.build();
        IterableApi.initialize(reactContext, apiKey, config);

        // Update retry policy on existing authManager if it was already created
        // This fixes the issue where retryInterval is not respected after
        // re-initialization
        // TODO [SDK-197]: Fix the root cause of this issue, instead of this hack
        try {
            // Use reflection to access package-private fields and methods
            java.lang.reflect.Field configRetryPolicyField = config.getClass().getDeclaredField("retryPolicy");
            configRetryPolicyField.setAccessible(true);
            Object retryPolicy = configRetryPolicyField.get(config);

            if (retryPolicy != null) {
                java.lang.reflect.Method getAuthManagerMethod = IterableApi.getInstance().getClass().getDeclaredMethod("getAuthManager");
                getAuthManagerMethod.setAccessible(true);
                IterableAuthManager authManager = (IterableAuthManager) getAuthManagerMethod.invoke(IterableApi.getInstance());

                if (authManager != null) {
                    // Update the retry policy field on the authManager
                    java.lang.reflect.Field authRetryPolicyField = authManager.getClass().getDeclaredField("authRetryPolicy");
                    authRetryPolicyField.setAccessible(true);
                    authRetryPolicyField.set(authManager, retryPolicy);
                    IterableLogger.d(TAG, "Updated retry policy on existing authManager");
                }
            }
        } catch (Exception e) {
            IterableLogger.e(TAG, "Failed to update retry policy: " + e.getMessage());
        }

        IterableApi.getInstance().setDeviceAttribute("reactNativeSDKVersion", version);

        IterableApi.getInstance().getInAppManager().addListener(this);
        IterableApi.getInstance().getEmbeddedManager().syncMessages();

        // MOB-10421: Figure out what the error cases are and handle them appropriately
        // This is just here to match the TS types and let the JS thread know when we are done initializing
        promise.resolve(true);
    }

    public void setEmail(@Nullable String email, @Nullable String authToken) {
        IterableLogger.d(TAG, "setEmail: " + email + " authToken: " + authToken);

        IterableApi.getInstance().setEmail(email, authToken);
    }

    public void updateEmail(String email, @Nullable String authToken) {
        IterableLogger.d(TAG, "updateEmail: " + email + " authToken: " + authToken);

        IterableApi.getInstance().updateEmail(email, authToken);
    }

    public void getEmail(Promise promise) {
        promise.resolve(RNIterableInternal.getEmail());
    }

    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }

    public void setUserId(@Nullable String userId, @Nullable String authToken) {
        IterableLogger.d(TAG, "setUserId: " + userId + " authToken: " + authToken);

        IterableApi.getInstance().setUserId(userId, authToken);
    }

    public void updateUser(ReadableMap dataFields, boolean mergeNestedObjects) {
        IterableLogger.v(TAG, "updateUser");
        IterableApi.getInstance().updateUser(optSerializedDataFields(dataFields), mergeNestedObjects);
    }

    public void getUserId(Promise promise) {
        promise.resolve(RNIterableInternal.getUserId());
    }

    public void trackEvent(String name, @Nullable ReadableMap dataFields) {
        IterableLogger.v(TAG, "trackEvent");
        IterableApi.getInstance().track(name, optSerializedDataFields(dataFields));
    }

    public void updateCart(ReadableArray items) {
        IterableLogger.v(TAG, "updateCart");
        IterableApi.getInstance().updateCart(Serialization.commerceItemsFromReadableArray(items));
    }

    public void trackPurchase(double total, ReadableArray items, @Nullable ReadableMap dataFields) {
        IterableLogger.v(TAG, "trackPurchase");
        IterableApi.getInstance().trackPurchase(total, Serialization.commerceItemsFromReadableArray(items), optSerializedDataFields(dataFields));
    }

    public void trackPushOpenWithCampaignId(double campaignId, @Nullable Double templateId, String messageId, boolean appAlreadyRunning, @Nullable ReadableMap dataFields) {
        RNIterableInternal.trackPushOpenWithCampaignId((int) campaignId, templateId != null ? templateId.intValue() : null, messageId, optSerializedDataFields(dataFields));
    }

    public void updateSubscriptions(@Nullable ReadableArray emailListIds, @Nullable ReadableArray unsubscribedChannelIds, @Nullable ReadableArray unsubscribedMessageTypeIds, @Nullable ReadableArray subscribedMessageTypeIds, double campaignId, double templateId) {
        IterableLogger.v(TAG, "updateSubscriptions");
        Integer finalCampaignId = null, finalTemplateId = null;
        if (campaignId > 0) {
            finalCampaignId = (int) campaignId;
        }
        if (templateId > 0) {
            finalTemplateId = (int) templateId;
        }
        IterableApi.getInstance().updateSubscriptions(readableArrayToIntegerArray(emailListIds),
                readableArrayToIntegerArray(unsubscribedChannelIds),
                readableArrayToIntegerArray(unsubscribedMessageTypeIds),
                readableArrayToIntegerArray(subscribedMessageTypeIds),
                finalCampaignId,
                finalTemplateId
        );
    }

    public void showMessage(String messageId, boolean consume, final Promise promise) {
        if (messageId == null || messageId == "") {
            promise.reject("", "messageId is null or empty");
            return;
        }
        IterableApi.getInstance().getInAppManager().showMessage(RNIterableInternal.getMessageById(messageId), consume, new IterableHelper.IterableUrlCallback() {
            @Override
            public void execute(@Nullable Uri url) {
                promise.resolve(url.toString());
            }
        });
    }

    public void setReadForMessage(String messageId, boolean read) {
        IterableLogger.v(TAG, "setReadForMessage");
        IterableApi.getInstance().getInAppManager().setRead(RNIterableInternal.getMessageById(messageId), read);
    }

    public void removeMessage(String messageId, double location, double deleteSource) {
        IterableLogger.v(TAG, "removeMessage");
        IterableApi.getInstance().getInAppManager().removeMessage(RNIterableInternal.getMessageById(messageId), Serialization.getIterableDeleteActionTypeFromInteger((int) deleteSource), Serialization.getIterableInAppLocationFromInteger((int) location));
    }

    public void getHtmlInAppContentForMessage(String messageId, final Promise promise) {
        IterableLogger.printInfo();
        IterableInAppMessage message = RNIterableInternal.getMessageById(messageId);

        if (message == null) {
            promise.reject("", "Could not find message with id: " + messageId);
            return;
        }

        JSONObject messageContent = Serialization.messageContentToJsonObject(message.getContent());

        if (messageContent == null) {
            promise.reject("", "messageContent is null for message id: " + messageId);
            return;
        }

        try {
            promise.resolve(Serialization.convertJsonToMap(messageContent));
        } catch (JSONException e) {
            promise.reject("", "Failed to convert JSONObject to ReadableMap");
        }
    }

    public void getAttributionInfo(Promise promise) {
        IterableLogger.printInfo();
        IterableAttributionInfo attributionInfo = IterableApi.getInstance().getAttributionInfo();
        if (attributionInfo != null) {
            try {
                promise.resolve(Serialization.convertJsonToMap(attributionInfo.toJSONObject()));
            } catch (JSONException e) {
                IterableLogger.e(TAG, "Failed converting attribution info to JSONObject");
                promise.reject("", "Failed to convert AttributionInfo to ReadableMap");
            }
        } else {
            promise.resolve(null);
        }
    }

    public void setAttributionInfo(@Nullable ReadableMap attributionInfoReadableMap) {
        IterableLogger.printInfo();
        try {
            JSONObject attributionInfoJson = Serialization.convertMapToJson(attributionInfoReadableMap);
            IterableAttributionInfo attributionInfo = IterableAttributionInfo.fromJSONObject(attributionInfoJson);
            RNIterableInternal.setAttributionInfo(attributionInfo);
        } catch (JSONException e) {
            IterableLogger.e(TAG, "Failed converting ReadableMap to JSON");
        }
    }

    public void getLastPushPayload(Promise promise) {
        Bundle payloadData = IterableApi.getInstance().getPayloadData();
        if (payloadData != null) {
            promise.resolve(Arguments.fromBundle(IterableApi.getInstance().getPayloadData()));
        } else {
            IterableLogger.d(TAG, "No payload data found");
            promise.resolve(null);
        }
    }

    public void disableDeviceForCurrentUser() {
        IterableLogger.v(TAG, "disableDevice");
        IterableApi.getInstance().disablePush();
    }

    public void handleAppLink(String uri, Promise promise) {
        IterableLogger.printInfo();
        promise.resolve(IterableApi.getInstance().handleAppLink(uri));
    }

    // ---------------------------------------------------------------------------------------
    // endregion

    // ---------------------------------------------------------------------------------------
    // region Track APIs
    public void trackInAppOpen(String messageId, double location) {
        IterableInAppMessage message = RNIterableInternal.getMessageById(messageId);

        if (message == null) {
            IterableLogger.d(TAG, "Failed to get in-app for message ID: " + messageId);
            return;
        }

        IterableApi.getInstance().trackInAppOpen(message, Serialization.getIterableInAppLocationFromInteger((int) location));
    }

    public void trackInAppClick(String messageId, double location, String clickedUrl) {
        IterableInAppMessage message = RNIterableInternal.getMessageById(messageId);
        IterableInAppLocation inAppOpenLocation = Serialization.getIterableInAppLocationFromInteger((int) location);

        if (message == null) {
            IterableLogger.d(TAG, "Failed to get in-app for message ID: " + messageId);
            return;
        }

        if (clickedUrl == null) {
            IterableLogger.d(TAG, "clickedUrl is null");
            return;
        }

        if (inAppOpenLocation == null) {
            IterableLogger.d(TAG, "in-app open location is null");
            return;
        }

        IterableApi.getInstance().trackInAppClick(message, clickedUrl, inAppOpenLocation);
    }

    public void trackInAppClose(String messageId, double location, double source, @Nullable String clickedUrl) {
        IterableInAppMessage inAppMessage = RNIterableInternal.getMessageById(messageId);
        IterableInAppLocation inAppCloseLocation = Serialization.getIterableInAppLocationFromInteger((int) location);
        IterableInAppCloseAction closeAction = Serialization.getIterableInAppCloseSourceFromInteger((int) source);

        if (inAppMessage == null) {
            IterableLogger.d(TAG, "Failed to get in-app for message ID: " + messageId);
            return;
        }

        if (inAppCloseLocation == null) {
            IterableLogger.d(TAG, "in-app close location is null");
            return;
        }

        if (closeAction == null) {
            IterableLogger.d(TAG, "in-app close action is null");
            return;
        }

        IterableApi.getInstance().trackInAppClose(inAppMessage, clickedUrl, closeAction, inAppCloseLocation);
    }

    // ---------------------------------------------------------------------------------------
    // endregion

    // ---------------------------------------------------------------------------------------
    // region In App APIs

    public void inAppConsume(String messageId, double location, double source) {
        if (messageId != null) {
            IterableLogger.v(TAG, "inAppConsume");
            IterableApi.getInstance().inAppConsume(RNIterableInternal.getMessageById(messageId), Serialization.getIterableDeleteActionTypeFromInteger((int) source), Serialization.getIterableInAppLocationFromInteger((int) location));
        }
    }

    public void getInAppMessages(Promise promise) {
        IterableLogger.d(TAG, "getMessages");
        try {
            JSONArray inAppMessageJsonArray = Serialization.serializeInAppMessages(IterableApi.getInstance().getInAppManager().getMessages());
            promise.resolve(Serialization.convertJsonToArray(inAppMessageJsonArray));
        } catch (JSONException e) {
            IterableLogger.e(TAG, e.getLocalizedMessage());
            promise.reject("", "Failed to fetch messages with error " + e.getLocalizedMessage());
        }
    }

    public void getInboxMessages(Promise promise) {
        IterableLogger.d(TAG, "getInboxMessages");
        try {
            JSONArray inboxMessageJsonArray = Serialization.serializeInAppMessages(IterableApi.getInstance().getInAppManager().getInboxMessages());
            promise.resolve(Serialization.convertJsonToArray(inboxMessageJsonArray));
        } catch (JSONException e) {
            IterableLogger.e(TAG, e.getLocalizedMessage());
            promise.reject("", "Failed to fetch messages with error " + e.getLocalizedMessage());
        }
    }

    public void getUnreadInboxMessagesCount(Promise promise) {
        IterableLogger.d(TAG, "getUnreadInboxMessagesCount");
        try {
            int unreadCount = IterableApi.getInstance().getInAppManager().getUnreadInboxMessagesCount();
            promise.resolve(unreadCount);
        } catch (Exception e) {
            IterableLogger.e(TAG, e.getLocalizedMessage());
            promise.reject("", "Failed to get unread inbox messages count with error " + e.getLocalizedMessage());
        }
    }

    public void setInAppShowResponse(double number) {
        IterableLogger.printInfo();
        inAppResponse = Serialization.getInAppResponse((int) number);
        if (jsCallBackLatch != null) {
            jsCallBackLatch.countDown();
        }
    }

    public void setAutoDisplayPaused(final boolean paused) {
        IterableLogger.printInfo();
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                IterableApi.getInstance().getInAppManager().setAutoDisplayPaused(paused);
            }
        });
    }

    public void wakeApp() {
        Intent launcherIntent = getMainActivityIntent(reactContext);
        launcherIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        if (launcherIntent.resolveActivity(reactContext.getPackageManager()) != null) {
            reactContext.startActivity(launcherIntent);
        }
    }

    public Intent getMainActivityIntent(Context context) {
        Context appContext = context.getApplicationContext();
        PackageManager packageManager = appContext.getPackageManager();
        Intent intent = packageManager.getLaunchIntentForPackage(appContext.getPackageName());
        if (intent == null) {
            intent = new Intent(Intent.ACTION_MAIN, null);
            intent.addCategory(Intent.CATEGORY_LAUNCHER);
            intent.setPackage(appContext.getPackageName());
        }
        return intent;
    }
    // ---------------------------------------------------------------------------------------
    // endregion

    // ---------------------------------------------------------------------------------------
    // region Inbox In-App Session Tracking APIs

    public void startSession(ReadableArray visibleRows) {
        List<IterableInboxSession.Impression> serializedRows = Serialization.impressionsFromReadableArray(visibleRows);

        sessionManager.startSession(serializedRows);
    }

    public void endSession() {
        sessionManager.endSession();
    }

    public void updateVisibleRows(ReadableArray visibleRows) {
        List<IterableInboxSession.Impression> serializedRows = Serialization.impressionsFromReadableArray(visibleRows);

        sessionManager.updateVisibleRows(serializedRows);
    }

    // ---------------------------------------------------------------------------------------
    // endregion

    // ---------------------------------------------------------------------------------------
    // region Private Serialization Functions

    private static Integer[] readableArrayToIntegerArray(ReadableArray array) {
        if (array == null) {
            return null;
        }
        Integer[] integers = new Integer[array.size()];
        for (int i = 0; i < array.size(); i++) {
            integers[i] = array.getInt(i);
        }
        return integers;
    }

    @Nullable
    private static JSONObject optSerializedDataFields(ReadableMap dataFields) {
        JSONObject dataFieldsJson = null;

        if (dataFields != null) {
            try {
                dataFieldsJson = Serialization.convertMapToJson(dataFields);
            } catch (JSONException e) {
                IterableLogger.d(TAG, "Failed to convert dataFields to JSON");
            }
        }

        return dataFieldsJson;
    }

    // ---------------------------------------------------------------------------------------
    // endregion

    // ---------------------------------------------------------------------------------------
    // region IterableSDK callbacks

    @Override
    public boolean handleIterableCustomAction(@NonNull IterableAction action, @NonNull IterableActionContext actionContext) {
        IterableLogger.printInfo();
        JSONObject actionJson = Serialization.actionToJson(action);
        JSONObject actionContextJson = Serialization.actionContextToJson(actionContext);
        JSONObject eventDataJson = new JSONObject();
        try {
            eventDataJson.put("action", actionJson);
            eventDataJson.put("context", actionContextJson);
            WritableMap eventData = Serialization.convertJsonToMap(eventDataJson);
            sendEvent(EventName.handleCustomActionCalled.name(), eventData);
        } catch (JSONException e) {
            IterableLogger.e(TAG, "Failed handling custom action");
        }
        // The Android SDK will not bring the app into focus is this is `true`. It still respects the `openApp` bool flag.
        return false;
    }

    @NonNull
    @Override
    public IterableInAppHandler.InAppResponse onNewInApp(@NonNull IterableInAppMessage message) {
        IterableLogger.printInfo();

        JSONObject messageJson = RNIterableInternal.getInAppMessageJson(message);

        try {
            WritableMap eventData = Serialization.convertJsonToMap(messageJson);
            jsCallBackLatch = new CountDownLatch(1);
            sendEvent(EventName.handleInAppCalled.name(), eventData);
            jsCallBackLatch.await(2, TimeUnit.SECONDS);
            jsCallBackLatch = null;
            return inAppResponse;
        } catch (InterruptedException | JSONException e) {
            IterableLogger.e(TAG, "new in-app module failed");
            return IterableInAppHandler.InAppResponse.SHOW;
        }
    }

    @Override
    public boolean handleIterableURL(@NonNull Uri uri, @NonNull IterableActionContext actionContext) {
        IterableLogger.printInfo();

        JSONObject actionContextJson = Serialization.actionContextToJson(actionContext);
        JSONObject eventDataJson = new JSONObject();

        try {
            eventDataJson.put("url", uri.toString());
            eventDataJson.put("context", actionContextJson);
            WritableMap eventData = Serialization.convertJsonToMap(eventDataJson);
            sendEvent(EventName.handleUrlCalled.name(), eventData);
        } catch (JSONException e) {
            IterableLogger.e(TAG, e.getLocalizedMessage());
        }
        return true;
    }

    @Override
    public String onAuthTokenRequested() {
        IterableLogger.printInfo();

        try {
            authHandlerCallbackLatch = new CountDownLatch(1);
            sendEvent(EventName.handleAuthCalled.name(), null);
            authHandlerCallbackLatch.await(30, TimeUnit.SECONDS);
            authHandlerCallbackLatch = null;
            return passedAuthToken;
        } catch (InterruptedException e) {
            IterableLogger.e(TAG, "auth handler module failed");
            return null;
        }
    }

    @Override
    public void onAuthFailure(AuthFailure authFailure) {
      // Create a JSON object for the authFailure object
      JSONObject messageJson = new JSONObject();
      try {
        messageJson.put("userKey", authFailure.userKey);
        messageJson.put("failedAuthToken", authFailure.failedAuthToken);
        messageJson.put("failedRequestTime", authFailure.failedRequestTime);
        messageJson.put("failureReason", authFailure.failureReason.name());
        WritableMap eventData = Serialization.convertJsonToMap(messageJson);
        sendEvent(EventName.handleAuthFailureCalled.name(), eventData);
      } catch (JSONException e) {
        IterableLogger.v(TAG, "Failed to set authToken");
      }
    }

    public void pauseAuthRetries(boolean pauseRetry) {
        IterableApi.getInstance().pauseAuthRetries(pauseRetry);
    }

    @Override
    public void onTokenRegistrationSuccessful(String authToken) {
        IterableLogger.v(TAG, "authToken successfully set");
        // MOB-10422: Pass successhandler to event listener
        sendEvent(EventName.handleAuthSuccessCalled.name(), null);
    }

    public void addListener(String eventName) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    public void removeListeners(double count) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    public void passAlongAuthToken(@Nullable String authToken) {
        passedAuthToken = authToken;

        if (authHandlerCallbackLatch != null) {
            authHandlerCallbackLatch.countDown();
        }
    }

    public void sendEvent(@NonNull String eventName, @Nullable Object eventData) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }

    @Override
    public void onInboxUpdated() {
        sendEvent(EventName.receivedIterableInboxChanged.name(), null);
    }
    // ---------------------------------------------------------------------------------------
    // endregion

    // ---------------------------------------------------------------------------------------
    // region Embedded messaging

    public void syncEmbeddedMessages() {
        IterableLogger.d(TAG, "syncEmbeddedMessages");
        IterableApi.getInstance().getEmbeddedManager().syncMessages();
    }

    public void startEmbeddedSession() {
        IterableLogger.d(TAG, "startEmbeddedSession");
        IterableApi.getInstance().getEmbeddedManager().getEmbeddedSessionManager().startSession();
    }

    public void endEmbeddedSession() {
        IterableLogger.d(TAG, "endEmbeddedSession");
        IterableApi.getInstance().getEmbeddedManager().getEmbeddedSessionManager().endSession();
    }

    public void startEmbeddedImpression(String messageId, int placementId) {
        IterableLogger.d(TAG, "startEmbeddedImpression");
        IterableApi.getInstance().getEmbeddedManager().getEmbeddedSessionManager().startImpression(messageId, placementId);
    }

    public void pauseEmbeddedImpression(String messageId) {
        IterableLogger.d(TAG, "pauseEmbeddedImpression");
        IterableApi.getInstance().getEmbeddedManager().getEmbeddedSessionManager().pauseImpression(messageId);
    }

    public void getEmbeddedPlacementIds(Promise promise) {
        IterableLogger.d(TAG, "getEmbeddedPlacementIds");
        try {
            List<Long> placementIds = IterableApi.getInstance().getEmbeddedManager().getPlacementIds();
            WritableArray writableArray = Arguments.createArray();
            if (placementIds != null) {
                for (Long placementId : placementIds) {
                    writableArray.pushDouble(placementId.doubleValue());
                }
            }
            promise.resolve(writableArray);
        } catch (Exception e) {
            IterableLogger.e(TAG, "Error getting placement IDs: " + e.getLocalizedMessage());
            promise.reject("", "Failed to get placement IDs: " + e.getLocalizedMessage());
        }
    }

    public void getEmbeddedMessages(@Nullable ReadableArray placementIds, Promise promise) {
        IterableLogger.d(TAG, "getEmbeddedMessages for placements: " + placementIds);

        try {
            List<IterableEmbeddedMessage> allMessages = new ArrayList<>();

            if (placementIds == null || placementIds.size() == 0) {
                // If no placement IDs provided, we need to get messages for all possible placements
                // Since the Android SDK requires a placement ID, we'll use 0 as a default
                // This might need to be adjusted based on the actual SDK behavior
                List<IterableEmbeddedMessage> messages = IterableApi.getInstance().getEmbeddedManager().getMessages(0L);
                if (messages != null) {
                    allMessages.addAll(messages);
                }
            } else {
                // Convert ReadableArray to individual placement IDs and get messages for each
                for (int i = 0; i < placementIds.size(); i++) {
                    long placementId = placementIds.getInt(i);
                    List<IterableEmbeddedMessage> messages = IterableApi.getInstance().getEmbeddedManager().getMessages(placementId);
                    if (messages != null) {
                        allMessages.addAll(messages);
                    }
                }
            }

            JSONArray embeddedMessageJsonArray = Serialization.serializeEmbeddedMessages(allMessages);
            IterableLogger.d(TAG, "Messages for placements: " + embeddedMessageJsonArray);

            promise.resolve(Serialization.convertJsonToArray(embeddedMessageJsonArray));
        } catch (JSONException e) {
            IterableLogger.e(TAG, e.getLocalizedMessage());
            promise.reject("", "Failed to fetch messages with error " + e.getLocalizedMessage());
        }
    }

    public void trackEmbeddedClick(ReadableMap messageMap, String buttonId, String clickedUrl) {
        IterableLogger.d(TAG, "trackEmbeddedClick: buttonId: " + buttonId + " clickedUrl: " + clickedUrl);
        IterableEmbeddedMessage message = Serialization.embeddedMessageFromReadableMap(messageMap);
        if (message != null) {
            IterableApi.getInstance().trackEmbeddedClick(message, buttonId, clickedUrl);
        } else {
            IterableLogger.e(TAG, "Failed to convert message map to IterableEmbeddedMessage");
        }
    }

    @Override
    public void onMessagesUpdated() {
        IterableLogger.d(TAG, "onMessagesUpdated");
        sendEvent(EventName.receivedIterableEmbeddedMessagesChanged.name(), null);
    }

    @Override
    public void onEmbeddedMessagingDisabled() {
        IterableLogger.d(TAG, "onEmbeddedMessagingDisabled");
        sendEvent(EventName.receivedIterableEmbeddedMessagingDisabledCalled.name(), null);
    }

    // ---------------------------------------------------------------------------------------
    // endregion
}

enum EventName {
  handleAuthCalled,
  handleAuthFailureCalled,
  handleAuthSuccessCalled,
  handleCustomActionCalled,
  handleInAppCalled,
  handleUrlCalled,
  receivedIterableEmbeddedMessagesChanged,
  receivedIterableInboxChanged
}
