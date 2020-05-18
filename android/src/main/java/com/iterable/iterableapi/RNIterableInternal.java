package com.iterable.iterableapi;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Date;

public class RNIterableInternal {

    private static String TAG = "RNIterableInternal";

    public static String getEmail() {
        return IterableApi.getInstance().getEmail();
    }

    public static String getUserId() {
        return IterableApi.getInstance().getUserId();
    }

    public static Date getExpirationDate(IterableInAppMessage message) {
        return message.getExpiresAt();
    }

    public static JSONObject getTriggerType(IterableInAppMessage message) {
        JSONObject trigger = new JSONObject();
        try {
            trigger.putOpt("type", message.getTriggerType().ordinal());
        } catch (JSONException e) {
            IterableLogger.e(TAG,e.getLocalizedMessage());
            return null;
        }
        return trigger;
    }

    public static IterableInAppMessage getMessageById(String messageId) {
        return IterableApi.getInstance().getInAppManager().getMessageById(messageId);
    }

    public static void trackInAppClose(String messageId, String clickedUrl, IterableInAppCloseAction closeAction, IterableInAppLocation location) {
        IterableApi.getInstance().trackInAppClose(messageId, clickedUrl, closeAction, location);
    }

}
