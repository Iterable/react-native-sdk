import { Iterable, RNIterableAPI } from '../../core';
import type {
  IterableInAppDeleteSource,
  IterableInAppLocation,
} from '../enums';
import { IterableHtmlInAppContent } from './IterableHtmlInAppContent';
import { IterableInAppMessage } from './IterableInAppMessage';

/**
 * Manages in-app messages for the current user.
 *
 * This class provides methods to interact with in-app messages, including retrieving messages,
 * displaying messages, removing messages, setting read status, and more.
 *
 * The `inAppManager` property of an `Iterable` instance is set to an instance of this class.
 */
export class IterableInAppManager {
  /**
   * Retrieve the current user's list of in-app messages stored in the local queue.
   *
   * This method does not cause the application to immediately check for new in-app messages on the server, since the SDK keeps the message list in sync.
   *
   * @example
   * ```typescript
   * Iterable.inAppManager.getMessages().then(messages => {
   *    messages.forEach(message => {
   *      console.log(JSON.stringify(message, null, 2))
   *    });
   * });
   * ```
   *
   * @returns A Promise that resolves to an array of in-app messages.
   */
  getMessages(): Promise<IterableInAppMessage[]> {
    Iterable.logger.log('InAppManager.getMessages');

    return RNIterableAPI.getInAppMessages();
  }

  /**
   * Retrieves the current user's list of in-app messages designated for the
   * mobile inbox and stored in the local queue.
   *
   * This method does not cause the application to immediately check for new in-app messages on the server, since the SDK keeps the message list in sync.
   *
   * @example
   * ```typescript
   * Iterable.inAppManager.getInboxMessages().then(messages => {
   *    messages.forEach(message => {
   *      console.log(JSON.stringify(message, null, 2))
   *    });
   * });
   * ```
   *
   * @returns A Promise that resolves to an array of messages marked as `saveToInbox`.
   */
  getInboxMessages(): Promise<IterableInAppMessage[]> {
    Iterable.logger.log('InAppManager.getInboxMessages');

    return RNIterableAPI.getInboxMessages();
  }

  /**
   * Renders an in-app message and consumes it from the user's message queue if necessary.
   *
   * If you skip showing an in-app message when it arrives, you can show it at
   * another time by calling this method.
   *
   * @example
   * ```typescript
   * Iterable.inAppManager.showMessage(message, false).then(url => {
   *   console.log("url: " + url)
   * });
   * ```
   *
   * @param message - The message to show (an {@link_IterableInAppMessage} object)
   * @param consume - Whether or not the message should be consumed from the user's message queue after being shown. This should be defaulted to true.
   *
   * @returns A Promise that resolves to the URL of the button or link the user tapped to close the in-app message.
   */
  showMessage(
    message: IterableInAppMessage,
    consume: boolean
  ): Promise<string | undefined> {
    Iterable.logger.log('InAppManager.show');

    return RNIterableAPI.showMessage(message.messageId, consume);
  }

  /**
   * Remove the specified message from the current user's message queue.
   *
   * This method calls the `inAppConsume` method internally.
   *
   * @param message - The in-app message  to remove (an {@link IterableInAppMessage} object)
   * @param location - The message's location—whether or not it's in a mobile inbox. (an {@link IterableInAppLocation} enum)
   * @param source - How the in-app message was deleted (an {@link IterableInAppDeleteSource} enum)
   *
   * @example
   * ```typescript
   * Iterable.inAppManager.removeMessage(
   *    message,
   *    IterableInAppLocation.inApp,
   *    IterableInAppDeleteSource.unknown,
   * );
   * ```
   */
  removeMessage(
    message: IterableInAppMessage,
    location: IterableInAppLocation,
    source: IterableInAppDeleteSource
  ): void {
    Iterable.logger.log('InAppManager.remove');

    return RNIterableAPI.removeMessage(message.messageId, location, source);
  }

  /**
   * Set the read status of specified in-app message.
   *
   * @param message - The message for which to set the status.
   * @param read - Whether the in-app message was read.
   *
   * @example
   * ```typescript
   * Iterable.inAppManager.setReadForMessage(message, true);
   * ```
   */
  setReadForMessage(message: IterableInAppMessage, read: boolean) {
    Iterable.logger.log('InAppManager.setRead');

    RNIterableAPI.setReadForMessage(message.messageId, read);
  }

  /**
   * Retrieve HTML in-app content for a specified in-app message.
   *
   * @param message - The message from which to get HTML content.
   *
   * @returns A Promise that resolves to an {@link IterableHtmlInAppContent} object.
   *
   * @example
   * ```typescript
   * Iterable.inAppManager.getHtmlContentForMessage(message);
   * ```
   */
  getHtmlContentForMessage(
    message: IterableInAppMessage
  ): Promise<IterableHtmlInAppContent> {
    Iterable.logger.log('InAppManager.getHtmlContentForMessage');

    return RNIterableAPI.getHtmlInAppContentForMessage(message.messageId);
  }

  /**
   * Pause or unpause the automatic display of incoming in-app messages
   *
   * If set to `false`, the SDK will immediately retrieve and process in-app messages from the message queue.
   *
   * The default value of `isAutoDisplayPaused` is `false` (in the native code).
   *
   * @param paused - Whether the automatic displaying should be paused
   *
   * @example
   * ```typescript
   * Iterable.inAppManager.setAutoDisplayPaused(paused);
   * ```
   */
  setAutoDisplayPaused(paused: boolean) {
    Iterable.logger.log('InAppManager.setAutoDisplayPaused');

    RNIterableAPI.setAutoDisplayPaused(paused);
  }
}
