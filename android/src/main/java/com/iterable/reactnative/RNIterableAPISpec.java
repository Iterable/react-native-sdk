package com.iterable.reactnative;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import java.util.Map;

public abstract class RNIterableAPISpec extends TurboModule {
  public RNIterableAPISpec(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  // MARK: - Native SDK Functions

  public abstract void initializeWithApiKey(
      String apiKey, ReadableMap config, String version, Promise promise);

  public abstract void initialize2WithApiKey(
      String apiKey, ReadableMap config, String apiEndPointOverride, String version, Promise promise);

  public abstract void setEmail(@Nullable String email, @Nullable String authToken);

  public abstract void getEmail(Promise promise);

  public abstract void setUserId(@Nullable String userId, @Nullable String authToken);

  public abstract void getUserId(Promise promise);

  // MARK: - Iterable API Request Functions

  public abstract void disableDeviceForCurrentUser();

  public abstract void setInAppShowResponse(int inAppShowResponse);

  public abstract void getLastPushPayload(Promise promise);

  public abstract void getAttributionInfo(Promise promise);

  public abstract void setAttributionInfo(@Nullable ReadableMap attributionInfo);

  public abstract void trackPushOpenWithCampaignId(
      int campaignId,
      int templateId,
      String messageId,
      boolean appAlreadyRunning,
      @Nullable ReadableMap dataFields);

  public abstract void updateCart(@Nullable ReadableArray items);

  public abstract void trackPurchase(
      double total, @Nullable ReadableArray items, @Nullable ReadableMap dataFields);

  public abstract void trackInAppOpen(@Nullable String messageId, int location);

  public abstract void trackInAppClick(String messageId, int location, String clickedUrl);

  public abstract void trackInAppClose(
      String messageId, int location, int source, @Nullable String clickedUrl);

  public abstract void inAppConsume(String messageId, int location, int source);

  public abstract void trackEvent(String name, @Nullable ReadableMap dataFields);

  public abstract void updateUser(ReadableMap dataFields, boolean mergeNestedObjects);

  public abstract void updateEmail(String email, @Nullable String authToken);

  public abstract void handleAppLink(String appLink, Promise promise);

  public abstract void updateSubscriptions(
      @Nullable ReadableArray emailListIds,
      @Nullable ReadableArray unsubscribedChannelIds,
      @Nullable ReadableArray unsubscribedMessageTypeIds,
      @Nullable ReadableArray subscribedMessageTypeIds,
      int campaignId,
      int templateId);

  // MARK: - SDK In-App Manager Functions

  public abstract void getInAppMessages(Promise promise);

  public abstract void getHtmlInAppContentForMessage(String messageId, Promise promise);

  public abstract void getInboxMessages(Promise promise);

  public abstract void getUnreadInboxMessagesCount(Promise promise);

  public abstract void showMessage(String messageId, boolean consume, Promise promise);

  public abstract void removeMessage(String messageId, int location, int source);

  public abstract void setReadForMessage(String messageId, boolean read);

  public abstract void setAutoDisplayPaused(boolean paused);

  // MARK: - SDK Inbox Session Tracking Functions

  public abstract void startSession(ReadableArray visibleRows);

  public abstract void endSession();

  public abstract void updateVisibleRows(ReadableArray visibleRows);

  // MARK: - SDK Auth Manager Functions

  public abstract void passAlongAuthToken(@Nullable String authToken);

  // MARK: - Event Emitter Methods

  public abstract void addListener(String eventName);

  public abstract void removeListeners(int count);
}
