package com.iterable.iterableapi;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.fail;
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
import java.util.concurrent.CountDownLatch;
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

    private static void assertAuthRequestThreadFinished(
            Thread requestThread,
            CountDownLatch requestCompleted,
            AtomicReference<Throwable> requestError,
            long joinTimeoutMs)
            throws InterruptedException {
        requestThread.join(joinTimeoutMs);
        Throwable thrown = requestError.get();
        if (thrown != null) {
            AssertionError failure =
                    new AssertionError(
                            "onAuthTokenRequested threw instead of returning normally", thrown);
            throw failure;
        }
        if (requestThread.isAlive()) {
            fail(
                    "onAuthTokenRequested thread still alive after "
                            + joinTimeoutMs
                            + " ms; join did not prove the call returned");
        }
        if (requestCompleted.getCount() > 0) {
            fail(
                    "onAuthTokenRequested did not complete a normal return before the join window "
                            + "ended (completion latch not released)");
        }
    }

    private static Thread startAuthRequestOnNewThread(
            RNIterableAPIModuleImpl module,
            AtomicReference<String> result,
            AtomicReference<Throwable> requestError,
            CountDownLatch requestCompleted) {
        Thread requestThread =
                new Thread(
                        () -> {
                            try {
                                result.set(module.onAuthTokenRequested());
                                requestCompleted.countDown();
                            } catch (Throwable t) {
                                requestError.set(t);
                            }
                        });
        requestThread.start();
        return requestThread;
    }

    @Test
    public void onAuthTokenRequested_clearsStaleTokenBeforeWaiting() throws Exception {
        module.passAlongAuthToken("stale-token");

        AtomicReference<String> result = new AtomicReference<>();
        AtomicReference<Throwable> requestError = new AtomicReference<>();
        CountDownLatch requestCompleted = new CountDownLatch(1);
        Thread requestThread =
                startAuthRequestOnNewThread(module, result, requestError, requestCompleted);
        waitUntilAuthLatchArmed(module, 5000);
        module.passAlongAuthToken("fresh-token");
        assertAuthRequestThreadFinished(requestThread, requestCompleted, requestError, 5000);

        assertEquals("fresh-token", result.get());
    }

    /**
     * Criterion 1: when the production 30 s {@code CountDownLatch.await} expires with no
     * JS reply, {@code onAuthTokenRequested} returns null — not the stale token stored
     * before the request (cleared at request start).
     */
    @Test
    public void onAuthTokenRequested_returnsNullAfterTimeoutWithoutReply() throws Exception {
        module.passAlongAuthToken("stale-token");

        AtomicReference<String> result = new AtomicReference<>();
        AtomicReference<Throwable> requestError = new AtomicReference<>();
        CountDownLatch requestCompleted = new CountDownLatch(1);
        Thread requestThread =
                startAuthRequestOnNewThread(module, result, requestError, requestCompleted);
        assertAuthRequestThreadFinished(requestThread, requestCompleted, requestError, 35_000);

        assertNull(
                "onAuthTokenRequested must return null after a timed-out wait without a reply",
                result.get());
    }

    @Test
    public void onAuthTokenRequested_waitsForOwnReplyAfterLateTokenFromPriorTimeout()
            throws Exception {
        module.passAlongAuthToken("late-from-timed-out-request");

        AtomicReference<String> result = new AtomicReference<>();
        AtomicReference<Throwable> requestError = new AtomicReference<>();
        CountDownLatch requestCompleted = new CountDownLatch(1);
        Thread requestThread =
                startAuthRequestOnNewThread(module, result, requestError, requestCompleted);
        waitUntilAuthLatchArmed(module, 5000);
        module.passAlongAuthToken("current-request-token");
        assertAuthRequestThreadFinished(requestThread, requestCompleted, requestError, 5000);

        assertEquals("current-request-token", result.get());
    }
}