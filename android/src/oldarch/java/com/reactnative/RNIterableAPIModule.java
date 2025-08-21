package com.iterable.reactnative;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class RNIterableAPIModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    RNIterableAPIModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return RNIterableAPIModuleImpl.NAME;
    }

    @ReactMethod
    public void initializeWithApiKey(String apiKey, ReadableMap configReadableMap, String version, Promise promise) {
      RNIterableAPIModuleImpl.initializeWithApiKey(apiKey, configReadableMap, version, promise);
    }

    @ReactMethod
    public void initialize2WithApiKey(String apiKey, ReadableMap configReadableMap, String apiEndPointOverride, String version, Promise promise) {
      RNIterableAPIModuleImpl.initialize2WithApiKey(apiKey, configReadableMap, apiEndPointOverride, version, promise);
    }

    @ReactMethod
    public void setEmail(@Nullable String email, @Nullable String authToken) {
      RNIterableAPIModuleImpl.setEmail(email, authToken);
    }

    @ReactMethod
    public void updateEmail(String email, @Nullable String authToken) {
      RNIterableAPIModuleImpl.updateEmail(email, authToken);
    }

    @ReactMethod
    public void getEmail(Promise promise) {
      RNIterableAPIModuleImpl.getEmail(promise);
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
      RNIterableAPIModuleImpl.sampleMethod(stringArgument, numberArgument, callback);
    }

    @ReactMethod
    public void setUserId(@Nullable String userId, @Nullable String authToken) {
      RNIterableAPIModuleImpl.setUserId(userId, authToken);
    }

    @ReactMethod
    public void updateUser(ReadableMap dataFields, boolean mergeNestedObjects) {
      RNIterableAPIModuleImpl.updateUser(dataFields, mergeNestedObjects);
    }

    @ReactMethod
    public void getUserId(Promise promise) {
      RNIterableAPIModuleImpl.getUserId(promise);
    }

    @ReactMethod
    public void trackEvent(String name, ReadableMap dataFields) {
      RNIterableAPIModuleImpl.trackEvent(name, dataFields);
    }

    @ReactMethod
    public void updateCart(ReadableArray items) {
      RNIterableAPIModuleImpl.updateCart(items);
    }

    @ReactMethod
    public void trackPurchase(double total, ReadableArray items, ReadableMap dataFields) {
      RNIterableAPIModuleImpl.trackPurchase(total, items, dataFields);
    }

    @ReactMethod
    public void trackPushOpenWithCampaignId(double campaignId, Double templateId, String messageId, boolean appAlreadyRunning, ReadableMap dataFields) {
      RNIterableAPIModuleImpl.trackPushOpenWithCampaignId(campaignId, templateId, messageId, appAlreadyRunning, dataFields);
    }

    @ReactMethod
    public void updateSubscriptions(ReadableArray emailListIds, ReadableArray unsubscribedChannelIds, ReadableArray unsubscribedMessageTypeIds, ReadableArray subscribedMessageTypeIds, double campaignId, double templateId) {
      RNIterableAPIModuleImpl.updateSubscriptions(emailListIds, unsubscribedChannelIds, unsubscribedMessageTypeIds, subscribedMessageTypeIds, campaignId, templateId);
    }

    @ReactMethod
    public void showMessage(String messageId, boolean consume, final Promise promise) {
      RNIterableAPIModuleImpl.showMessage(messageId, consume, promise);
    }

    @ReactMethod
    public void setReadForMessage(String messageId, boolean read) {
      RNIterableAPIModuleImpl.setReadForMessage(messageId, read);
    }

    @ReactMethod
    public void removeMessage(String messageId, double location, double deleteSource) {
      RNIterableAPIModuleImpl.removeMessage(messageId, location, deleteSource);
    }

    @ReactMethod
    public void getHtmlInAppContentForMessage(String messageId, final Promise promise) {
      RNIterableAPIModuleImpl.getHtmlInAppContentForMessage(messageId, promise);
    }

    @ReactMethod
    public void getAttributionInfo(Promise promise) {
      RNIterableAPIModuleImpl.getAttributionInfo(promise);
    }

    @ReactMethod
    public void setAttributionInfo(ReadableMap attributionInfoReadableMap) {
      RNIterableAPIModuleImpl.setAttributionInfo(attributionInfoReadableMap);
    }

    @ReactMethod
    public void getLastPushPayload(Promise promise) {
      RNIterableAPIModuleImpl.getLastPushPayload(promise);
    }

    @ReactMethod
    public void disableDeviceForCurrentUser() {
      RNIterableAPIModuleImpl.disableDeviceForCurrentUser();
    }

    @ReactMethod
    public void handleAppLink(String uri, Promise promise) {
      RNIterableAPIModuleImpl.handleAppLink(uri, promise);
    }

    @ReactMethod
    public void trackInAppOpen(String messageId, double location) {
      RNIterableAPIModuleImpl.trackInAppOpen(messageId, location);
    }

    @ReactMethod
    public void trackInAppClick(String messageId, double location, String clickedUrl) {
      RNIterableAPIModuleImpl.trackInAppClick(messageId, location, clickedUrl);
    }

    @ReactMethod
    public void trackInAppClose(String messageId, double location, double source, @Nullable String clickedUrl) {
      RNIterableAPIModuleImpl.trackInAppClose(messageId, location, source, clickedUrl);
    }

    @ReactMethod
    public void inAppConsume(String messageId, double location, double source) {
      RNIterableAPIModuleImpl.inAppConsume(messageId, location, source);
    }

    @ReactMethod
    public void getInAppMessages(Promise promise) {
      RNIterableAPIModuleImpl.getInAppMessages(promise);
    }

    @ReactMethod
    public void getInboxMessages(Promise promise) {
      RNIterableAPIModuleImpl.getInboxMessages(promise);
    }

    @ReactMethod
    public void getUnreadInboxMessagesCount(Promise promise) {
      RNIterableAPIModuleImpl.getUnreadInboxMessagesCount(promise);
    }

    @ReactMethod
    public void setInAppShowResponse(double number) {
      RNIterableAPIModuleImpl.setInAppShowResponse(number);
    }

    @ReactMethod
    public void setAutoDisplayPaused(final boolean paused) {
      RNIterableAPIModuleImpl.setAutoDisplayPaused(paused);
    }

    @ReactMethod
    public void wakeApp() {
      RNIterableAPIModuleImpl.wakeApp();
    }

    @ReactMethod
    public void startSession(ReadableArray visibleRows) {
      RNIterableAPIModuleImpl.startSession(visibleRows);
    }

    @ReactMethod
    public void endSession() {
      RNIterableAPIModuleImpl.endSession();
    }

    @ReactMethod
    public void updateVisibleRows(ReadableArray visibleRows) {
      RNIterableAPIModuleImpl.updateVisibleRows(visibleRows);
    }

    @ReactMethod
    public void addListener(String eventName) {
      RNIterableAPIModuleImpl.addListener(eventName);
    }

    @ReactMethod
    public void removeListeners(double count) {
      RNIterableAPIModuleImpl.removeListeners(count);
    }

    @ReactMethod
    public void passAlongAuthToken(String authToken) {
      RNIterableAPIModuleImpl.passAlongAuthToken(authToken);
    }

    @ReactMethod
    public void sendEvent(@NonNull String eventName, @Nullable Object eventData) {
      RNIterableAPIModuleImpl.sendEvent(eventName, eventData);
    }

    @Override
    public void onInboxUpdated() {
      RNIterableAPIModuleImpl.onInboxUpdated();
    }
}
