import { IterableLogger } from '../../core/classes/IterableLogger';

/**
 * Manages the embedded messages from Iterable.
 */
export class IterableEmbeddedManager {
  /**
   * Refreshes the local cache of your embedded manager system so that it aligns
   * with the server.
   *
   * At key points during your app's lifecycle, you may want to manually refresh
   * your app's local cache of embedded messages. For example, as users navigate
   * around, on pull-to-refresh, etc.
   *
   * @returns A promise that returns messages that the user is *eligible* to see.
   *
   * @example
   * ```typescript
   * IterableEmbeddedManager.syncMessages().then(messages => {
   *   console.log('Messages:', messages);
   * });
   * ```
   */
  syncMessages() {
    IterableLogger.log('IterableEmbeddedManager.syncMessages');
  }

  getMessages(placementIds?: number[] | null) {
    IterableLogger.log(
      'IterableEmbeddedManager.getMessages with placementIds',
      placementIds
    );
  }

  getPlacementIds() {
    IterableLogger.log('IterableEmbeddedManager.getEmbeddedPlacementIds');
  }

  startSession() {
    IterableLogger.log('IterableEmbeddedManager.startSession');
  }

  endSession() {
    IterableLogger.log('IterableEmbeddedManager.endSession');
  }

  startImpression(messageId: string, placementId: number) {
    IterableLogger.log(
      'IterableEmbeddedManager.startImpression',
      messageId,
      placementId
    );
  }

  pauseImpression(messageId: string) {
    IterableLogger.log('IterableEmbeddedManager.pauseImpression', messageId);
  }

  handleClick() {
    IterableLogger.log('IterableEmbeddedManager.handleClick');
  }

  trackClick() {
    IterableLogger.log('IterableEmbeddedManager.trackClick');
  }
}
