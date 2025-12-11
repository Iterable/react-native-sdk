import { IterableApi } from '../../core/classes/IterableApi';

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
   * Retrieves a list of placement IDs for the embedded manager.
   *
   * [Placement Documentation](https://support.iterable.com/hc/en-us/articles/23060529977364-Embedded-Messaging-Overview#placements-and-prioritization)
   */
  getPlacementIds() {
    return IterableApi.getEmbeddedPlacementIds();
  }
}
