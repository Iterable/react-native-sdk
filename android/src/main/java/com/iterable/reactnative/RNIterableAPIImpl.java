package com.iterable.reactnative;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import com.iterable.reactnative.bridge.IterableBridge;
import com.iterable.reactnative.bridge.IterableConfig;
import com.iterable.reactnative.bridge.IterableInAppMessage;
import com.iterable.reactnative.bridge.IterableInAppLocation;
import com.iterable.reactnative.bridge.IterableInAppCloseSource;
import com.iterable.reactnative.bridge.IterableInAppDeleteSource;
import com.iterable.reactnative.bridge.IterableCommerceItem;
import com.iterable.reactnative.bridge.IterableAttributionInfo;
import java.util.ArrayList;
import java.util.List;

public class RNIterableAPIImpl implements RNIterableAPITurboModule {
    private final ReactApplicationContext reactContext;
    private final IterableBridge iterableBridge;

    public RNIterableAPIImpl(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
        this.iterableBridge = new IterableBridge(reactContext);
    }

    @Override
    public void initializeWithApiKey(String apiKey, ReadableMap config, String version, Promise promise) {
        try {
            IterableConfig iterableConfig = getIterableConfigFromMap(config);
            iterableBridge.initialize(apiKey, iterableConfig);
            iterableBridge.setDeviceAttribute("reactNativeSDKVersion", version);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("error", e.getMessage());
        }
    }

    @Override
    public void initialize2WithApiKey(String apiKey, ReadableMap config, String apiEndPoint, String version, Promise promise) {
        try {
            IterableConfig iterableConfig = getIterableConfigFromMap(config);
            iterableBridge.initialize(apiKey, iterableConfig, apiEndPoint);
            iterableBridge.setDeviceAttribute("reactNativeSDKVersion", version);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("error", e.getMessage());
        }
    }

    @Override
    public void setEmail(String email, String authToken) {
        iterableBridge.setEmail(email, authToken);
    }

    @Override
    public void getEmail(Promise promise) {
        try {
            String email = iterableBridge.getEmail();
            promise.resolve(email);
        } catch (Exception e) {
            promise.reject("error", e.getMessage());
        }
    }

    @Override
    public void setUserId(String userId, String authToken) {
        iterableBridge.setUserId(userId, authToken);
    }

    @Override
    public void getUserId(Promise promise) {
        try {
            String userId = iterableBridge.getUserId();
            promise.resolve(userId);
        } catch (Exception e) {
            promise.reject("error", e.getMessage());
        }
    }

    @Override
    public void disableDeviceForCurrentUser() {
        iterableBridge.disableDeviceForCurrentUser();
    }

    @Override
    public void getLastPushPayload(Promise promise) {
        try {
            WritableMap payload = iterableBridge.getLastPushPayload();
            promise.resolve(payload);
        } catch (Exception e) {
            promise.reject("error", e.getMessage());
        }
    }

    @Override
    public void trackPushOpen(double campaignId, Double templateId, String messageId, boolean appAlreadyRunning, ReadableMap dataFields) {
        iterableBridge.trackPushOpen(messageId, (int) campaignId, templateId, appAlreadyRunning, dataFields);
    }

    @Override
    public void getInAppMessages(Promise promise) {
        try {
            List<IterableInAppMessage> messages = iterableBridge.getInAppMessages();
            WritableArray array = Arguments.createArray();
            for (IterableInAppMessage message : messages) {
                array.pushMap(messageToMap(message));
            }
            promise.resolve(array);
        } catch (Exception e) {
            promise.reject("error", e.getMessage());
        }
    }

    @Override
    public void getInboxMessages(Promise promise) {
        try {
            List<IterableInAppMessage> messages = iterableBridge.getInboxMessages();
            WritableArray array = Arguments.createArray();
            for (IterableInAppMessage message : messages) {
                array.pushMap(messageToMap(message));
            }
            promise.resolve(array);
        } catch (Exception e) {
            promise.reject("error", e.getMessage());
        }
    }

