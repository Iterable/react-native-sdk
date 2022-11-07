package com.iterable.reactnative;

import android.util.Log;

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
import com.iterable.iterableapi.IterableInboxSession;
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
            JSONArray commerceItemJsonArray = convertArrayToJson(array);
            for (int i = 0; i < commerceItemJsonArray.length(); i++) {
                JSONObject item = commerceItemJsonArray.getJSONObject(i);
                list.add(commerceItemFromMap(item));
            }
        } catch (JSONException e) {
            IterableLogger.e(TAG, "Failed converting to JSONObject");
        }
        return list;
    }

    static CommerceItem commerceItemFromMap(JSONObject itemMap) throws JSONException {
        String[] categories = null;
        JSONArray categoriesArray = itemMap.optJSONArray("categories");

        if (categoriesArray != null) {
            for (int i = 0; i < categoriesArray.length(); i++) {
                if (categories == null) {
                    categories = new String[categoriesArray.length()];
                }
                categories[i] = categoriesArray.getString(i);
            }
        }
        
        return new CommerceItem(itemMap.getString("id"),
                itemMap.getString("name"),
                itemMap.getDouble("price"),
                itemMap.getInt("quantity"),
                itemMap.optString("sku", null),
                itemMap.optString("description", null),
                itemMap.optString("url", null),
                itemMap.optString("imageUrl", null),
                categories,
                itemMap.optJSONObject("dataFields")
        );
    }

    static JSONObject messageContentToJsonObject(IterableInAppMessage.Content content) {
        if (content == null) {
            return null;
        }

        JSONObject messageContent = new JSONObject();
        try {
            messageContent.put("edgeInsets", content.padding);
            messageContent.put("html", content.html);
            if (messageContent.length() == 0) {
                return null;
            }
        } catch (JSONException e) {
            IterableLogger.e(TAG, "Failed to serialize message content\n" + e.getLocalizedMessage());
            return null;
        }
        return messageContent;
    }

    static JSONArray serializeInAppMessages(List<IterableInAppMessage> inAppMessages) {
        JSONArray inAppMessagesJson = new JSONArray();
        for (IterableInAppMessage message : inAppMessages) {
            JSONObject messageJson = RNIterableInternal.getInAppMessageJson(message);
            inAppMessagesJson.put(messageJson);
        }
        return inAppMessagesJson;
    }

    static IterableConfig.Builder getConfigFromReadableMap(ReadableMap iterableContextMap) {
        try {
            JSONObject iterableContextJSON = convertMapToJson(iterableContextMap);

            IterableConfig.Builder configBuilder = new IterableConfig.Builder();

            if (iterableContextJSON.has("allowedProtocols")) {
                WritableArray allowedProtocolsArray = convertJsonToArray(iterableContextJSON.getJSONArray("allowedProtocols"));

                String[] allowedProtocols = new String[allowedProtocolsArray.size()];

                for (int i = 0; i < allowedProtocolsArray.size(); i++) {
                    allowedProtocols[i] = allowedProtocolsArray.getString(i);
                }

                if (allowedProtocols != null) {
                    configBuilder.setAllowedProtocols(allowedProtocols);
                }
            }

            if (iterableContextJSON.has("pushIntegrationName")) {
                configBuilder.setPushIntegrationName(iterableContextJSON.optString("pushIntegrationName"));
            }

            if (iterableContextJSON.has("autoPushRegistration")) {
                configBuilder.setAutoPushRegistration(iterableContextJSON.optBoolean("autoPushRegistration"));
            }

            if (iterableContextJSON.has("inAppDisplayInterval")) {
                configBuilder.setInAppDisplayInterval(iterableContextJSON.optDouble("inAppDisplayInterval"));
            }

            if (iterableContextJSON.has("useInMemoryStorageForInApps") || iterableContextJSON.has("androidSdkUseInMemoryStorageForInApps")) {
                configBuilder.setUseInMemoryStorageForInApps(iterableContextJSON.optBoolean("useInMemoryStorageForInApps"));
            }

            if (iterableContextJSON.has("logLevel")) {
                int logLevel = iterableContextJSON.getInt("logLevel");
                switch (logLevel) {
                    case 1:
                        //Debug
                        logLevel = Log.DEBUG;
                        break;
                    case 2:
                        //info
                        logLevel = Log.VERBOSE;
                        break;
                    case 3:
                        //error
                        logLevel = Log.ERROR;
                        break;
                    default:
                        logLevel = Log.ERROR;
                        break;
                }

                configBuilder.setLogLevel(logLevel);
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

    static JSONObject actionContextToJson(IterableActionContext iterableActionContext) {
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

    static IterableInboxSession.Impression inboxImpressionFromMap(JSONObject impressionMap) throws JSONException {
        return new IterableInboxSession.Impression(impressionMap.getString("messageId"),
                impressionMap.getBoolean("silentInbox"),
                impressionMap.optInt("displayCount", 0),
                (float) impressionMap.optDouble("duration", 0)
        );
    }

    static List<IterableInboxSession.Impression> impressionsFromReadableArray(ReadableArray array) {
        ArrayList<IterableInboxSession.Impression> list = new ArrayList<>();

        try {
            JSONArray impressionJsonArray = convertArrayToJson(array);

            for (int i = 0; i < impressionJsonArray.length(); i++) {
                JSONObject impressionObj = impressionJsonArray.getJSONObject(i);
                list.add(inboxImpressionFromMap(impressionObj));
            }
        } catch (JSONException e) {
            IterableLogger.e(TAG, "Failed converting to JSONObject");
        }

        return list;
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
