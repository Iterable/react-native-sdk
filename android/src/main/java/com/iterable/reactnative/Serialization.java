package com.iterable.reactnative;

import androidx.annotation.Nullable;

import com.iterable.iterableapi.IterableInAppCloseAction;
import com.iterable.iterableapi.IterableInAppDeleteActionType;
import com.iterable.iterableapi.IterableInAppLocation;

public class Serialization {

    static IterableInAppLocation getIterableInAppLocationFromInteger(@Nullable Integer location) {
        if (location == null || location >= IterableInAppLocation.values().length || location < 0) {
            return null;
        } else {
            return IterableInAppLocation.values()[location];
        }
    }

    static IterableInAppCloseAction getIterableInAppCloseSourceFromInteger(@Nullable Integer location) {
        if (location == null || location >= IterableInAppCloseAction.values().length || location < 0) {
            return null;
        } else {
            return IterableInAppCloseAction.values()[location];
        }
    }

    static IterableInAppDeleteActionType getIterableDeleteActionTypeFromInteger(@Nullable Integer actionType) {
        if (actionType == null || actionType >= IterableInAppCloseAction.values().length || actionType < 0) {
            return null;
        } else {
            return IterableInAppDeleteActionType.values()[actionType];
        }
    }
}
