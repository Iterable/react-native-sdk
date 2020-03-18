package com.iterable.reactnative;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.iterable.iterableapi.IterableApi;

public class RNIterableAPIModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNIterableAPIModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNIterableAPI";
    }

    @ReactMethod
    public void initializeWithApiKey(String apiKey) {
        //
        Log.d("ReactNative", "initializeWithApiKey: " + apiKey);
        IterableApi.getInstance().initialize(reactContext, apiKey);
    }

    @ReactMethod
    public void setEmail(String email) {
        //
        Log.d("ReactNative", "setEmail: " + email);
        IterableApi.getInstance().setEmail(email);
    }

    @ReactMethod
    public void getInAppMessages(Promise promise) {
        Log.d("ReactNative", "getMessages");
        promise.resolve(IterableApi.getInstance().getInAppManager().getMessages());
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }
}
