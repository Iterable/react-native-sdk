package com.iterable.reactnative;

import android.content.Context;
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
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.google.firebase.messaging.RemoteMessage;
import com.iterable.iterableapi.IterableAction;
import com.iterable.iterableapi.IterableActionContext;
import com.iterable.iterableapi.IterableApi;
import com.iterable.iterableapi.IterableConfig;
import com.iterable.iterableapi.IterableCustomActionHandler;
import com.iterable.iterableapi.IterableAttributionInfo;
import com.iterable.iterableapi.IterableFirebaseMessagingService;
import com.iterable.iterableapi.IterableHelper;
import com.iterable.iterableapi.IterableInAppCloseAction;
import com.iterable.iterableapi.IterableInAppHandler;
import com.iterable.iterableapi.IterableInAppLocation;
import com.iterable.iterableapi.IterableInAppMessage;
import com.iterable.iterableapi.IterableLogger;
import com.iterable.iterableapi.IterableUrlHandler;
import com.iterable.iterableapi.RNIterableInternal;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class RNIterableAPIModule extends ReactContextBaseJavaModule implements IterableUrlHandler, IterableCustomActionHandler, IterableInAppHandler {

    private final ReactApplicationContext reactContext;
    private static String TAG = "RNIterableAPIModule";

    private InAppResponse inAppResponse = InAppResponse.SHOW;

    //A CountDownlatch. This helps decide whether to handle the inapp in Default way by waiting for JS to respond in runtime.
    private CountDownLatch jsCallBackLatch;

    public RNIterableAPIModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNIterableAPI";
    }

    @ReactMethod
    public void initializeWithApiKey(String apiKey, ReadableMap configReadableMap, String version) {
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

        IterableApi.initialize(reactContext, apiKey, configBuilder.build());
        IterableApi.getInstance().setDeviceAttribute("reactNativeSDKVersion", version);
    }

    @ReactMethod
    public void setEmail(String email) {
        IterableLogger.d(TAG, "setEmail: " + email);
        IterableApi.getInstance().setEmail(email);
    }

    @ReactMethod
    public void updateEmail(String email) {
        IterableLogger.d(TAG, "Update Email: " + email);
        IterableApi.getInstance().updateEmail(email);
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
        IterableLogger.d(TAG, "setUserId");
        IterableApi.getInstance().setUserId(userId);
    }

    @ReactMethod
    public void updateUser(ReadableMap dataFields, Boolean mergeNestedObjects) {
        IterableLogger.v(TAG, "Update User");
        try {
            IterableApi.getInstance().updateUser(Serialization.convertMapToJson(dataFields));
        } catch (JSONException e) {
            IterableLogger.e(TAG, "Failed passing dataFields to updateUser API");
        }
    }

    @ReactMethod
    public void getUserId(Promise promise) {
        promise.resolve(RNIterableInternal.getUserId());
    }

    @ReactMethod
    public void trackEvent(String name, ReadableMap dataFields) {
        try {
            IterableApi.getInstance().track(name, Serialization.convertMapToJson(dataFields));
        } catch (JSONException e) {
            IterableLogger.e(TAG, "Failed to convert datafields to JSON");
        }
    }

    @ReactMethod
    public void trackPurchase(Double total, ReadableArray items, ReadableMap dataFields) {
        IterableLogger.v(TAG, "TrackPurchase API");
        JSONObject dataFieldsJson = null;
        try {
            if (dataFields != null) {
                dataFieldsJson = Serialization.convertMapToJson(dataFields);
            }
        } catch (JSONException e) {
            IterableLogger.e(TAG, "Failed converting JSON to object");
        }
        IterableApi.getInstance().trackPurchase(total, Serialization.commerceItemsFromReadableArray(items), dataFieldsJson);
    }

    @ReactMethod
    public void trackPushOpenWithCampaignId(Integer campaignId, Integer templateId, String messageId, Boolean appAlreadyRunning, ReadableMap dataFields) {
        JSONObject dataFieldsJson = null;
        if (dataFields != null) {
            try {
                dataFieldsJson = Serialization.convertMapToJson(dataFields);
            } catch (JSONException e) {
                IterableLogger.d(TAG, "Failed to convert to JSON");
            }
        }
        RNIterableInternal.trackPushOpenWithCampaignId(campaignId, templateId, messageId, dataFieldsJson);
    }

    @ReactMethod
    public void updateSubscriptions(ReadableArray emailListIds, ReadableArray unsubscribedChannelIds, ReadableArray unsubscribedMessageTypeIds, ReadableArray subscribedMessageTypeIds, Integer campaignId, Integer templateId) {
        IterableLogger.v(TAG, "updateSubscriptions");
        IterableApi.getInstance().updateSubscriptions(readableArrayToIntegerArray(emailListIds),
                readableArrayToIntegerArray(unsubscribedChannelIds),
                readableArrayToIntegerArray(unsubscribedMessageTypeIds),
                readableArrayToIntegerArray(subscribedMessageTypeIds),
                campaignId,
                templateId);
    }

    @ReactMethod
    public void showMessage(String messageId, boolean consume, final Promise promise) {
        if (messageId == null || messageId == "") {
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
    public void getAttributionInfo(Promise promise) {
        IterableLogger.printInfo();
        IterableAttributionInfo attributionInfo = IterableApi.getInstance().getAttributionInfo();
        if (attributionInfo == null) {
            promise.resolve(null);
            return;
        }
        try {
            promise.resolve(Serialization.convertJsonToMap(attributionInfo.toJSONObject()));
        } catch (JSONException e) {
            IterableLogger.e(TAG, "Failed converting attribution info to JSONObject");
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
        }
    }

    @ReactMethod
    public void disableDeviceForCurrentUser() {
        IterableLogger.v(TAG, "Disable Device");
        IterableApi.getInstance().disablePush();
    }

    @ReactMethod
    public void handleAppLink(String uri, Promise promise) {
        IterableLogger.printInfo();
        promise.resolve(IterableApi.getInstance().handleAppLink(uri));
    }

    // region Track APIs
    // ---------------------------------------------------------------------------------------
    @ReactMethod
    public void trackInAppOpen(String messageId, @Nullable Integer location) {
        IterableInAppMessage message = RNIterableInternal.getMessageById(messageId);
        if (message == null) {
            IterableLogger.d(TAG, "Failed to get InApp for message id : " + messageId);
            return;
        }
        IterableApi.getInstance().trackInAppOpen(message, Serialization.getIterableInAppLocationFromInteger(location));
    }

    @ReactMethod
    public void trackInAppClick(String messageId, @Nullable Integer location, String clickedUrl) {
        IterableInAppMessage message = RNIterableInternal.getMessageById(messageId);
        IterableInAppLocation inAppOpenLocation = Serialization.getIterableInAppLocationFromInteger(location);
        if (message == null) {
            IterableLogger.d(TAG, "Failed to get InApp for message id : " + messageId);
            return;
        }
        if (clickedUrl == null) {
            IterableLogger.d(TAG, "clickedURL is null");
            return;
        }
        if (inAppOpenLocation == null) {
            IterableLogger.d(TAG, "in-app open location is null");
            return;
        }
        IterableApi.getInstance().trackInAppClick(message, clickedUrl, inAppOpenLocation);
    }

    @ReactMethod
    public void trackInAppClose(String messageId, Integer location, Integer source, String clickedUrl) {
        IterableInAppLocation inAppCloseLocation = Serialization.getIterableInAppLocationFromInteger(location);
        IterableInAppCloseAction closeAction = Serialization.getIterableInAppCloseSourceFromInteger(source);
        if (messageId == null || clickedUrl == null || inAppCloseLocation == null || closeAction == null) {
            IterableLogger.d(TAG, "null parameter passed to IterableAPI API");
            return;
        }
        RNIterableInternal.trackInAppClose(messageId, clickedUrl, closeAction, inAppCloseLocation);
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

    // ---------------------------------------------------------------------------------------
    // endregion

    private static Integer[] readableArrayToIntegerArray(ReadableArray array) {
        Integer[] integers = new Integer[array.size()];
        for (int i = 0; i < array.size(); i++) {
            integers[i] = array.getInt(i);
        }
        return integers;
    }


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
        return true;
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

    // ---------------------------------------------------------------------------------------
    // endregion

    // ---------------------------------------------------------------------------------------
    // region IterableSDK Firebase methods

    public void handleFirebaseMessageReceived(@NonNull Context context, @NonNull RemoteMessage remoteMessage) {
        IterableLogger.printInfo();
        IterableFirebaseMessagingService.handleMessageReceived(context, remoteMessage);
    }

    public void handleFirebaseTokenRefresh() {
        IterableLogger.printInfo();
        IterableFirebaseMessagingService.handleTokenRefresh();
    }

    // ---------------------------------------------------------------------------------------
    // endregion

    public void sendEvent(@NonNull String eventName, @Nullable Object eventData) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }

}

enum EventName {
    handleUrlCalled,
    handleCustomActionCalled,
    handleInAppCalled
}
