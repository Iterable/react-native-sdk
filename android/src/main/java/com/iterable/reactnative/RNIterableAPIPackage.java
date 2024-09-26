package com.iterable.reactnative;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;


public class RNIterableAPIPackage implements ReactPackage {
    // @Override
    // public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    //     return Arrays.<NativeModule>asList(new RNIterableAPIModule(reactContext));
    // }

    // @Override
    // public List<NativeModule> createNativeModules(
    //         ReactApplicationContext reactContext) {
    //     List<NativeModule> modules = new ArrayList<>();

    //     modules.add(new RNIterableAPIModule(reactContext));

    //     return modules;
    // }

    // @Override
    // public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    //     return Collections.emptyList();
    // }
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new RNIterableAPIModule(reactContext));

        return modules;
    }
}
