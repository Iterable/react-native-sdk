package com.iterable.reactnative;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;

public interface RNIterableAPITurboModule extends TurboModule {
    void initializeWithApiKey(String apiKey, ReadableMap config, String version, Promise promise);
    void initialize2WithApiKey(String apiKey, ReadableMap config, String apiEndPoint, String version, Promise promise);
    void setEmail(String email, String authToken);
    void getEmail(Promise promise);
    void setUserId(String userId, String authToken);
    void getUserId(Promise promise);
    void disableDeviceForCurrentUser();
    void getLastPushPayload(Promise promise);
    void trackPushOpen(double campaignId, Double templateId, String messageId, boolean appAlreadyRunning, ReadableMap dataFields);
    void getInAppMessages(Promise promise);
    void getInboxMessages(Promise promise);
    void getUnreadInboxMessagesCount(Promise promise);
    void showMessage(String messageId, boolean consume, Promise promise);
    void setReadForMessage(String messageId, boolean read);
    void removeMessage(String messageId, double location, double deleteSource);
    void trackEvent(String name, ReadableMap dataFields);
    void updateUser(ReadableMap dataFields, boolean mergeNestedObjects);
    void updateEmail(String email, String authToken);
    void getAttributionInfo(Promise promise);
    void setAttributionInfo(ReadableMap attributionInfo);
    void updateCart(ReadableArray items);
    void trackPurchase(double total, ReadableArray items, ReadableMap dataFields);
    void trackInAppOpen(String messageId, double location);
    void trackInAppClick(String messageId, double location, String clickedUrl);
    void trackInAppClose(String messageId, double location, double source, String clickedUrl);
    void inAppConsume(String messageId, double location, double source);
    void handleAppLink(String appLink, Promise promise);
}
