package com.iterable.iterableapi;

import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.robolectric.Shadows.shadowOf;

import android.net.Uri;
import android.os.Looper;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.iterable.reactnative.RNIterableAPIModuleImpl;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import java.util.concurrent.atomic.AtomicReference;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 34)
public class RNIterableAPIModuleImplShowMessageTest {

    private static final String MESSAGE_ID = "message-id";

    private IterableApi originalApi;
    private IterableInAppManager inAppManager;
    private IterableInAppMessage message;
    private Promise promise;
    private RNIterableAPIModuleImpl module;

    @Before
    public void setUp() {
        originalApi = IterableApi.sharedInstance;
        IterableApi api = mock(IterableApi.class);
        inAppManager = mock(IterableInAppManager.class);
        message = mock(IterableInAppMessage.class);
        promise = mock(Promise.class);
        when(api.getInAppManager()).thenReturn(inAppManager);
        when(inAppManager.getMessageById(MESSAGE_ID)).thenReturn(message);
        IterableApi.sharedInstance = api;
        module = new RNIterableAPIModuleImpl(mock(ReactApplicationContext.class));
    }

    @After
    public void tearDown() {
        IterableApi.sharedInstance = originalApi;
    }

    @Test
    public void showMessageFromBridgeThreadDisplaysOnMainThread() throws InterruptedException {
        final AtomicReference<Thread> displayThread = new AtomicReference<>();
        doAnswer(invocation -> {
            displayThread.set(Thread.currentThread());
            return null;
        }).when(inAppManager).showMessage(eq(message), eq(true), any(IterableHelper.IterableUrlCallback.class));

        Thread bridgeThread = new Thread(() -> module.showMessage(MESSAGE_ID, true, promise));
        bridgeThread.start();
        bridgeThread.join();

        assertNull(displayThread.get());

        shadowOf(Looper.getMainLooper()).idle();

        assertSame(Looper.getMainLooper().getThread(), displayThread.get());
    }

    @Test
    public void showMessageRejectsWhenMessageIsMissing() {
        module.showMessage("missing", true, promise);
        shadowOf(Looper.getMainLooper()).idle();

        verify(promise).reject("", "Could not find message with id: missing");
        verify(inAppManager, never()).showMessage(any(IterableInAppMessage.class), anyBoolean(), any(IterableHelper.IterableUrlCallback.class));
    }

    @Test
    public void showMessageRejectsWhenMessageIdIsEmpty() {
        module.showMessage(new String(""), true, promise);
        shadowOf(Looper.getMainLooper()).idle();

        verify(promise).reject("", "messageId is null or empty");
        verify(inAppManager, never()).showMessage(any(IterableInAppMessage.class), anyBoolean(), any(IterableHelper.IterableUrlCallback.class));
    }

    @Test
    public void showMessageResolvesClickedUrl() {
        stubClickWith(Uri.parse("https://iterable.com"));

        module.showMessage(MESSAGE_ID, false, promise);
        shadowOf(Looper.getMainLooper()).idle();

        verify(promise).resolve("https://iterable.com");
    }

    @Test
    public void showMessageResolvesNullWhenClosedWithoutUrl() {
        stubClickWith(null);

        module.showMessage(MESSAGE_ID, false, promise);
        shadowOf(Looper.getMainLooper()).idle();

        verify(promise).resolve(isNull());
    }

    private void stubClickWith(final Uri url) {
        doAnswer(invocation -> {
            IterableHelper.IterableUrlCallback callback = invocation.getArgument(2);
            callback.execute(url);
            return null;
        }).when(inAppManager).showMessage(eq(message), eq(false), any(IterableHelper.IterableUrlCallback.class));
    }
}
