import { IterableConfig } from '../../core/classes/IterableConfig';
import { IterableLogger } from '../../core/classes/IterableLogger';
import { trackEmbeddedSession } from '../../core/utils/trackingUtils';
import { IterableEmbeddedImpression } from './IterableEmbeddedImpression';
import { IterableEmbeddedImpressionData } from './IterableEmbeddedImpressionData';
import { IterableEmbeddedSession } from './IterableEmbeddedSession';

/**
 * Manages the embedded session for the current user.
 */
export class IterableEmbeddedSessionManager {
  private logger: IterableLogger = new IterableLogger(new IterableConfig());
  private impressions: Record<string, IterableEmbeddedImpressionData> = {};
  public session?: IterableEmbeddedSession;
  constructor(logger: IterableLogger) {
    this.logger = logger;
    this.impressions = {};
  }

  public isTracking(): boolean {
    return !!this.session?.start;
  }

  public startSession() {
    if (this.isTracking()) {
      this.logger.log('Embedded session started twice');
      return;
    }

    // TODO: figure out how to get a unique ID for the session
    this.session = new IterableEmbeddedSession({
      start: new Date(),
    });
  }

  public endSession() {
    if (!this.isTracking()) {
      this.logger.log('Embedded session ended without start');
      return;
    }

    if (this.session?.impressions?.length) {
      this.endAllImpressions();

      const sessionToTrack = new IterableEmbeddedSession({
        start: this.session.start,
        end: new Date(),
        impressions: this.getImpressionList(),
      });

      trackEmbeddedSession(sessionToTrack);

      //reset session for next session start
      this.session = new IterableEmbeddedSession({
        start: null,
        end: null,
        impressions: [],
      });

      this.impressions = {};
    }
  }

  public startImpression(messageId: string, placementId: number) {
    let impressionData = this.impressions[messageId];
    if (!impressionData) {
      impressionData = new IterableEmbeddedImpressionData(
        messageId,
        placementId
      );
      this.impressions[messageId] = impressionData;
    }
    impressionData.start = new Date();
  }

  public pauseImpression(messageId: string) {
    const impressionData = this.impressions[messageId];
    if (!impressionData) {
      this.logger.log('onMessageImpressionEnded: impressionData not found');
      return;
    }

    if (impressionData.start == null) {
      this.logger.log('onMessageImpressionEnded: impressionStarted is null');
      return;
    }

    this.updateDisplayCountAndDuration(impressionData);
  }

  private updateDisplayCountAndDuration(
    impressionData: IterableEmbeddedImpressionData
  ): IterableEmbeddedImpressionData {
    if (impressionData.start) {
      impressionData.displayCount = (impressionData.displayCount || 0) + 1;
      impressionData.duration =
        (impressionData.duration || 0) +
        (new Date().getTime() - impressionData.start.getTime()) / 1000;
      impressionData.start = null;
    }
    return impressionData;
  }

  private endAllImpressions() {
    Object.values(this.impressions).forEach((impression) => {
      this.updateDisplayCountAndDuration(impression);
    });
  }

  private getImpressionList(): IterableEmbeddedImpressionData[] {
    return Object.values(this.impressions).map((impression) => {
      return new IterableEmbeddedImpression(impression);
    });
  }
}
