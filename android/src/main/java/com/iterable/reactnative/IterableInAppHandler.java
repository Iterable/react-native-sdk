package com.iterable.reactnative;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.iterable.iterableapi.IterableInAppMessage;
import com.iterable.iterableapi.IterableInAppHandler;

public class IterableInAppHandler implements IterableInAppHandler {
    private final ReactApplicationContext reactContext;
    private final ReadableMap config;

    public IterableInAppHandler(ReadableMap config) {
        this.config = config;
        this.reactContext = null;
    }

    public IterableInAppHandler(ReadableMap config, ReactApplicationContext reactContext) {
        this.config = config;
        this.reactContext = reactContext;
    }

    @Override
    public boolean onInAppReceived(IterableInAppMessage message) {
        if (reactContext != null) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("inAppReceived", message.getMessageId());
        }
        return config.getBoolean("shouldShowInApp");
    }

    @Override
    public void onInAppDisplayed(IterableInAppMessage message) {
        if (reactContext != null) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("inAppDisplayed", message.getMessageId());
        }
    }

    @Override
    public void onInAppDismissed(IterableInAppMessage message) {
        if (reactContext != null) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("inAppDismissed", message.getMessageId());
        }
    }

    @Override
    public void onInAppClicked(IterableInAppMessage message, String clickedUrl) {
        if (reactContext != null) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("inAppClicked", message.getMessageId());
        }
    }
}
