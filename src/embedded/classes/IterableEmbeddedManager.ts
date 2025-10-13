import { IterableApi } from '../../core/classes/IterableApi';
import { IterableLogger } from '../../core/classes/IterableLogger';

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
   */
  isEnabled = false;

  /**
   * Retrieves a list of placement IDs for the embedded manager.
   *
   * [Placement Documentation](https://support.iterable.com/hc/en-us/articles/23060529977364-Embedded-Messaging-Overview#placements-and-prioritization)
   */
  getPlacementIds() {
    return IterableApi.getEmbeddedPlacementIds();
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
   * IterableEmbeddedManager.startSession();
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
   * @example
   * ```typescript
   * IterableEmbeddedManager.endSession();
   * ```
   */
  endSession() {
    return IterableApi.endEmbeddedSession();
  }

  /**
   * Tracks an embedded session.
   *
   * @example
   * ```typescript
   * IterableEmbeddedManager.trackSession();
   * ```
   */
  trackSession() {
    IterableLogger.log('IterableEmbeddedManager.trackSession');
  }
}
