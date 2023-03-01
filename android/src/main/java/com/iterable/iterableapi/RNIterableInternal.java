package com.iterable.iterableapi;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

public class RNIterableInternal {

    private static String TAG = "RNIterableInternal";

    public static String getEmail() {
        return IterableApi.getInstance().getEmail();
    }

    public static String getUserId() {
        return IterableApi.getInstance().getUserId();
    }

    public static JSONObject getInAppMessageJson(IterableInAppMessage message) {
        JSONObject messageJson = message.toJSONObject();

        if (message.getCustomPayload() != null) {
            try {
                messageJson.put(IterableConstants.ITERABLE_IN_APP_CUSTOM_PAYLOAD, convertJsonToMap(message.getCustomPayload()));
            } catch (JSONException e) {
                // something crazy happened if we're here so we'll just skip
            }
        }

        return messageJson;
    }

    public static IterableInAppMessage getMessageById(String messageId) {
        return IterableApi.getInstance().getInAppManager().getMessageById(messageId);
    }
    
    public static void trackPushOpenWithCampaignId(Integer campaignId, Integer templateId, String messageId, @Nullable JSONObject dataFields) {
        IterableApi.getInstance().trackPushOpen(campaignId, templateId, messageId, dataFields);
    }

    public static void setAttributionInfo(IterableAttributionInfo attributionInfo) {
        IterableApi.getInstance().setAttributionInfo(attributionInfo);
    }

    // obtained from https://gist.github.com/viperwarp/2beb6bbefcc268dee7ad
    // copied over from Serialization.java for expediency, this can definitely be reorganized better

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
}
