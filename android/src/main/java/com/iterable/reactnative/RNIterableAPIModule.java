package com.iterable.reactnative;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.iterable.iterableapi.InboxSessionManager;
import com.iterable.iterableapi.IterableAction;
import com.iterable.iterableapi.IterableActionContext;
import com.iterable.iterableapi.IterableApi;
import com.iterable.iterableapi.IterableAuthHandler;
import com.iterable.iterableapi.IterableConfig;
import com.iterable.iterableapi.IterableCustomActionHandler;
import com.iterable.iterableapi.IterableAttributionInfo;
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

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class RNIterableAPIModule extends ReactContextBaseJavaModule implements IterableUrlHandler, IterableCustomActionHandler, IterableInAppHandler, IterableAuthHandler, IterableInAppManager.Listener {
    private final ReactApplicationContext reactContext;
    private static String TAG = "RNIterableAPIModule";

    private InAppResponse inAppResponse = InAppResponse.SHOW;

    //A CountDownLatch. This helps decide whether to handle the in-app in Default way by waiting for JS to respond in runtime.
    private CountDownLatch jsCallBackLatch;

    private CountDownLatch authHandlerCallbackLatch;
    private String passedAuthToken = null;

    private final InboxSessionManager sessionManager = new InboxSessionManager();

    public RNIterableAPIModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    // ---------------------------------------------------------------------------------------
    // region IterableSDK calls

    @Override
    public String getName() {
        return "RNIterableAPI";
    }

    @ReactMethod
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

        IterableApi.initialize(reactContext, apiKey, configBuilder.build());
        IterableApi.getInstance().setDeviceAttribute("reactNativeSDKVersion", version);

        IterableApi.getInstance().getInAppManager().addListener(this);

        // TODO: Figure out what the error cases are and handle them appropriately
        // This is just here to match the TS types and let the JS thread know when we are done initializing
        promise.resolve(true);
    }

    @ReactMethod
    public void setEmail(@Nullable String email) {
        IterableLogger.d(TAG, "setEmail: " + email);
        IterableApi.getInstance().setEmail(email);
    }

    @ReactMethod
    public void setEmail(@Nullable String email, @Nullable String authToken) {
        IterableLogger.d(TAG, "setEmail: " + email + " authToken: " + authToken);

        IterableApi.getInstance().setEmail(email, authToken);
    }

    @ReactMethod
    public void updateEmail(String email) {
        IterableLogger.d(TAG, "updateEmail: " + email);

        IterableApi.getInstance().updateEmail(email);
    }

    @ReactMethod
    public void updateEmail(String email, @Nullable String authToken) {
        IterableLogger.d(TAG, "updateEmail: " + email + " authToken: " + authToken);

        IterableApi.getInstance().updateEmail(email, authToken);
    }

    @ReactMethod
    public void getEmail(Promise promise) {
        promise.resolve(RNIterableInternal.getEmail());
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }

    @ReactMethod
    public void setUserId(@Nullable String userId) {
        IterableLogger.d(TAG, "setUserId: " + userId);
        IterableApi.getInstance().setUserId(userId);
    }

    @ReactMethod
    public void setUserId(@Nullable String userId, @Nullable String authToken) {
        IterableLogger.d(TAG, "setUserId: " + userId + " authToken: " + authToken);
        
        IterableApi.getInstance().setUserId(userId, authToken);
    }

    @ReactMethod
    public void updateUser(ReadableMap dataFields, Boolean mergeNestedObjects) {
        IterableLogger.v(TAG, "updateUser");
        IterableApi.getInstance().updateUser(optSerializedDataFields(dataFields));
    }

    @ReactMethod
    public void getUserId(Promise promise) {
        promise.resolve(RNIterableInternal.getUserId());
    }

    @ReactMethod
    public void trackEvent(String name, ReadableMap dataFields) {
        IterableLogger.v(TAG, "trackEvent");
        IterableApi.getInstance().track(name, optSerializedDataFields(dataFields));
    }

    @ReactMethod
    public void updateCart(ReadableArray items) {
        IterableLogger.v(TAG, "updateCart");
        IterableApi.getInstance().updateCart(Serialization.commerceItemsFromReadableArray(items));
    }

    @ReactMethod
    public void trackPurchase(Double total, ReadableArray items, ReadableMap dataFields) {
        IterableLogger.v(TAG, "trackPurchase");
        IterableApi.getInstance().trackPurchase(total, Serialization.commerceItemsFromReadableArray(items), optSerializedDataFields(dataFields));
    }

    @ReactMethod
    public void trackPushOpenWithCampaignId(Integer campaignId, Integer templateId, String messageId, Boolean appAlreadyRunning, ReadableMap dataFields) {
        RNIterableInternal.trackPushOpenWithCampaignId(campaignId, templateId, messageId, optSerializedDataFields(dataFields));
    }

    @ReactMethod
    public void updateSubscriptions(ReadableArray emailListIds, ReadableArray unsubscribedChannelIds, ReadableArray unsubscribedMessageTypeIds, ReadableArray subscribedMessageTypeIds, Integer campaignId, Integer templateId) {
        IterableLogger.v(TAG, "updateSubscriptions");
        Integer finalCampaignId = null, finalTemplateId = null;
        if (campaignId > 0) {
            finalCampaignId = campaignId;
        }
        if (templateId > 0) {
            finalTemplateId = templateId;
        }
        IterableApi.getInstance().updateSubscriptions(readableArrayToIntegerArray(emailListIds),
                readableArrayToIntegerArray(unsubscribedChannelIds),
                readableArrayToIntegerArray(unsubscribedMessageTypeIds),
                readableArrayToIntegerArray(subscribedMessageTypeIds),
                finalCampaignId,
                finalTemplateId
        );
    }

    @ReactMethod
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

    @ReactMethod
    public void setReadForMessage(String messageId, boolean read) {
        IterableLogger.v(TAG, "setReadForMessage");
        IterableApi.getInstance().getInAppManager().setRead(RNIterableInternal.getMessageById(messageId), read);
    }

    @ReactMethod
    public void removeMessage(String messageId, Integer location, Integer deleteSource) {
        IterableLogger.v(TAG, "removeMessage");
        IterableApi.getInstance().getInAppManager().removeMessage(RNIterableInternal.getMessageById(messageId), Serialization.getIterableDeleteActionTypeFromInteger(deleteSource), Serialization.getIterableInAppLocationFromInteger(location));
    }

    @ReactMethod
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

    @ReactMethod
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

    @ReactMethod
    public void setAttributionInfo(ReadableMap attributionInfoReadableMap) {
        IterableLogger.printInfo();
        try {
            JSONObject attributionInfoJson = Serialization.convertMapToJson(attributionInfoReadableMap);
            IterableAttributionInfo attributionInfo = IterableAttributionInfo.fromJSONObject(attributionInfoJson);
            RNIterableInternal.setAttributionInfo(attributionInfo);
        } catch (JSONException e) {
            IterableLogger.e(TAG, "Failed converting ReadableMap to JSON");
        }
    }

    @ReactMethod
    public void getLastPushPayload(Promise promise) {
        Bundle payloadData = IterableApi.getInstance().getPayloadData();
        if (payloadData != null) {
            promise.resolve(Arguments.fromBundle(IterableApi.getInstance().getPayloadData()));
        } else {
            IterableLogger.d(TAG, "No payload data found");
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void disableDeviceForCurrentUser() {
        IterableLogger.v(TAG, "disableDevice");
        IterableApi.getInstance().disablePush();
    }

    @ReactMethod
    public void handleAppLink(String uri, Promise promise) {
        IterableLogger.printInfo();
        promise.resolve(IterableApi.getInstance().handleAppLink(uri));
    }

    // ---------------------------------------------------------------------------------------
    // endregion

    // ---------------------------------------------------------------------------------------
    // region Track APIs
    @ReactMethod
    public void trackInAppOpen(String messageId, @Nullable Integer location) {
        IterableInAppMessage message = RNIterableInternal.getMessageById(messageId);

        if (message == null) {
            IterableLogger.d(TAG, "Failed to get in-app for message ID: " + messageId);
            return;
        }

        IterableApi.getInstance().trackInAppOpen(message, Serialization.getIterableInAppLocationFromInteger(location));
    }

    @ReactMethod
    public void trackInAppClick(String messageId, @Nullable Integer location, String clickedUrl) {
        IterableInAppMessage message = RNIterableInternal.getMessageById(messageId);
        IterableInAppLocation inAppOpenLocation = Serialization.getIterableInAppLocationFromInteger(location);

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

    @ReactMethod
    public void trackInAppClose(String messageId, Integer location, Integer source, @Nullable String clickedUrl) {
        IterableInAppMessage inAppMessage = RNIterableInternal.getMessageById(messageId);
        IterableInAppLocation inAppCloseLocation = Serialization.getIterableInAppLocationFromInteger(location);
        IterableInAppCloseAction closeAction = Serialization.getIterableInAppCloseSourceFromInteger(source);

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

    @ReactMethod
    public void inAppConsume(String messageId, Integer location, Integer source) {
        if (messageId == null) {
            return;
        }
        IterableApi.getInstance().inAppConsume(RNIterableInternal.getMessageById(messageId), Serialization.getIterableDeleteActionTypeFromInteger(source), Serialization.getIterableInAppLocationFromInteger(location));
    }

    @ReactMethod
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

    @ReactMethod
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

    @ReactMethod
    public void setInAppShowResponse(Integer number) {
        IterableLogger.printInfo();
        inAppResponse = Serialization.getInAppResponse(number);
        if (jsCallBackLatch != null) {
            jsCallBackLatch.countDown();
        }
    }

    @ReactMethod
    public void setAutoDisplayPaused(final boolean paused) {
        IterableLogger.printInfo();
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                IterableApi.getInstance().getInAppManager().setAutoDisplayPaused(paused);
            }
        });
    }

    @ReactMethod
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

    @ReactMethod
    public void startSession(ReadableArray visibleRows) {
        List<IterableInboxSession.Impression> serializedRows = Serialization.impressionsFromReadableArray(visibleRows);

        sessionManager.startSession(serializedRows);
    }

    @ReactMethod
    public void endSession() {
        sessionManager.endSession();
    }

    @ReactMethod
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
    public InAppResponse onNewInApp(@NonNull IterableInAppMessage message) {
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
            return InAppResponse.SHOW;
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
    public void onTokenRegistrationSuccessful(String authToken) {
        IterableLogger.v(TAG, "authToken successfully set");
        //TODO: Pass successhandler to event listener
        sendEvent(EventName.handleAuthSuccessCalled.name(), null);
    }

    @Override
    public void onTokenRegistrationFailed(Throwable object) {
        IterableLogger.v(TAG, "Failed to set authToken");
        sendEvent(EventName.handleAuthFailureCalled.name(), null);
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    // ---------------------------------------------------------------------------------------
    // endregion

    // ---------------------------------------------------------------------------------------
    // region Misc Bridge Functions

    @ReactMethod
    public void passAlongAuthToken(String authToken) {
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
}

enum EventName {
    handleUrlCalled,
    handleCustomActionCalled,
    handleInAppCalled,
    handleAuthCalled,
    receivedIterableInboxChanged,
    handleAuthSuccessCalled,
    handleAuthFailureCalled
}
