package com.iterable.reactnative;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

public class RNIterableAPIModule extends NativeRNIterableAPISpec {
  private final ReactApplicationContext reactContext;
  private static RNIterableAPIModuleImpl moduleImpl;

  RNIterableAPIModule(ReactApplicationContext context) {
      super(context);
      this.reactContext = context;
      if (moduleImpl == null) {
          moduleImpl = new RNIterableAPIModuleImpl(reactContext);
      }
  }

  @Override
  @NonNull
  public String getName() {
      return RNIterableAPIModuleImpl.NAME;
  }

  @Override
  public void initializeWithApiKey(String apiKey, ReadableMap configReadableMap, String version, Promise promise) {
    moduleImpl.initializeWithApiKey(apiKey, configReadableMap, version, promise);
  }

  @Override
  public void initialize2WithApiKey(String apiKey, ReadableMap configReadableMap, String version, String apiEndPointOverride, Promise promise) {
    moduleImpl.initialize2WithApiKey(apiKey, configReadableMap, version, apiEndPointOverride, promise);
  }

  @Override
  public void setEmail(@Nullable String email, @Nullable String authToken) {
    moduleImpl.setEmail(email, authToken);
  }

  @Override
  public void updateEmail(String email, @Nullable String authToken) {
    moduleImpl.updateEmail(email, authToken);
  }

  @Override
  public void getEmail(Promise promise) {
    moduleImpl.getEmail(promise);
  }

  public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
    moduleImpl.sampleMethod(stringArgument, numberArgument, callback);
  }

  @Override
  public void setUserId(@Nullable String userId, @Nullable String authToken) {
    moduleImpl.setUserId(userId, authToken);
  }

  @Override
  public void updateUser(ReadableMap dataFields, boolean mergeNestedObjects) {
    moduleImpl.updateUser(dataFields, mergeNestedObjects);
  }

  @Override
  public void getUserId(Promise promise) {
    moduleImpl.getUserId(promise);
  }

  @Override
  public void trackEvent(String name, @Nullable ReadableMap dataFields) {
    moduleImpl.trackEvent(name, dataFields);
  }

  @Override
  public void updateCart(ReadableArray items) {
    moduleImpl.updateCart(items);
  }

  @Override
  public void trackPurchase(double total, ReadableArray items, @Nullable ReadableMap dataFields) {
    moduleImpl.trackPurchase(total, items, dataFields);
  }

  @Override
  public void trackPushOpenWithCampaignId(double campaignId, @Nullable Double templateId, String messageId, boolean appAlreadyRunning, @Nullable ReadableMap dataFields) {
    moduleImpl.trackPushOpenWithCampaignId(campaignId, templateId, messageId, appAlreadyRunning, dataFields);
  }

  @Override
  public void updateSubscriptions(@Nullable ReadableArray emailListIds, @Nullable ReadableArray unsubscribedChannelIds, @Nullable ReadableArray unsubscribedMessageTypeIds, @Nullable ReadableArray subscribedMessageTypeIds, double campaignId, double templateId) {
    moduleImpl.updateSubscriptions(emailListIds, unsubscribedChannelIds, unsubscribedMessageTypeIds, subscribedMessageTypeIds, campaignId, templateId);
  }

  @Override
  public void showMessage(String messageId, boolean consume, final Promise promise) {
    moduleImpl.showMessage(messageId, consume, promise);
  }

  @Override
  public void setReadForMessage(String messageId, boolean read) {
    moduleImpl.setReadForMessage(messageId, read);
  }

  @Override
  public void removeMessage(String messageId, double location, double deleteSource) {
    moduleImpl.removeMessage(messageId, location, deleteSource);
  }

  @Override
  public void getHtmlInAppContentForMessage(String messageId, final Promise promise) {
    moduleImpl.getHtmlInAppContentForMessage(messageId, promise);
  }

  @Override
  public void getAttributionInfo(Promise promise) {
    moduleImpl.getAttributionInfo(promise);
  }

  @Override
  public void setAttributionInfo(@Nullable ReadableMap attributionInfoReadableMap) {
    moduleImpl.setAttributionInfo(attributionInfoReadableMap);
  }

  @Override
  public void getLastPushPayload(Promise promise) {
    moduleImpl.getLastPushPayload(promise);
  }

  @Override
  public void disableDeviceForCurrentUser() {
    moduleImpl.disableDeviceForCurrentUser();
  }

  @Override
  public void handleAppLink(String uri, Promise promise) {
    moduleImpl.handleAppLink(uri, promise);
  }

  @Override
  public void trackInAppOpen(String messageId, double location) {
    moduleImpl.trackInAppOpen(messageId, location);
  }

  @Override
  public void trackInAppClick(String messageId, double location, String clickedUrl) {
    moduleImpl.trackInAppClick(messageId, location, clickedUrl);
  }

  @Override
  public void trackInAppClose(String messageId, double location, double source, @Nullable String clickedUrl) {
    moduleImpl.trackInAppClose(messageId, location, source, clickedUrl);
  }

  @Override
  public void inAppConsume(String messageId, double location, double source) {
    moduleImpl.inAppConsume(messageId, location, source);
  }

  @Override
  public void getInAppMessages(Promise promise) {
    moduleImpl.getInAppMessages(promise);
  }

  @Override
  public void getInboxMessages(Promise promise) {
    moduleImpl.getInboxMessages(promise);
  }

  @Override
  public void getUnreadInboxMessagesCount(Promise promise) {
    moduleImpl.getUnreadInboxMessagesCount(promise);
  }

  @Override
  public void setInAppShowResponse(double number) {
    moduleImpl.setInAppShowResponse(number);
  }

  @Override
  public void setAutoDisplayPaused(final boolean paused) {
    moduleImpl.setAutoDisplayPaused(paused);
  }

  public void wakeApp() {
    moduleImpl.wakeApp();
  }

  @Override
  public void startSession(ReadableArray visibleRows) {
    moduleImpl.startSession(visibleRows);
  }

  @Override
  public void endSession() {
    moduleImpl.endSession();
  }

  public void updateVisibleRows(ReadableArray visibleRows) {
    moduleImpl.updateVisibleRows(visibleRows);
  }

  @Override
  public void addListener(String eventName) {
    moduleImpl.addListener(eventName);
  }

  @Override
  public void removeListeners(double count) {
    moduleImpl.removeListeners(count);
  }

  public void passAlongAuthToken(@Nullable String authToken) {
    moduleImpl.passAlongAuthToken(authToken);
  }

  public void sendEvent(@NonNull String eventName, @Nullable Object eventData) {
    moduleImpl.sendEvent(eventName, eventData);
  }

  public void onInboxUpdated() {
    moduleImpl.onInboxUpdated();
  }
}
