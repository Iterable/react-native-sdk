package com.iterable.iterableapi;

public class RNIterableInternal {

    public static String getUserId() {
        return IterableApi.getInstance().getUserId();
    }   

    public static IterableInAppMessage getMessageById(String messageId) {
        return IterableApi.getInstance().getInAppManager().getMessageById(messageId);
    }

    public static void trackInAppClose(String messageId, String clickedUrl, IterableInAppCloseAction closeAction, IterableInAppLocation location) {
        IterableApi.getInstance().trackInAppClose(messageId, clickedUrl, closeAction, location);
    }

}
