package com.iterable.reactnative;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.iterable.iterableapi.IterableUrlCallback;

public class IterableUrlHandler implements IterableUrlCallback {
    private final ReactApplicationContext reactContext;
    private final ReadableMap config;

    public IterableUrlHandler(ReadableMap config) {
        this.config = config;
        this.reactContext = null;
    }

    public IterableUrlHandler(ReadableMap config, ReactApplicationContext reactContext) {
        this.config = config;
        this.reactContext = reactContext;
    }

    @Override
    public boolean handleIterableURL(String url) {
        if (reactContext != null) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("urlHandler", url);
        }
        return config.getBoolean("shouldOpenInNewWindow");
    }
}
