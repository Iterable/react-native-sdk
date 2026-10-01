package com.iterable.iterableapi;

import org.junit.Test;
import org.mockito.MockedStatic;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.verify;

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
}
