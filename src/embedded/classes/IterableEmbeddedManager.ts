import { IterableApi } from '../../core/classes/IterableApi';
import type { IterableLogger } from '../../core/classes/IterableLogger';
import { defaultLogger } from '../../core/constants/defaults';
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
    IterableApi.syncEmbeddedMessages();
  }

  getMessages(placementIds: number[] | null) {
    return IterableApi.getEmbeddedMessages(placementIds);
  }

  getPlacementIds() {
    return IterableApi.getEmbeddedPlacementIds();
  }
}
