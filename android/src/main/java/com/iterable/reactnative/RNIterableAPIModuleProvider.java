package com.iterable.reactnative;

import androidx.annotation.NonNull;
import com.facebook.react.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import com.facebook.react.turbomodule.core.interfaces.TurboModuleProvider;

@ReactModule(name = RNIterableAPISpec.NAME)
public class RNIterableAPIModuleProvider implements TurboModuleProvider {
    private final ReactApplicationContext reactContext;

    public RNIterableAPIModuleProvider(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return RNIterableAPISpec.NAME;
    }

    @Override
    public TurboModule getModule() {
        return new RNIterableAPIImpl(reactContext);
    }
}
