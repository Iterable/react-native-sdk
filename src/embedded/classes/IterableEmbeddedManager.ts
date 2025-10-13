import { IterableAction } from '../../core/classes/IterableAction';
import { IterableActionContext } from '../../core/classes/IterableActionContext';
import { IterableApi } from '../../core/classes/IterableApi';
import { IterableConfig } from '../../core/classes/IterableConfig';
import { IterableLogger } from '../../core/classes/IterableLogger';
import { IterableActionSource } from '../../core/enums/IterableActionSource';
import { callUrlHandler } from '../../core/utils/callUrlHandler';
import { getActionPrefix } from '../../core/utils/getActionPrefix';
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
  isEnabled = false;

  /**
   * The config for the Iterable SDK.
   */
  config: IterableConfig = new IterableConfig();

  constructor(config: IterableConfig) {
    this.config = config;
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
   * A session is tracked when it is ended, so you should be able to find
   * tracking data after this method is called.
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
   * Starts an embedded impression.
   *
   * An impression represents the on-screen appearances of a given embedded message,
   * in context of a session.
   *
   * Each impression tracks:
   * - The total number of times a message appears during a session.
   * - The total amount of time that message was visible, across all its
   *   appearances in the session.
   *
   * Be sure to start and pause impressions when your app goes to and from the
   * background, too.
   *
   * @example
   * ```typescript
   * IterableEmbeddedManager.startImpression(messageId, placementId);
   * ```
   */
  startImpression(messageId: string, placementId: number) {
    return IterableApi.startEmbeddedImpression(messageId, placementId);
  }

  /**
   * Pauses an embedded impression.
   *
   * An impression represents the on-screen appearances of a given embedded message,
   * in context of a session.
   *
   * And impression should be paused when the message is no longer visible,
   * including when your app goes to the background.
   *
   * @example
   * ```typescript
   * IterableEmbeddedManager.pauseImpression(messageId);
   * ```
   */
  pauseImpression(messageId: string) {
    return IterableApi.pauseEmbeddedImpression(messageId);
  }

  /**
   * Tracks a click on an embedded message.
   *
   * This is called internally when `Iterable.embeddedManager.handleClick` is
   * called.  However, if you want to implement your own click handling, you can
   * use this method to track the click you implement.
   *
   * @param message - The embedded message.
   * @param buttonId - The button ID.
   * @param clickedUrl - The clicked URL.
   *
   * @example
   * ```typescript
   * IterableEmbeddedManager.trackClick(message, buttonId, clickedUrl);
   * ```
   */
  trackClick(
    message: IterableEmbeddedMessage,
    buttonId: string | null,
    clickedUrl: string | null
  ) {
    return IterableApi.trackEmbeddedClick(message, buttonId, clickedUrl);
  }

  /**
   * Handles a click on an embedded message.
   *
   * This will fire the correct handers set in the config, and will track the
   * click.  It should be use on either a button click or a click on the message itself.
   *
   * @param message - The embedded message.
   * @param buttonId - The button ID.
   * @param clickedUrl - The clicked URL.
   *
   * @example
   * ```typescript
   * IterableEmbeddedManager.handleClick(message, buttonId, clickedUrl);
   * ```
   */
  handleClick(
    message: IterableEmbeddedMessage,
    buttonId: string | null,
    action?: IterableAction | null
  ) {
    const { data, type: actionType } = action ?? {};
    const clickedUrl = data && data?.length > 0 ? data : actionType;

    IterableLogger.log(
      'IterableEmbeddedManager.handleClick',
      message,
      buttonId,
      clickedUrl
    );

    if (!clickedUrl) {
      IterableLogger.log(
        'IterableEmbeddedManager.handleClick:',
        'A url or action is required to handle an embedded click',
        clickedUrl
      );
      return;
    }

    const actionPrefix = getActionPrefix(clickedUrl);
    const source = IterableActionSource.embedded;

    this.trackClick(message, buttonId, clickedUrl);

    if (actionPrefix) {
      const actionName = clickedUrl?.replace(actionPrefix, '');
      const actionDetails = new IterableAction(actionName, '', '');
      const context = new IterableActionContext(actionDetails, source);
      if (this.config.customActionHandler) {
        this.config.customActionHandler(actionDetails, context);
      }
    } else {
      const actionDetails = new IterableAction('openUrl', clickedUrl, '');
      const context = new IterableActionContext(actionDetails, source);
      callUrlHandler(this.config, clickedUrl, context);
    }
  }
}
