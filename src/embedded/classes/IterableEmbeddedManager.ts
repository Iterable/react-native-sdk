import { IterableApi } from '../../core/classes/IterableApi';
import type { IterableLogger } from '../../core/classes/IterableLogger';
import { defaultLogger } from '../../core/constants/defaults';
import type { IterableEmbeddedMessage } from './IterableEmbeddedMessage';
import { IterableEmbeddedSessionManager } from './IterableEmbeddedSessionManager';

export class IterableEmbeddedManager {
  static logger: IterableLogger = defaultLogger;

  sessionManager: IterableEmbeddedSessionManager =
    new IterableEmbeddedSessionManager(defaultLogger);

  constructor(logger: IterableLogger) {
    IterableEmbeddedManager.logger = logger;
    this.sessionManager = new IterableEmbeddedSessionManager(logger);
  }

  syncMessages() {
    return IterableApi.syncEmbeddedMessages();
  }

  getMessages(placementIds?: number[] | null) {
    return IterableApi.getEmbeddedMessages(placementIds ?? null);
  }

  getPlacementIds() {
    return IterableApi.getEmbeddedPlacementIds();
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
