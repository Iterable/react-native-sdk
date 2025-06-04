package com.iterable.reactnative;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import com.iterable.reactnative.bridge.IterableBridge;
import com.iterable.reactnative.bridge.IterableConfig;
import com.iterable.reactnative.bridge.IterableInAppMessage;
import com.iterable.reactnative.bridge.IterableInAppLocation;
import com.iterable.reactnative.bridge.IterableInAppCloseSource;
import com.iterable.reactnative.bridge.IterableInAppDeleteSource;
import com.iterable.reactnative.bridge.IterableCommerceItem;
import com.iterable.reactnative.bridge.IterableAttributionInfo;

@ReactModule(name = RNIterableAPISpec.NAME)
public abstract class RNIterableAPISpec extends ReactContextBaseJavaModule implements TurboModule {
    public static final String NAME = "RNIterableAPI";

    public RNIterableAPISpec(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public abstract void initializeWithApiKey(String apiKey, ReadableMap config, String version, Promise promise);

    @ReactMethod
    public abstract void initialize2WithApiKey(String apiKey, ReadableMap config, String apiEndPoint, String version, Promise promise);

    @ReactMethod
    public abstract void setEmail(String email, String authToken);

    @ReactMethod
    public abstract void getEmail(Promise promise);

    @ReactMethod
    public abstract void setUserId(String userId, String authToken);

    @ReactMethod
    public abstract void getUserId(Promise promise);

    @ReactMethod
    public abstract void disableDeviceForCurrentUser();

    @ReactMethod
    public abstract void getLastPushPayload(Promise promise);

    @ReactMethod
    public abstract void trackPushOpen(double campaignId, Double templateId, String messageId, boolean appAlreadyRunning, ReadableMap dataFields);

    @ReactMethod
    public abstract void getInAppMessages(Promise promise);

    @ReactMethod
    public abstract void getInboxMessages(Promise promise);

    @ReactMethod
    public abstract void getUnreadInboxMessagesCount(Promise promise);

    @ReactMethod
    public abstract void showMessage(String messageId, boolean consume, Promise promise);

    @ReactMethod
    public abstract void setReadForMessage(String messageId, boolean read);

    @ReactMethod
    public abstract void removeMessage(String messageId, double location, double deleteSource);

    @ReactMethod
    public abstract void trackEvent(String name, ReadableMap dataFields);

    @ReactMethod
    public abstract void updateUser(ReadableMap dataFields, boolean mergeNestedObjects);

    @ReactMethod
    public abstract void updateEmail(String email, String authToken);

    @ReactMethod
    public abstract void getAttributionInfo(Promise promise);

    @ReactMethod
    public abstract void setAttributionInfo(ReadableMap attributionInfo);

    @ReactMethod
    public abstract void updateCart(ReadableArray items);

    @ReactMethod
    public abstract void trackPurchase(double total, ReadableArray items, ReadableMap dataFields);

    @ReactMethod
    public abstract void trackInAppOpen(String messageId, double location);

    @ReactMethod
    public abstract void trackInAppClick(String messageId, double location, String clickedUrl);

    @ReactMethod
    public abstract void trackInAppClose(String messageId, double location, double source, String clickedUrl);

    @ReactMethod
    public abstract void inAppConsume(String messageId, double location, double source);

    @ReactMethod
    public abstract void handleAppLink(String appLink, Promise promise);
}