    @Override
    public void getUnreadInboxMessagesCount(Promise promise) {
        try {
            int count = iterableBridge.getUnreadInboxMessagesCount();
            promise.resolve(count);
        } catch (Exception e) {
            promise.reject("error", e.getMessage());
        }
    }

    @Override
    public void showMessage(String messageId, boolean consume, Promise promise) {
        try {
            WritableMap data = iterableBridge.showMessage(messageId, consume);
            promise.resolve(data);
        } catch (Exception e) {
            promise.reject("error", e.getMessage());
        }
    }

    @Override
    public void setReadForMessage(String messageId, boolean read) {
        iterableBridge.setReadForMessage(messageId, read);
    }

    @Override
    public void removeMessage(String messageId, double location, double deleteSource) {
        iterableBridge.removeMessage(messageId,
            IterableInAppLocation.fromInt((int) location),
            IterableInAppDeleteSource.fromInt((int) deleteSource));
    }

    @Override
    public void trackEvent(String name, ReadableMap dataFields) {
        iterableBridge.trackEvent(name, dataFields);
    }

    @Override
    public void updateUser(ReadableMap dataFields, boolean mergeNestedObjects) {
        iterableBridge.updateUser(dataFields, mergeNestedObjects);
    }

    @Override
    public void updateEmail(String email, String authToken) {
        iterableBridge.updateEmail(email, authToken);
    }

    @Override
    public void getAttributionInfo(Promise promise) {
        try {
            IterableAttributionInfo info = iterableBridge.getAttributionInfo();
            promise.resolve(attributionInfoToMap(info));
        } catch (Exception e) {
            promise.reject("error", e.getMessage());
        }
    }

    @Override
    public void setAttributionInfo(ReadableMap attributionInfo) {
        iterableBridge.setAttributionInfo(mapToAttributionInfo(attributionInfo));
    }

    @Override
    public void updateCart(ReadableArray items) {
        List<IterableCommerceItem> commerceItems = new ArrayList<>();
        for (int i = 0; i < items.size(); i++) {
            ReadableMap item = items.getMap(i);
            commerceItems.add(new IterableCommerceItem(
                item.getString("id"),
                item.getString("name"),
                item.getDouble("price"),
                item.getInt("quantity")
            ));
        }
        iterableBridge.updateCart(commerceItems);
    }

    @Override
    public void trackPurchase(double total, ReadableArray items, ReadableMap dataFields) {
        List<IterableCommerceItem> commerceItems = new ArrayList<>();
        for (int i = 0; i < items.size(); i++) {
            ReadableMap item = items.getMap(i);
            commerceItems.add(new IterableCommerceItem(
                item.getString("id"),
                item.getString("name"),
                item.getDouble("price"),
                item.getInt("quantity")
            ));
        }
        iterableBridge.trackPurchase(total, commerceItems, dataFields);
    }

    @Override
    public void trackInAppOpen(String messageId, double location) {
        iterableBridge.trackInAppOpen(messageId, IterableInAppLocation.fromInt((int) location));
    }

    @Override
    public void trackInAppClick(String messageId, double location, String clickedUrl) {
        iterableBridge.trackInAppClick(messageId, IterableInAppLocation.fromInt((int) location), clickedUrl);
    }

    @Override
    public void trackInAppClose(String messageId, double location, double source, String clickedUrl) {
        iterableBridge.trackInAppClose(messageId,
            IterableInAppLocation.fromInt((int) location),
            IterableInAppCloseSource.fromInt((int) source),
            clickedUrl);
    }

    @Override
    public void inAppConsume(String messageId, double location, double source) {
        iterableBridge.removeMessage(messageId,
            IterableInAppLocation.fromInt((int) location),
            IterableInAppDeleteSource.fromInt((int) source));
    }

