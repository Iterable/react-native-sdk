import { IterableApi } from '../../core/classes/IterableApi';
import type { IterableEmbeddedMessage } from '../types/IterableEmbeddedMessage';

/**
 * Manages embedded messages from Iterable.
 *
 * Provides embedded message functionality including retrieving messages,
 * displaying messages, removing messages, and more.
 *
 * **Documentation**
 * - [Embedded Messaging Overview](https://support.iterable.com/hc/en-us/articles/23060529977364-Embedded-Messaging-Overview)
 * - [Android Embedded Messaging](https://support.iterable.com/hc/en-us/articles/23061877893652-Embedded-Messages-with-Iterable-s-Android-SDK)
 * - [iOS Embedded Messaging](https://support.iterable.com/hc/en-us/articles/23061840746900-Embedded-Messages-with-Iterable-s-iOS-SDK)
 */
export class IterableEmbeddedManager {
  /**
   * Whether the embedded manager is enabled.
   *
   * This is set through the `enableEmbeddedMessaging` flag in the
   * `IterableConfig` class.
   */
  private _isEnabled = false;

  /**
   * Gets whether the embedded manager is enabled.
   */
  get isEnabled(): boolean {
    return this._isEnabled;
  }

  /**
   * Sets whether the embedded manager is enabled.
   *
   * @param enabled - Whether the embedded manager is enabled.
   */
  setEnabled(enabled: boolean) {
    this._isEnabled = enabled;
  }

  /**
   * Syncs embedded local cache with the server.
   *
   * When your app first launches, and each time it comes to the foreground,
   * Iterable's iOS SDK automatically refresh a local, on-device cache of
   * embedded messages for the signed-in user. These are the messages the
   * signed-in user is eligible to see.
   *
   * At key points during your app's lifecycle, you may want to manually refresh
   * your app's local cache of embedded messages. For example, as users navigate
   * around, on pull-to-refresh, etc.
   *
   * However, do not poll for new embedded messages at a regular interval.
   *
   * @example
   * ```typescript
   * IterableEmbeddedManager.syncMessages();
   * ```
   */
  syncMessages() {
    return IterableApi.syncEmbeddedMessages();
  }

  /**
   * Retrieves a list of placement IDs for the embedded manager.
   *
   * [Placement Documentation](https://support.iterable.com/hc/en-us/articles/23060529977364-Embedded-Messaging-Overview#placements-and-prioritization)
   */
  getPlacementIds() {
    return IterableApi.getEmbeddedPlacementIds();
  }

  /**
   * Retrieves a list of embedded messages the user is eligible to see.
   *
   * @param placementIds - The placement IDs to retrieve messages for.
   * @returns A Promise that resolves to an array of embedded messages.
   */
  getMessages(
    placementIds: number[] | null
  ): Promise<IterableEmbeddedMessage[]> {
    return IterableApi.getEmbeddedMessages(placementIds);
  }

  /**
   * Starts a session.
   *
   * As session is a period of time when a user is on a screen or page that can
   * display embedded messages.
   *
   * When a user comes to a screen or page in your app where embedded messages
   * are displayed (in one or more placements), a session should be started.
   *
   * @example
   * ```typescript
   * Iterable.embeddedManager.startSession();
   * ```
   */
  startSession() {
    return IterableApi.startEmbeddedSession();
  }

  /**
   * Ends a session.
   *
   * When a user leaves a screen in your app where embedded messages are
   * displayed, the session should be ended.  This causes the SDK to send
   * session and impression data back to the server.
   *
   * A session is tracked when it is ended, so you should be able to find
   * tracking data after this method is called.
   *
   * @example
   * ```typescript
   * Iterable.embeddedManager.endSession();
   * ```
   */
  endSession() {
    return IterableApi.endEmbeddedSession();
  }
}
