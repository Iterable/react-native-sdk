package com.iterable.reactnative;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class RNIterableAPIModule extends NativeRNIterableAPISpec {
  private final ReactApplicationContext reactContext;

  RNIterableAPIModule(ReactApplicationContext context) {
      super(context);
      this.reactContext = context;
  }

  @Override
  @NonNull
  public String getName() {
      return RNIterableAPIModuleImpl.NAME;
  }

  @Override
  public void initializeWithApiKey(String apiKey, ReadableMap configReadableMap, String version, Promise promise) {
    RNIterableAPIModuleImpl.initializeWithApiKey(apiKey, configReadableMap, version, promise);
  }

  @Override
  public void initialize2WithApiKey(String apiKey, ReadableMap configReadableMap, String apiEndPointOverride, String version, Promise promise) {
    RNIterableAPIModuleImpl.initialize2WithApiKey(apiKey, configReadableMap, apiEndPointOverride, version, promise);
  }

  @Override
  public void setEmail(@Nullable String email, @Nullable String authToken) {
    RNIterableAPIModuleImpl.setEmail(email, authToken);
  }

  @Override
  public void updateEmail(String email, @Nullable String authToken) {
    RNIterableAPIModuleImpl.updateEmail(email, authToken);
  }

  @Override
  public void getEmail(Promise promise) {
    RNIterableAPIModuleImpl.getEmail(promise);
  }

  @Override
  public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
    RNIterableAPIModuleImpl.sampleMethod(stringArgument, numberArgument, callback);
  }

  @Override
  public void setUserId(@Nullable String userId, @Nullable String authToken) {
    RNIterableAPIModuleImpl.setUserId(userId, authToken);
  }

  @Override
  public void updateUser(ReadableMap dataFields, boolean mergeNestedObjects) {
    RNIterableAPIModuleImpl.updateUser(dataFields, mergeNestedObjects);
  }

  @Override
  public void getUserId(Promise promise) {
    RNIterableAPIModuleImpl.getUserId(promise);
  }

  @Override
  public void trackEvent(String name, ReadableMap dataFields) {
    RNIterableAPIModuleImpl.trackEvent(name, dataFields);
  }

  @Override
  public void updateCart(ReadableArray items) {
    RNIterableAPIModuleImpl.updateCart(items);
  }

  @Override
  public void trackPurchase(double total, ReadableArray items, ReadableMap dataFields) {
    RNIterableAPIModuleImpl.trackPurchase(total, items, dataFields);
  }

  @Override
  public void trackPushOpenWithCampaignId(double campaignId, Double templateId, String messageId, boolean appAlreadyRunning, ReadableMap dataFields) {
    RNIterableAPIModuleImpl.trackPushOpenWithCampaignId(campaignId, templateId, messageId, appAlreadyRunning, dataFields);
  }

  @Override
  public void updateSubscriptions(ReadableArray emailListIds, ReadableArray unsubscribedChannelIds, ReadableArray unsubscribedMessageTypeIds, ReadableArray subscribedMessageTypeIds, double campaignId, double templateId) {
    RNIterableAPIModuleImpl.updateSubscriptions(emailListIds, unsubscribedChannelIds, unsubscribedMessageTypeIds, subscribedMessageTypeIds, campaignId, templateId);
  }

  @Override
  public void showMessage(String messageId, boolean consume, final Promise promise) {
    RNIterableAPIModuleImpl.showMessage(messageId, consume, promise);
  }

  @Override
  public void setReadForMessage(String messageId, boolean read) {
    RNIterableAPIModuleImpl.setReadForMessage(messageId, read);
  }

  @Override
  public void removeMessage(String messageId, double location, double deleteSource) {
    RNIterableAPIModuleImpl.removeMessage(messageId, location, deleteSource);
  }

  @Override
  public void getHtmlInAppContentForMessage(String messageId, final Promise promise) {
    RNIterableAPIModuleImpl.getHtmlInAppContentForMessage(messageId, promise);
  }

  @Override
  public void getAttributionInfo(Promise promise) {
    RNIterableAPIModuleImpl.getAttributionInfo(promise);
  }

  @Override
  public void setAttributionInfo(ReadableMap attributionInfoReadableMap) {
    RNIterableAPIModuleImpl.setAttributionInfo(attributionInfoReadableMap);
  }

  @Override
  public void getLastPushPayload(Promise promise) {
    RNIterableAPIModuleImpl.getLastPushPayload(promise);
  }

  @Override
  public void disableDeviceForCurrentUser() {
    RNIterableAPIModuleImpl.disableDeviceForCurrentUser();
  }

  @Override
  public void handleAppLink(String uri, Promise promise) {
    RNIterableAPIModuleImpl.handleAppLink(uri, promise);
  }

  @Override
  public void trackInAppOpen(String messageId, double location) {
    RNIterableAPIModuleImpl.trackInAppOpen(messageId, location);
  }

  @Override
  public void trackInAppClick(String messageId, double location, String clickedUrl) {
    RNIterableAPIModuleImpl.trackInAppClick(messageId, location, clickedUrl);
  }

  @Override
  public void trackInAppClose(String messageId, double location, double source, @Nullable String clickedUrl) {
    RNIterableAPIModuleImpl.trackInAppClose(messageId, location, source, clickedUrl);
  }

  @Override
  public void inAppConsume(String messageId, double location, double source) {
    RNIterableAPIModuleImpl.inAppConsume(messageId, location, source);
  }

  @Override
  public void getInAppMessages(Promise promise) {
    RNIterableAPIModuleImpl.getInAppMessages(promise);
  }

  @Override
  public void getInboxMessages(Promise promise) {
    RNIterableAPIModuleImpl.getInboxMessages(promise);
  }

  @Override
  public void getUnreadInboxMessagesCount(Promise promise) {
    RNIterableAPIModuleImpl.getUnreadInboxMessagesCount(promise);
  }

  @Override
  public void setInAppShowResponse(double number) {
    RNIterableAPIModuleImpl.setInAppShowResponse(number);
  }

  @Override
  public void setAutoDisplayPaused(final boolean paused) {
    RNIterableAPIModuleImpl.setAutoDisplayPaused(paused);
  }

  @Override
  public void wakeApp() {
    RNIterableAPIModuleImpl.wakeApp();
  }

  @Override
  public void startSession(ReadableArray visibleRows) {
    RNIterableAPIModuleImpl.startSession(visibleRows);
  }

  @Override
  public void endSession() {
    RNIterableAPIModuleImpl.endSession();
  }

  @Override
  public void updateVisibleRows(ReadableArray visibleRows) {
    RNIterableAPIModuleImpl.updateVisibleRows(visibleRows);
  }

  @Override
  public void addListener(String eventName) {
    RNIterableAPIModuleImpl.addListener(eventName);
  }

  @Override
  public void removeListeners(double count) {
    RNIterableAPIModuleImpl.removeListeners(count);
  }

  @Override
  public void passAlongAuthToken(String authToken) {
    RNIterableAPIModuleImpl.passAlongAuthToken(authToken);
  }

  @Override
  public void sendEvent(@NonNull String eventName, @Nullable Object eventData) {
    RNIterableAPIModuleImpl.sendEvent(eventName, eventData);
  }

  @Override
  public void onInboxUpdated() {
    RNIterableAPIModuleImpl.onInboxUpdated();
  }
}