    @Override
    public void handleAppLink(String appLink, Promise promise) {
        try {
            WritableMap data = iterableBridge.handleAppLink(appLink);
            promise.resolve(data);
        } catch (Exception e) {
            promise.reject("error", e.getMessage());
        }
    }

    private IterableConfig getIterableConfigFromMap(ReadableMap config) {
        IterableConfig.Builder builder = new IterableConfig.Builder();

        if (config.hasKey("pushIntegrationName")) {
            builder.setPushIntegrationName(config.getString("pushIntegrationName"));
        }

        if (config.hasKey("autoPushRegistration")) {
            builder.setAutoPushRegistration(config.getBoolean("autoPushRegistration"));
        }

        if (config.hasKey("logLevel")) {
            builder.setLogLevel(config.getInt("logLevel"));
        }

        if (config.hasKey("inAppDisplayInterval")) {
            builder.setInAppDisplayInterval(config.getDouble("inAppDisplayInterval"));
        }

        if (config.hasKey("urlHandler")) {
            ReadableMap urlHandler = config.getMap("urlHandler");
            builder.setUrlHandler(url -> {
                sendEvent("urlHandler", url);
                return urlHandler.getBoolean("shouldOpenInNewWindow");
            });
        }

        if (config.hasKey("customActionHandler")) {
            ReadableMap customActionHandler = config.getMap("customActionHandler");
            builder.setCustomActionHandler((action, context) -> {
                sendEvent("customActionHandler", action.getType());
                return customActionHandler.getBoolean("shouldHandleCustomAction");
            });
        }

        if (config.hasKey("inAppHandler")) {
            ReadableMap inAppHandler = config.getMap("inAppHandler");
            builder.setInAppHandler(new IterableConfig.InAppHandler() {
                @Override
                public boolean onInAppReceived(IterableInAppMessage message) {
                    sendEvent("inAppReceived", message.getMessageId());
                    return inAppHandler.getBoolean("shouldShowInApp");
                }

                @Override
                public void onInAppDisplayed(IterableInAppMessage message) {
                    sendEvent("inAppDisplayed", message.getMessageId());
                }

                @Override
                public void onInAppDismissed(IterableInAppMessage message) {
                    sendEvent("inAppDismissed", message.getMessageId());
                }

                @Override
                public void onInAppClicked(IterableInAppMessage message, String clickedUrl) {
                    sendEvent("inAppClicked", message.getMessageId());
                }
            });
        }

        return builder.build();
    }

    private WritableMap messageToMap(IterableInAppMessage message) {
        WritableMap map = Arguments.createMap();
        map.putString("messageId", message.getMessageId());
        map.putInt("campaignId", message.getCampaignId());

        WritableMap content = Arguments.createMap();
        content.putString("html", message.getContent().getHtml());

        WritableMap edgeInsets = Arguments.createMap();
        edgeInsets.putDouble("top", message.getContent().getPadding().top);
        edgeInsets.putDouble("left", message.getContent().getPadding().left);
        edgeInsets.putDouble("bottom", message.getContent().getPadding().bottom);
        edgeInsets.putDouble("right", message.getContent().getPadding().right);
        content.putMap("edgeInsets", edgeInsets);

        map.putMap("content", content);
        return map;
    }

    private WritableMap attributionInfoToMap(IterableAttributionInfo info) {
        if (info == null) {
            return null;
        }

        WritableMap map = Arguments.createMap();
        map.putString("campaignId", info.getCampaignId());
        map.putString("templateId", info.getTemplateId());
        map.putString("messageId", info.getMessageId());
        return map;
    }

    private IterableAttributionInfo mapToAttributionInfo(ReadableMap map) {
        if (map == null) {
            return null;
        }

        return new IterableAttributionInfo(
            map.getString("campaignId"),
            map.getString("templateId"),
            map.getString("messageId")
        );
    }

    private void sendEvent(String eventName, String body) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, body);
    }
}
