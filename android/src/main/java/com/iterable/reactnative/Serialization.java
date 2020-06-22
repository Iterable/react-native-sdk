package com.iterable.reactnative;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.iterable.iterableapi.CommerceItem;
import com.iterable.iterableapi.IterableAction;
import com.iterable.iterableapi.IterableActionContext;
import com.iterable.iterableapi.IterableConfig;
import com.iterable.iterableapi.IterableInAppCloseAction;
import com.iterable.iterableapi.IterableInAppDeleteActionType;
import com.iterable.iterableapi.IterableInAppHandler;
import com.iterable.iterableapi.IterableInAppLocation;
import com.iterable.iterableapi.IterableInAppMessage;
import com.iterable.iterableapi.IterableLogger;
import com.iterable.iterableapi.RNIterableInternal;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

class Serialization {
    static String TAG = "Serialization";

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

    static IterableInAppHandler.InAppResponse getInAppResponse(@Nullable Integer inAppResponseInteger) {
        if (inAppResponseInteger == null || inAppResponseInteger >= IterableInAppCloseAction.values().length || inAppResponseInteger < 0) {
            return null;
        } else {
            return IterableInAppHandler.InAppResponse.values()[inAppResponseInteger];
        }
    }

    static List<CommerceItem> commerceItemsFromReadableArray(ReadableArray array) {
        ArrayList<CommerceItem> list = new ArrayList<>();
        try {
            JSONArray commerceItemJsonarray = convertArrayToJson(array);
            for (int i = 0; i < commerceItemJsonarray.length(); i++) {
                JSONObject item = commerceItemJsonarray.getJSONObject(i);
                list.add(commerceItemFromMap(item));
            }
        } catch (JSONException e) {
            IterableLogger.e(TAG, "Failed converting to JSONObject");
        }
        return list;
    }

    static CommerceItem commerceItemFromMap(JSONObject itemMap) throws JSONException {
        return new CommerceItem(itemMap.getString("id"),
                itemMap.getString("name"),
                itemMap.getDouble("price"),
                itemMap.getInt("quantity"));
    }

    static JSONArray serializeInAppMessages(List<IterableInAppMessage> inappMessages) {
        JSONArray inappMessagesJson = new JSONArray();
        for (IterableInAppMessage message : inappMessages) {
            JSONObject messageJson = RNIterableInternal.getInAppMessageJson(message);
            inappMessagesJson.put(messageJson);
        }
        return inappMessagesJson;
    }

    static IterableConfig.Builder getConfigFromReadableMap(ReadableMap iterableContextMap) {
        try {
            JSONObject iterableContextJSON = convertMapToJson(iterableContextMap);

            IterableConfig.Builder configBuilder = new IterableConfig.Builder();
            if (iterableContextJSON.has("pushIntegrationName")) {
                configBuilder.setPushIntegrationName(iterableContextJSON.optString("pushIntegrationName"));
            }

            if (iterableContextJSON.has("autoPushRegistration")) {
                configBuilder.setAutoPushRegistration(iterableContextJSON.optBoolean("autoPushRegistration"));
            }

            if (iterableContextJSON.has("checkForDeferredDeeplink")) {
                configBuilder.setCheckForDeferredDeeplink(iterableContextJSON.optBoolean("checkForDeferredDeeplink"));
            }

            if (iterableContextJSON.has("inAppDisplayInterval")) {
                configBuilder.setInAppDisplayInterval(iterableContextJSON.optDouble("inAppDisplayInterval"));
            }

            return configBuilder;
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }

    static JSONObject actionToJson(IterableAction iterableAction) {
        JSONObject actionJson = new JSONObject();
        try {
            actionJson.put("type", iterableAction.getType());
            if (iterableAction.getData() != null && iterableAction.getData() != "") {
                actionJson.put("data", iterableAction.getData());
            }
            if (iterableAction.userInput == null && iterableAction.userInput != "") {
                actionJson.put("userInput", iterableAction.userInput);
            }
        } catch (JSONException e) {
            IterableLogger.e(TAG, e.getLocalizedMessage());
        }
        return actionJson;
    }

    static JSONObject contextToJSON(IterableActionContext iterableActionContext) {
        JSONObject actionContextJson = new JSONObject();
        JSONObject actionJson = Serialization.actionToJson(iterableActionContext.action);
        try {
            actionContextJson.put("action", actionJson);
            actionContextJson.put("source", iterableActionContext.source.ordinal());
        } catch (JSONException e) {
            IterableLogger.e(TAG, e.getLocalizedMessage());
        }
        return actionContextJson;
    }

    // ---------------------------------------------------------------------------------------
    // region React Native JSON conversion methods
    // obtained from https://gist.github.com/viperwarp/2beb6bbefcc268dee7ad

    static WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = new WritableNativeMap();

        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
            } else if (value instanceof Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String) {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
        return map;
    }

    static WritableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {
        WritableArray array = new WritableNativeArray();

        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof JSONObject) {
                array.pushMap(convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                array.pushArray(convertJsonToArray((JSONArray) value));
            } else if (value instanceof Boolean) {
                array.pushBoolean((Boolean) value);
            } else if (value instanceof Integer) {
                array.pushInt((Integer) value);
            } else if (value instanceof Double) {
                array.pushDouble((Double) value);
            } else if (value instanceof String) {
                array.pushString((String) value);
            } else {
                array.pushString(value.toString());
            }
        }
        return array;
    }

    static JSONObject convertMapToJson(ReadableMap readableMap) throws JSONException {
        JSONObject object = new JSONObject();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            switch (readableMap.getType(key)) {
                case Null:
                    object.put(key, JSONObject.NULL);
                    break;
                case Boolean:
                    object.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    object.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    object.put(key, readableMap.getString(key));
                    break;
                case Map:
                    object.put(key, convertMapToJson(readableMap.getMap(key)));
                    break;
                case Array:
                    object.put(key, convertArrayToJson(readableMap.getArray(key)));
                    break;
            }
        }
        return object;
    }

    static JSONArray convertArrayToJson(ReadableArray readableArray) throws JSONException {
        JSONArray array = new JSONArray();
        for (int i = 0; i < readableArray.size(); i++) {
            switch (readableArray.getType(i)) {
                case Null:
                    break;
                case Boolean:
                    array.put(readableArray.getBoolean(i));
                    break;
                case Number:
                    array.put(readableArray.getDouble(i));
                    break;
                case String:
                    array.put(readableArray.getString(i));
                    break;
                case Map:
                    array.put(convertMapToJson(readableArray.getMap(i)));
                    break;
                case Array:
                    array.put(convertArrayToJson(readableArray.getArray(i)));
                    break;
            }
        }
        return array;
    }
    // ---------------------------------------------------------------------------------------
    // endregion
}