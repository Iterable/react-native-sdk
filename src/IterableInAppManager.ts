import { NativeModules } from 'react-native';

import { Iterable } from './Iterable';
import {
  IterableHtmlInAppContent,
  IterableInAppDeleteSource,
  IterableInAppLocation,
} from './IterableInAppClasses';
import IterableInAppMessage from './IterableInAppMessage';

// TODO: Create a loader for this
const RNIterableAPI = NativeModules.RNIterableAPI;

/**
 * A class that manages in-app messages. Can be used to get access to a list of
 * a user's in-app messages, show a message, remove a message, or mark a message
 * as read (locally).
 */
export class IterableInAppManager {
  /**
   * Get the current user's list of in-app messages stored in the local queue.
   *
   * This method does not cause the application to immediately check for new
   * in-app messages on the server, since the SDK keeps the message list in
   * sync.
   *
   * @returns {Promise<Array<IterableInAppMessage>>} A promise that resolves to an array of IterableInAppMessage objects.
   *
   * @example
   * ```typescript
   * IterableInAppManager.getMessages().then((messages) => {
   *    console.log(messages);
   * });
   * ```
   */
  getMessages(): Promise<Array<IterableInAppMessage>> {
    Iterable.logger.log('InAppManager.getMessages');

    return RNIterableAPI.getInAppMessages();
  }

  /**
   * Get the current user's list of in-app messages designated for the mobile inbox stored in the local queue.
   *
   * This method does not cause the application to immediately check for new
   * in-app messages on the server, since the SDK keeps the message list in
   * sync.
   *
   * @returns {Promise<Array<IterableInAppMessage>>} A promise that resolves to an array of IterableInAppMessage objects.
   *
   * @example
   * ```typescript
   * IterableInAppManager.getInboxMessages().then((messages) => {
   *   console.log(messages);
   * });
   * ```
   */
  getInboxMessages(): Promise<Array<IterableInAppMessage>> {
    Iterable.logger.log('InAppManager.getInboxMessages');

    return RNIterableAPI.getInboxMessages();
  }

  /**
   * Render an in-app message and consumes it from the user's message queue if necessary.
   *
   * @param {IterableInAppMessage} message The message to show (an IterableInAppMessage object)
   * @param {boolean} consume Whether or not the message should be consumed from the user's message queue after being shown. This should be defaulted to true.
   *
   * @returns {Promise<string | undefined>} A promise that resolves to a string,
   * which is the URL of the button or link the user tapped in the in-app
   * message to close it.
   *
   * @example
   * ```typescript
   * const message = new IterableInAppMessage(...);
   * IterableInAppManager.showMessage(message, true).then((url) => {
   *  console.log(url);
   * });
   * ```
   */
  showMessage(
    message: IterableInAppMessage,
    consume: boolean
  ): Promise<string | undefined> {
    Iterable.logger.log('InAppManager.show');

    return RNIterableAPI.showMessage(message.messageId, consume);
  }

  /**
   * Remove the specifed message from the current user's message queue.
   *
   * Also, this method calls the `inAppConsume` method internally.
   *
   * @param {IterableInAppMessage} message the in-app message (an IterableInAppMessage object)
   * @param {IterableInAppLocation} location the location of the in-app message (an IterableInAppLocation enum)
   * @param {IterableInAppDeleteSource} source how the in-app message was deleted (an IterableInAppDeleteSource enum)
   *
   * @example
   * ```typescript
   * const message = new IterableInAppMessage(...);
   * IterableInAppManager.removeMessage(message, IterableInAppLocation.inApp, IterableInAppDeleteSource.inboxSwipe);
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
   * @param {IterableInAppMessage} message the in-app message (an IterableInAppMessage object)
   * @param {boolean} read the boolean value indicating whether the in-app message was read
   *
   * @example
   * ```typescript
   * const message = new IterableInAppMessage(...);
   * IterableInAppManager.setReadForMessage(message, true);
   * ```
   */
  setReadForMessage(message: IterableInAppMessage, read: boolean) {
    Iterable.logger.log('InAppManager.setRead');

    RNIterableAPI.setReadForMessage(message.messageId, read);
  }

  /**
   * Returns HTML in-app content for a specified in-app message.
   *
   * @param {IterableInAppMessage} message the in-app message (an IterableInAppMessage object)
   *
   * @returns {Promise<IterableHtmlInAppContent>} A promise that resolves to HTML content returned as an IterableHtmlInAppContent object.
   *
   * @example
   * ```typescript
   * const message = new IterableInAppMessage(...);
   * IterableInAppManager.getHtmlContentForMessage(message).then((content) => {
   *  console.log(content);
   * });
   * ```
   */
  getHtmlContentForMessage(
    message: IterableInAppMessage
  ): Promise<IterableHtmlInAppContent> {
    Iterable.logger.log('InAppManager.getHtmlContentForMessage');

    return RNIterableAPI.getHtmlInAppContentForMessage(message.messageId);
  }

  /**
   * Turn on or off automatic displaying of incoming in-app messages.
   *
   * If set to false, the SDK will immediately retrieve and process in-app messages from the message queue.
   *
   * The default value of `isAutoDisplayPaused` is false (in the native code).
   *
   * @param {boolean} paused whether the automatic displaying should be paused
   *
   * @example
   * ```typescript
   * IterableInAppManager.setAutoDisplayPaused(true);
   * ```
   */
  setAutoDisplayPaused(paused: boolean) {
    Iterable.logger.log('InAppManager.setAutoDisplayPaused');

    RNIterableAPI.setAutoDisplayPaused(paused);
  }
}

export default IterableInAppManager;
