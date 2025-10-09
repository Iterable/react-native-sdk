import { IterableAction } from '../../core/classes/IterableAction';
import { IterableActionContext } from '../../core/classes/IterableActionContext';
import { IterableApi } from '../../core/classes/IterableApi';
import type { IterableConfig } from '../../core/classes/IterableConfig';
import type { IterableLogger } from '../../core/classes/IterableLogger';
import { defaultConfig, defaultLogger } from '../../core/constants/defaults';
import { IterableActionSource } from '../../core/enums/IterableActionSource';
import { getActionPrefix } from '../../core/utils/getActionPrefix';
import type { IterableEmbeddedMessage } from '../types/IterableEmbeddedMessage';
import { IterableEmbeddedSessionManager } from './IterableEmbeddedSessionManager';

export class IterableEmbeddedManager {
  logger: IterableLogger = defaultLogger;
  config: IterableConfig = defaultConfig;

  sessionManager: IterableEmbeddedSessionManager =
    new IterableEmbeddedSessionManager(defaultLogger);

  constructor(logger: IterableLogger, config: IterableConfig) {
    this.logger = logger;
    this.config = config;
    this.sessionManager = new IterableEmbeddedSessionManager(logger);
  }

  syncMessages() {
    this.logger.log('IterableEmbeddedManager.syncMessages');
    return IterableApi.syncEmbeddedMessages();
  }

  getMessages(placementIds?: number[] | null) {
    this.logger.log('IterableEmbeddedManager.getMessages', placementIds);
    return IterableApi.getEmbeddedMessages(placementIds ?? null);
  }

  getPlacementIds() {
    this.logger.log('IterableEmbeddedManager.getPlacementIds');
    return IterableApi.getEmbeddedPlacementIds();
  }

  startSession() {
    this.logger.log('IterableEmbeddedManager.startSession');
    IterableApi.startEmbeddedSession();
  }

  endSession() {
    this.logger.log('IterableEmbeddedManager.endSession');
    IterableApi.endEmbeddedSession();
  }

  startImpression(messageId: string, placementId: number) {
    this.logger.log(
      'IterableEmbeddedManager.startImpression',
      messageId,
      placementId
    );
    IterableApi.startEmbeddedImpression(messageId, placementId);
  }

  pauseImpression(messageId: string) {
    this.logger.log('IterableEmbeddedManager.pauseImpression', messageId);
    IterableApi.pauseEmbeddedImpression(messageId);
  }

  handleClick(
    message: IterableEmbeddedMessage,
    buttonId: string | null,
    clickedUrl: string | null
  ) {
    this.logger.log(
      'IterableEmbeddedManager.handleClick',
      message,
      buttonId,
      clickedUrl
    );

    if (!clickedUrl) {
      this.logger.log(
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
      const action = new IterableAction(actionName, '', '');
      const context = new IterableActionContext(action, source);
      if (this.config.customActionHandler) {
        this.config.customActionHandler(action, context);
      }
    } else {
      const action = new IterableAction('openUrl', clickedUrl, '');
      const context = new IterableActionContext(action, source);
      if (this.config.urlHandler) {
        this.config.urlHandler(clickedUrl, context);
      }
    }
  }

  trackClick(
    message: IterableEmbeddedMessage,
    buttonId: string | null,
    clickedUrl: string | null
  ) {
    this.logger.log(
      'IterableEmbeddedManager.trackClick',
      message,
      buttonId,
      clickedUrl
    );
    IterableApi.trackEmbeddedClick(message, buttonId, clickedUrl);
  }
}
