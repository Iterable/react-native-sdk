package com.iterabletestrn;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class TestBridge extends ReactContextBaseJavaModule {

    public TestBridge(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }

    @NonNull
    @Override
    public String getName() {
        return "IterableTestBridge";
    }


    /*
    Bridge Methods start here
     */
    @ReactMethod
    public void sayHi(Callback errorCallback, Callback successCallback) {
        try {
            System.out.println("Greetings from Java");
            successCallback.invoke("Callback : Greetings from Java");
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}
