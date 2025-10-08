import { NativeEventEmitter } from 'react-native';
import { IterableApi } from '../../core/classes/IterableApi';
import type { IterableLogger } from '../../core/classes/IterableLogger';
import { defaultLogger } from '../../core/constants/defaults';
import { IterableEventName } from '../../core/enums/IterableEventName';
import { RNIterableAPI } from '../../api';
import type { IterableEmbeddedMessage } from './IterableEmbeddedMessage';
import { IterableEmbeddedSessionManager } from './IterableEmbeddedSessionManager';

const RNEventEmitter = new NativeEventEmitter(RNIterableAPI);

export class IterableEmbeddedManager {
  static logger: IterableLogger = defaultLogger;

  sessionManager: IterableEmbeddedSessionManager =
    new IterableEmbeddedSessionManager(defaultLogger);

  private listeners: ((messages: IterableEmbeddedMessage[]) => void)[] = [];
  private isNativeListenerAdded = false;

  constructor(logger: IterableLogger) {
    IterableEmbeddedManager.logger = logger;
    this.sessionManager = new IterableEmbeddedSessionManager(logger);
  }

  syncMessages() {
    IterableApi.syncEmbeddedMessages();
  }

  getMessages(placementIds: number[] | null) {
    return IterableApi.getEmbeddedMessages(placementIds);
  }

  getPlacementIds() {
    return IterableApi.getEmbeddedPlacementIds();
  }

  addUpdateListener(listener: (messages: IterableEmbeddedMessage[]) => void) {
    this.listeners.push(listener);

    // Add native listener only once
    if (!this.isNativeListenerAdded) {
      this.isNativeListenerAdded = true;
      // Pass null to use the default handler (this in Java implementation)
      IterableApi.addEmbeddedUpdateListener(null);

      // Listen for native events
      RNEventEmitter.addListener(
        IterableEventName.receivedIterableEmbeddedMessagesChanged,
        () => {
          // When native side notifies of changes, get fresh messages and notify all listeners
          this.getMessages(null)
            .then((messages: IterableEmbeddedMessage[]) => {
              this.listeners.forEach((listenerCallback) =>
                listenerCallback(messages)
              );
            })
            .catch((error: unknown) => {
              IterableEmbeddedManager.logger.log(
                'Error getting embedded messages: ' + String(error)
              );
            });
        }
      );
    }
  }

  removeUpdateListener(
    listener: (messages: IterableEmbeddedMessage[]) => void
  ) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }

    // Remove native listener if no more listeners
    if (this.listeners.length === 0 && this.isNativeListenerAdded) {
      this.isNativeListenerAdded = false;
      // Pass null to remove the current handler
      IterableApi.removeEmbeddedUpdateListener(null);
      RNEventEmitter.removeAllListeners(
        IterableEventName.receivedIterableEmbeddedMessagesChanged
      );
    }
  }
}
