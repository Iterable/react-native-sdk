import { IterableApi } from '../../core/classes/IterableApi';
import type { IterableLogger } from '../../core/classes/IterableLogger';
import { defaultLogger } from '../../core/constants/defaults';
import type { IterableEmbeddedMessage } from './IterableEmbeddedMessage';
import { IterableEmbeddedSessionManager } from './IterableEmbeddedSessionManager';
import type { IterableEmbeddedUpdateHandler } from '../../inApp/types/IterableEmbeddedUpdateHandler';

export class IterableEmbeddedManager {
  static logger: IterableLogger = defaultLogger;

  sessionManager: IterableEmbeddedSessionManager =
    new IterableEmbeddedSessionManager(defaultLogger);

  constructor(logger: IterableLogger) {
    IterableEmbeddedManager.logger = logger;
    this.sessionManager = new IterableEmbeddedSessionManager(logger);
  }

  syncMessages() {
    IterableApi.syncEmbeddedMessages();
  }

  getMessages(placementIds?: number[] | null) {
    return IterableApi.getEmbeddedMessages(placementIds ?? null);
  }

  getPlacementIds() {
    return IterableApi.getEmbeddedPlacementIds();
  }

  addUpdateListener(listener: IterableEmbeddedUpdateHandler) {
    return IterableApi.addEmbeddedUpdateListener(listener);
    // this.listeners.push(listener);
    // // Add native listener only once
    // if (!this.isNativeListenerAdded) {
    //   this.isNativeListenerAdded = true;
    //   // Pass null to use the default handler (this in Java implementation)
    //   // IterableApi.addEmbeddedUpdateListener(null);
    //   // Listen for native events
    //   RNEventEmitter.addListener(
    //     IterableEventName.receivedIterableEmbeddedMessagesChanged,
    //     () => {
    //       // When native side notifies of changes, get fresh messages and notify all listeners
    //       this.getMessages(null)
    //         .then((messages: IterableEmbeddedMessage[]) => {
    //           this.listeners.forEach((listenerCallback) =>
    //             listenerCallback(messages)
    //           );
    //         })
    //         .catch((error: unknown) => {
    //           IterableEmbeddedManager.logger.log(
    //             'Error getting embedded messages: ' + String(error)
    //           );
    //         });
    //     }
    //   );
    // }
  }

  removeUpdateListener(listener: IterableEmbeddedUpdateHandler) {
    return IterableApi.removeEmbeddedUpdateListener(listener);
    // const index = this.listeners.indexOf(listener);
    // if (index > -1) {
    //   this.listeners.splice(index, 1);
    // }
    // // Remove native listener if no more listeners
    // if (this.listeners.length === 0 && this.isNativeListenerAdded) {
    //   this.isNativeListenerAdded = false;
    //   // Pass null to remove the current handler
    //   IterableApi.removeEmbeddedUpdateListener(null);
    //   RNEventEmitter.removeAllListeners(
    //     IterableEventName.receivedIterableEmbeddedMessagesChanged
    //   );
    // }
  }

  startSession() {
    IterableApi.startEmbeddedSession();
  }

  endSession() {
    IterableApi.endEmbeddedSession();
  }

  startImpression(messageId: string, placementId: number) {
    IterableApi.startEmbeddedImpression(messageId, placementId);
  }

  pauseImpression(messageId: string) {
    IterableApi.pauseEmbeddedImpression(messageId);
  }

  handleClick(
    message: IterableEmbeddedMessage,
    buttonId: string | null,
    clickedUrl: string | null
  ) {
    IterableApi.handleEmbeddedClick(message, buttonId, clickedUrl);
  }

  trackClick(
    message: IterableEmbeddedMessage,
    buttonId: string | null,
    clickedUrl: string | null
  ) {
    IterableApi.trackEmbeddedClick(message, buttonId, clickedUrl);
  }
}
