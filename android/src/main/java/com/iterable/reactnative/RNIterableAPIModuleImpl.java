package com.iterable.reactnative;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import com.iterable.iterableapi.IterableApi;
import com.iterable.iterableapi.IterableConfig;
import com.iterable.iterableapi.IterableInAppManager;
import com.iterable.iterableapi.IterableLogger;

public class RNIterableAPIModuleImpl extends RNIterableAPIModuleSpec {
    private static final String TAG = "RNIterableAPIModuleImpl";

    public RNIterableAPIModuleImpl(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void initializeWithApiKey(String apiKey, ReadableMap config, String version, Promise promise) {
        try {
            IterableConfig iterableConfig = Serialization.getIterableConfigFromReadableMap(config);
            IterableApi.initialize(getReactApplicationContext(), apiKey, iterableConfig);
            IterableApi.getInstance().setDeviceAttribute("reactNativeSDKVersion", version);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("", e.getMessage());
        }
    }

    @Override
    public void initialize2WithApiKey(String apiKey, ReadableMap config, String apiEndPoint, String version, Promise promise) {
        try {
            IterableConfig iterableConfig = Serialization.getIterableConfigFromReadableMap(config);
            IterableApi.initialize(getReactApplicationContext(), apiKey, iterableConfig, apiEndPoint);
            IterableApi.getInstance().setDeviceAttribute("reactNativeSDKVersion", version);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("", e.getMessage());
        }
    }

    @Override
    public void setEmail(String email, String authToken) {
        IterableApi.getInstance().setEmail(email, authToken);
    }

    @Override
    public void getEmail(Promise promise) {
        promise.resolve(IterableApi.getInstance().getEmail());
    }

    @Override
    public void setUserId(String userId, String authToken) {
        IterableApi.getInstance().setUserId(userId, authToken);
    }

    @Override
    public void getUserId(Promise promise) {
        promise.resolve(IterableApi.getInstance().getUserId());
    }

    @Override
    public void disableDeviceForCurrentUser() {
        IterableApi.getInstance().disableDeviceForCurrentUser();
    }

    @Override
    public void setInAppShowResponse(double inAppShowResponse) {
        // Implementation for in-app show response
    }

    @Override
    public void getLastPushPayload(Promise promise) {
        promise.resolve(IterableApi.getInstance().getLastPushPayload());
    }

    @Override
    public void getAttributionInfo(Promise promise) {
        promise.resolve(IterableApi.getInstance().getAttributionInfo());
    }

    @Override
    public void setAttributionInfo(ReadableMap attributionInfo) {
        IterableApi.getInstance().setAttributionInfo(Serialization.getAttributionInfoFromReadableMap(attributionInfo));
    }

    @Override
    public void trackPushOpen(double campaignId, Double templateId, String messageId, boolean appAlreadyRunning, ReadableMap dataFields) {
        IterableApi.getInstance().trackPushOpen(
            (long)campaignId,
            templateId != null ? templateId.longValue() : null,
            messageId,
            appAlreadyRunning,
            Serialization.getMapFromReadableMap(dataFields)
        );
    }

    @Override
    public void updateCart(ReadableArray items) {
        IterableApi.getInstance().updateCart(Serialization.getCommerceItemsFromReadableArray(items));
    }

    @Override
    public void trackPurchase(double total, ReadableArray items, ReadableMap dataFields) {
        IterableApi.getInstance().trackPurchase(
            total,
            Serialization.getCommerceItemsFromReadableArray(items),
            Serialization.getMapFromReadableMap(dataFields)
        );
    }

    @Override
    public void trackInAppOpen(String messageId, double location) {
        IterableInAppManager inAppManager = IterableApi.getInstance().getInAppManager();
        inAppManager.trackInAppOpen(messageId, Serialization.getInAppLocationFromInteger((int)location));
    }

    @Override
    public void trackInAppClick(String messageId, double location, String clickedUrl) {
        IterableInAppManager inAppManager = IterableApi.getInstance().getInAppManager();
        inAppManager.trackInAppClick(messageId, Serialization.getInAppLocationFromInteger((int)location), clickedUrl);
    }

    @Override
    public void trackInAppClose(String messageId, double location, double source, String clickedUrl) {
        IterableInAppManager inAppManager = IterableApi.getInstance().getInAppManager();
        inAppManager.trackInAppClose(
            messageId,
            Serialization.getInAppLocationFromInteger((int)location),
            Serialization.getInAppCloseSourceFromInteger((int)source),
            clickedUrl
        );
    }

    @Override
    public void inAppConsume(String messageId, double location, double source) {
        IterableInAppManager inAppManager = IterableApi.getInstance().getInAppManager();
        inAppManager.removeMessage(
            messageId,
            Serialization.getInAppLocationFromInteger((int)location),
            Serialization.getInAppDeleteSourceFromInteger((int)source)
        );
    }

    @Override
    public void getHtmlInAppContentForMessage(String messageId, Promise promise) {
        IterableInAppManager inAppManager = IterableApi.getInstance().getInAppManager();
        inAppManager.getHtmlInAppContentForMessage(messageId, promise::resolve, promise::reject);
    }

    @Override
    public void trackEvent(String name, ReadableMap dataFields) {
        IterableApi.getInstance().trackEvent(name, Serialization.getMapFromReadableMap(dataFields));
    }

    @Override
    public void updateUser(ReadableMap dataFields, boolean mergeNestedObjects) {
        IterableApi.getInstance().updateUser(Serialization.getMapFromReadableMap(dataFields), mergeNestedObjects);
    }

    @Override
    public void updateEmail(String email, String authToken) {
        IterableApi.getInstance().updateEmail(email, authToken);
    }

    @Override
    public void handleAppLink(String appLink, Promise promise) {
        IterableApi.getInstance().handleAppLink(appLink, promise::resolve, promise::reject);
    }

    @Override
    public void getInAppMessages(Promise promise) {
        IterableInAppManager inAppManager = IterableApi.getInstance().getInAppManager();
        inAppManager.getMessages(promise::resolve, promise::reject);
    }

    @Override
    public void getInboxMessages(Promise promise) {
        IterableInAppManager inAppManager = IterableApi.getInstance().getInAppManager();
        inAppManager.getInboxMessages(promise::resolve, promise::reject);
    }

    @Override
    public void getUnreadInboxMessagesCount(Promise promise) {
        IterableInAppManager inAppManager = IterableApi.getInstance().getInAppManager();
        inAppManager.getUnreadInboxMessagesCount(promise::resolve, promise::reject);
    }

    @Override
    public void showMessage(String messageId, boolean consume, Promise promise) {
        IterableInAppManager inAppManager = IterableApi.getInstance().getInAppManager();
        inAppManager.showMessage(messageId, consume, promise::resolve, promise::reject);
    }

    @Override
    public void setReadForMessage(String messageId, boolean read) {
        IterableInAppManager inAppManager = IterableApi.getInstance().getInAppManager();
        inAppManager.setRead(messageId, read);
    }

    @Override
    public void removeMessage(String messageId, double location, double deleteSource) {
        IterableInAppManager inAppManager = IterableApi.getInstance().getInAppManager();
        inAppManager.removeMessage(
            messageId,
            Serialization.getInAppLocationFromInteger((int)location),
            Serialization.getInAppDeleteSourceFromInteger((int)deleteSource)
        );
    }
}
