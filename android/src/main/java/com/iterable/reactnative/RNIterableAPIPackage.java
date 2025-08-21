package com.iterable.reactnative;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import androidx.annotation.Nullable;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;
import com.facebook.react.uimanager.ViewManager;


public class RNIterableAPIPackage extends TurboReactPackage {
    @Nullable
    @Override
    public NativeModule getModule(String name, ReactApplicationContext reactContext) {
      if (name.equals(RNIterableAPIModuleImpl.NAME)) {
          return new RNIterableAPIModule(reactContext);
      } else {
          return null;
      }
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return () -> {
            final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
            boolean isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
            moduleInfos.put(
              RNIterableAPIModuleImpl.NAME,
              new ReactModuleInfo(
                  RNIterableAPIModuleImpl.NAME,
                  RNIterableAPIModuleImpl.NAME,
                  false, // canOverrideExistingModule
                  false, // needsEagerInit
                  true, // hasConstants
                  false, // isCxxModule
                  isTurboModule // isTurboModule
              )
            );
            return moduleInfos;
        };
    }
}
