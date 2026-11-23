package com.iterable.iterableapi;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.iterable.reactnative.RNIterableAPIModuleImpl;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import java.lang.reflect.Field;
import java.util.concurrent.atomic.AtomicReference;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 34)
public class RNIterableAPIModuleImplAuthTokenTest {

    private RNIterableAPIModuleImpl module;

    @Before
    public void setUp() {
        ReactApplicationContext reactContext = mock(ReactApplicationContext.class);
        DeviceEventManagerModule.RCTDeviceEventEmitter emitter =
                mock(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        when(reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class))
                .thenReturn(emitter);
        module = new RNIterableAPIModuleImpl(reactContext);
    }

  private static void waitUntilAuthLatchArmed(
          RNIterableAPIModuleImpl module, long timeoutMs) throws Exception {
        Field latchField =
                RNIterableAPIModuleImpl.class.getDeclaredField("authHandlerCallbackLatch");
        latchField.setAccessible(true);
        long deadline = System.currentTimeMillis() + timeoutMs;
        while (latchField.get(module) == null && System.currentTimeMillis() < deadline) {
            Thread.yield();
        }
        assertNotNull(
                "authHandlerCallbackLatch should be armed after onAuthTokenRequested starts",
                latchField.get(module));
    }

    @Test
    public void onAuthTokenRequested_clearsStaleTokenBeforeWaiting() throws Exception {
        module.passAlongAuthToken("stale-token");

        AtomicReference<String> result = new AtomicReference<>();
        Thread requestThread = new Thread(() -> result.set(module.onAuthTokenRequested()));
        requestThread.start();
        waitUntilAuthLatchArmed(module, 5000);
        module.passAlongAuthToken("fresh-token");
        requestThread.join(5000);

        assertEquals("fresh-token", result.get());
    }

    @Test
    public void onAuthTokenRequested_returnsNullAfterTimeoutWithoutReply() throws Exception {
        module.passAlongAuthToken("stale-token");

        AtomicReference<String> result = new AtomicReference<>();
        Thread requestThread = new Thread(() -> result.set(module.onAuthTokenRequested()));
        requestThread.start();
        requestThread.join(35_000);

        assertNull(result.get());
    }

    /**
     * Criterion 3: a late JS reply after a prior timeout must not satisfy the next
     * request when that request receives no new reply. Without clearing
     * passedAuthToken at request start, this returns the stale late token after the
     * wait expires instead of null.
     */
    @Test
    public void onAuthTokenRequested_doesNotReturnLateTokenAfterPriorTimeoutWhenUnanswered()
            throws Exception {
        module.passAlongAuthToken("late-from-timed-out-request");

        AtomicReference<String> result = new AtomicReference<>();
        Thread requestThread = new Thread(() -> result.set(module.onAuthTokenRequested()));
        requestThread.start();
        requestThread.join(35_000);

        assertNull(result.get());
    }

    @Test
    public void onAuthTokenRequested_waitsForOwnReplyAfterLateTokenFromPriorTimeout()
            throws Exception {
        module.passAlongAuthToken("late-from-timed-out-request");

        AtomicReference<String> result = new AtomicReference<>();
        Thread requestThread = new Thread(() -> result.set(module.onAuthTokenRequested()));
        requestThread.start();
        waitUntilAuthLatchArmed(module, 5000);
        module.passAlongAuthToken("current-request-token");
        requestThread.join(5000);

        assertEquals("current-request-token", result.get());
    }
}