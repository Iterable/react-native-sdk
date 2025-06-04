package com.iterable.reactnative;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.iterable.iterableapi.IterableAction;
import com.iterable.iterableapi.IterableActionContext;
import com.iterable.iterableapi.IterableCustomActionHandler;

public class IterableCustomActionHandler implements IterableCustomActionHandler {
    private final ReactApplicationContext reactContext;
    private final ReadableMap config;

    public IterableCustomActionHandler(ReadableMap config) {
        this.config = config;
        this.reactContext = null;
    }

    public IterableCustomActionHandler(ReadableMap config, ReactApplicationContext reactContext) {
        this.config = config;
        this.reactContext = reactContext;
    }

    @Override
    public boolean handleIterableCustomAction(IterableAction action, IterableActionContext actionContext) {
        if (reactContext != null) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("customActionHandler", action.getType());
        }
        return config.getBoolean("shouldHandleCustomAction");
    }
}
