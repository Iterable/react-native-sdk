package com.iterable.reactnative;

import android.net.Uri;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.iterable.iterableapi.IterableApi;
import com.iterable.iterableapi.IterableHelper;
import com.iterable.iterableapi.IterableInAppCloseAction;
import com.iterable.iterableapi.IterableInAppLocation;
import com.iterable.iterableapi.IterableInAppMessage;
import com.iterable.iterableapi.IterableLogger;
import com.iterable.iterableapi.RNIterableInternal;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class RNIterableAPIModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private static String TAG = "RNIterableAPIModule";

    public RNIterableAPIModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNIterableAPI";
    }

    @ReactMethod
    public void initializeWithApiKey(String apiKey, ReadableMap context, String version) {
        IterableLogger.d(TAG, "initializeWithApiKey: " + apiKey);
        IterableApi.getInstance().initialize(reactContext, apiKey);
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

    // ---------------------------------------------------------------------------------------
    // endregion

    private static Integer[] readableArrayToIntegerArray(ReadableArray array) {
        Integer[] integers = new Integer[array.size()];
        for (int i = 0; i < array.size(); i++) {
            integers[i] = array.getInt(i);
        }
        return integers;
    }
}
