package com.iterable.iterableapi;

import androidx.annotation.Nullable;

import org.json.JSONObject;

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

        if (message.customPayload != null) {
            messageJson.put(IterableConstants.ITERABLE_IN_APP_CUSTOM_PAYLOAD, convertCustomPayloadToReadableMap(message.customPayload))
        }

        return messageJson;
    }

    private static ReadableMap convertCustomPayloadToReadableMap(JSONObject customPayload) throws JSONException {
        // modified from https://gist.github.com/viperwarp/2beb6bbefcc268dee7ad
        ReadableMap customPayloadMap = new ReadableMap();

        Iterator<String> iterator = customPayload.keys();

        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                customPayloadMap.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                customPayloadMap.putArray(key, convertJsonToArray((JSONArray) value));
            } else if (value instanceof Boolean) {
                customPayloadMap.putBoolean(key, (Boolean) value);
            } else if (value instanceof Integer) {
                customPayloadMap.putInt(key, (Integer) value);
            } else if (value instanceof Double) {
                customPayloadMap.putDouble(key, (Double) value);
            } else if (value instanceof String) {
                customPayloadMap.putString(key, (String) value);
            } else {
                customPayloadMap.putString(key, value.toString());
            }
        }

        return customPayloadMap;
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

}
