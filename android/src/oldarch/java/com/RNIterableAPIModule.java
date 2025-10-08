package com.iterable.reactnative;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

public class RNIterableAPIModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private static RNIterableAPIModuleImpl moduleImpl;

    RNIterableAPIModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        if (moduleImpl == null) {
            moduleImpl = new RNIterableAPIModuleImpl(reactContext);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return RNIterableAPIModuleImpl.NAME;
    }

    @ReactMethod
    public void initializeWithApiKey(String apiKey, ReadableMap configReadableMap, String version, Promise promise) {
      moduleImpl.initializeWithApiKey(apiKey, configReadableMap, version, promise);
    }

    @ReactMethod
    public void initialize2WithApiKey(String apiKey, ReadableMap configReadableMap, String version, String apiEndPointOverride, Promise promise) {
      moduleImpl.initialize2WithApiKey(apiKey, configReadableMap, version, apiEndPointOverride, promise);
    }

    @ReactMethod
    public void setEmail(@Nullable String email, @Nullable String authToken) {
      moduleImpl.setEmail(email, authToken);
    }

    @ReactMethod
    public void updateEmail(String email, @Nullable String authToken) {
      moduleImpl.updateEmail(email, authToken);
    }

    @ReactMethod
    public void getEmail(Promise promise) {
      moduleImpl.getEmail(promise);
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
      moduleImpl.sampleMethod(stringArgument, numberArgument, callback);
    }

    @ReactMethod
    public void setUserId(@Nullable String userId, @Nullable String authToken) {
      moduleImpl.setUserId(userId, authToken);
    }

    @ReactMethod
    public void updateUser(ReadableMap dataFields, boolean mergeNestedObjects) {
      moduleImpl.updateUser(dataFields, mergeNestedObjects);
    }

    @ReactMethod
    public void getUserId(Promise promise) {
      moduleImpl.getUserId(promise);
    }

    @ReactMethod
    public void trackEvent(String name, @Nullable ReadableMap dataFields) {
      moduleImpl.trackEvent(name, dataFields);
    }

    @ReactMethod
    public void updateCart(ReadableArray items) {
      moduleImpl.updateCart(items);
    }

    @ReactMethod
    public void trackPurchase(double total, ReadableArray items, @Nullable ReadableMap dataFields) {
      moduleImpl.trackPurchase(total, items, dataFields);
    }

    @ReactMethod
    public void trackPushOpenWithCampaignId(double campaignId, @Nullable Double templateId, String messageId, boolean appAlreadyRunning, @Nullable ReadableMap dataFields) {
      moduleImpl.trackPushOpenWithCampaignId(campaignId, templateId, messageId, appAlreadyRunning, dataFields);
    }

    @ReactMethod
    public void updateSubscriptions(@Nullable ReadableArray emailListIds, @Nullable ReadableArray unsubscribedChannelIds, @Nullable ReadableArray unsubscribedMessageTypeIds, @Nullable ReadableArray subscribedMessageTypeIds, double campaignId, double templateId) {
      moduleImpl.updateSubscriptions(emailListIds, unsubscribedChannelIds, unsubscribedMessageTypeIds, subscribedMessageTypeIds, campaignId, templateId);
    }

    @ReactMethod
    public void showMessage(String messageId, boolean consume, final Promise promise) {
      moduleImpl.showMessage(messageId, consume, promise);
    }

    @ReactMethod
    public void setReadForMessage(String messageId, boolean read) {
      moduleImpl.setReadForMessage(messageId, read);
    }

    @ReactMethod
    public void removeMessage(String messageId, double location, double deleteSource) {
      moduleImpl.removeMessage(messageId, location, deleteSource);
    }

    @ReactMethod
    public void getHtmlInAppContentForMessage(String messageId, final Promise promise) {
      moduleImpl.getHtmlInAppContentForMessage(messageId, promise);
    }

    @ReactMethod
    public void getAttributionInfo(Promise promise) {
      moduleImpl.getAttributionInfo(promise);
    }

    @ReactMethod
    public void setAttributionInfo(@Nullable ReadableMap attributionInfoReadableMap) {
      moduleImpl.setAttributionInfo(attributionInfoReadableMap);
    }

    @ReactMethod
    public void getLastPushPayload(Promise promise) {
      moduleImpl.getLastPushPayload(promise);
    }

    @ReactMethod
    public void disableDeviceForCurrentUser() {
      moduleImpl.disableDeviceForCurrentUser();
    }

    @ReactMethod
    public void handleAppLink(String uri, Promise promise) {
      moduleImpl.handleAppLink(uri, promise);
    }

    @ReactMethod
    public void trackInAppOpen(String messageId, double location) {
      moduleImpl.trackInAppOpen(messageId, location);
    }

    @ReactMethod
    public void trackInAppClick(String messageId, double location, String clickedUrl) {
      moduleImpl.trackInAppClick(messageId, location, clickedUrl);
    }

    @ReactMethod
    public void trackInAppClose(String messageId, double location, double source, @Nullable String clickedUrl) {
      moduleImpl.trackInAppClose(messageId, location, source, clickedUrl);
    }

    @ReactMethod
    public void inAppConsume(String messageId, double location, double source) {
      moduleImpl.inAppConsume(messageId, location, source);
    }

    @ReactMethod
    public void getInAppMessages(Promise promise) {
      moduleImpl.getInAppMessages(promise);
    }

    @ReactMethod
    public void getInboxMessages(Promise promise) {
      moduleImpl.getInboxMessages(promise);
    }

    @ReactMethod
    public void getUnreadInboxMessagesCount(Promise promise) {
      moduleImpl.getUnreadInboxMessagesCount(promise);
    }

    @ReactMethod
    public void setInAppShowResponse(double number) {
      moduleImpl.setInAppShowResponse(number);
    }

    @ReactMethod
    public void setAutoDisplayPaused(final boolean paused) {
      moduleImpl.setAutoDisplayPaused(paused);
    }

    @ReactMethod
    public void wakeApp() {
      moduleImpl.wakeApp();
    }

    @ReactMethod
    public void startSession(ReadableArray visibleRows) {
      moduleImpl.startSession(visibleRows);
    }

    @ReactMethod
    public void endSession() {
      moduleImpl.endSession();
    }

    @ReactMethod
    public void updateVisibleRows(ReadableArray visibleRows) {
      moduleImpl.updateVisibleRows(visibleRows);
    }

    @ReactMethod
    public void addListener(String eventName) {
      moduleImpl.addListener(eventName);
    }

    @ReactMethod
    public void removeListeners(double count) {
      moduleImpl.removeListeners(count);
    }

    @ReactMethod
    public void passAlongAuthToken(@Nullable String authToken) {
      moduleImpl.passAlongAuthToken(authToken);
    }

    @ReactMethod
    public void pauseAuthRetries(boolean pauseRetry) {
      moduleImpl.pauseAuthRetries(pauseRetry);
    }

    @ReactMethod
    public void getEmbeddedMessages(@Nullable ReadableArray placementIds, Promise promise) {
      moduleImpl.getEmbeddedMessages(placementIds, promise);
    }

    @ReactMethod
    public void syncEmbeddedMessages() {
      moduleImpl.syncEmbeddedMessages();
    }

    @ReactMethod
    public void getEmbeddedPlacementIds(Promise promise) {
      moduleImpl.getEmbeddedPlacementIds(promise);
    }

    @ReactMethod
    public void addEmbeddedUpdateListener(@Nullable ReadableMap handler) {
      // Convert ReadableMap to IterableEmbeddedUpdateHandler if needed
      // For now, we'll use null to use the default handler
      moduleImpl.addEmbeddedUpdateListener(null);
    }

    @ReactMethod
    public void removeEmbeddedUpdateListener(@Nullable ReadableMap handler) {
      // Convert ReadableMap to IterableEmbeddedUpdateHandler if needed
      // For now, we'll use null to remove the current handler
      moduleImpl.removeEmbeddedUpdateListener(null);
    }

    public void sendEvent(@NonNull String eventName, @Nullable Object eventData) {
      moduleImpl.sendEvent(eventName, eventData);
    }

    void onInboxUpdated() {
      moduleImpl.onInboxUpdated();
    }
}
