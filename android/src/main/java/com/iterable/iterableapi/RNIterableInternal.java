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

    public static JSONObject getInAppMessageJson(IterableInAppMessage message) {
        return message.toJSONObject();
    }

    public static IterableInAppMessage getMessageById(String messageId) {
        return IterableApi.getInstance().getInAppManager().getMessageById(messageId);
    }

    public static void trackInAppClose(String messageId, String clickedUrl, IterableInAppCloseAction closeAction, IterableInAppLocation location) {
        IterableApi.getInstance().trackInAppClose(messageId, clickedUrl, closeAction, location);
    }

}
