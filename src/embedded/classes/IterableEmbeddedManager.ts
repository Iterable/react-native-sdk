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
   * Refreshes the local cache of your embedded manager system so that it aligns
   * with the server.
   *
   * You may want to manually refresh your app's local cache of embedded
   * messages during key points during your app's lifecycle. For example, as
   * users navigate around, on pull-to-refresh, etc.
   *
   * @example
   * ```typescript
   * IterableEmbeddedManager.syncMessages().then(messages => {
   *   console.log('Messages:', messages);
   * });
   * ```
   */
  sync() {
    IterableLogger.log('IterableEmbeddedManager.syncMessages');
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
   * Retrieves the messages that the user is *eligible* to see.
   *
   * @param placementIds - The placement IDs to retrieve messages for.
   *
   * @example
   * ```typescript
   * IterableEmbeddedManager.getMessages().then(messages => {
   *   console.log('Messages:', messages);
   * });
   * ```
   */
  getMessages(placementIds?: number[] | null) {
    IterableLogger.log(
      'IterableEmbeddedManager.getMessages with placementIds',
      placementIds
    );
  }
}
