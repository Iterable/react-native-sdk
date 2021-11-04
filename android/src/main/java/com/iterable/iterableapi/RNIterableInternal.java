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
        return message.toJSONObject();
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
