package com.iterable.iterableapi;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockedStatic;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 34)
public class RNIterableInternalTest {

    @Test
    public void trackPushOpenWithCampaignId_forwardsAppAlreadyRunningTrue() {
        IterableApi api = mock(IterableApi.class);
        try (MockedStatic<IterableApi> iterableApi = mockStatic(IterableApi.class)) {
            iterableApi.when(IterableApi::getInstance).thenReturn(api);

            RNIterableInternal.trackPushOpenWithCampaignId(
                    10, 20, "message-id", true, null);

            verify(api).trackPushOpen(
                    eq(10), eq(20), eq("message-id"), eq(true), isNull());
        }
    }

    @Test
    public void trackPushOpenWithCampaignId_forwardsAppAlreadyRunningFalse() {
        IterableApi api = mock(IterableApi.class);
        try (MockedStatic<IterableApi> iterableApi = mockStatic(IterableApi.class)) {
            iterableApi.when(IterableApi::getInstance).thenReturn(api);

            RNIterableInternal.trackPushOpenWithCampaignId(
                    10, 20, "message-id", false, null);

            verify(api).trackPushOpen(
                    eq(10), eq(20), eq("message-id"), eq(false), isNull());
        }
    }

    @Test
    public void getInAppMessageJson_overwritesNativeIntegerJsonOnlyWithBooleanTrue()
            throws JSONException {
        IterableInAppMessage message = mock(IterableInAppMessage.class);
        JSONObject nativeJson = new JSONObject();
        nativeJson.put("jsonOnly", 1);
        when(message.toJSONObject()).thenReturn(nativeJson);
        when(message.isJsonOnly()).thenReturn(true);

        JSONObject bridgeJson = RNIterableInternal.getInAppMessageJson(message);

        assertTrue(bridgeJson.getBoolean("jsonOnly"));
    }

    @Test
    public void getInAppMessageJson_writesBooleanFalseForHtmlMessages()
            throws JSONException {
        IterableInAppMessage message = mock(IterableInAppMessage.class);
        JSONObject nativeJson = new JSONObject();
        nativeJson.put("messageId", "msg-1");
        when(message.toJSONObject()).thenReturn(nativeJson);
        when(message.isJsonOnly()).thenReturn(false);

        JSONObject bridgeJson = RNIterableInternal.getInAppMessageJson(message);

        assertFalse(bridgeJson.getBoolean("jsonOnly"));
    }
}
