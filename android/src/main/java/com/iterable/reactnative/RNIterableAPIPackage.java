package com.iterable.reactnative;

import java.util.HashMap;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.facebook.react.BaseReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

public class RNIterableAPIPackage extends BaseReactPackage {
    @Nullable
    @Override
    public NativeModule getModule(@NonNull String name, @NonNull ReactApplicationContext reactContext) {
      if (RNIterableAPIModuleImpl.NAME.equals(name)) {
          return new RNIterableAPIModule(reactContext);
      } else {
          return null;
      }
    }

    @NonNull
    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
      return new ReactModuleInfoProvider() {
        @NonNull
        @Override
        public Map<String, ReactModuleInfo> getReactModuleInfos() {
          Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
          moduleInfos.put(RNIterableAPIModuleImpl.NAME, new ReactModuleInfo(
            RNIterableAPIModuleImpl.NAME,
            RNIterableAPIModuleImpl.NAME,
            false,  // canOverrideExistingModule
            false,  // needsEagerInit
            false,  // isCxxModule
            true     // isTurboModule
          ));
          return moduleInfos;
        }
      };
    }
}
