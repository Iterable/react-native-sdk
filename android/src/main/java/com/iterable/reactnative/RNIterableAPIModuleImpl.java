package com.iterable.reactnative;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import java.util.Map;
import java.util.HashMap;

public class RNIterableAPIModuleImpl {

    public static final String NAME = "RNIterableAPI";

    public static void add(double a, double b, Promise promise) {
        promise.resolve(a + b);
    }

}
