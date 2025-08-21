package com.iterable.reactnative;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class RNIterableAPIModule extends NativeRNIterableAPISpec {
  private final ReactApplicationContext reactContext;

  RNIterableAPIModule(ReactApplicationContext context) {
      super(context);
      this.reactContext = context;
  }

  @Override
  @NonNull
  public String getName() {
      return RNIterableAPIModuleImpl.NAME;
  }

  @Override
  public void add(double a, double b, Promise promise) {
      // promise.resolve(a + b);
      RNIterableAPIModuleImpl.add(a, b, promise);
  }
}
