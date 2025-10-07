export interface IterableEmbeddedImpressionDataDict {
  /** The message ID. */
  messageId: string;
  /** The placement ID. */
  placementId: number;
  /** The display count. */
  displayCount?: number;
  /** The duration. */
  duration?: number;
  /** The start date. */
  start?: Date | null;
}

/**
 * Represents the impression data for an embedded message.
 */
export class IterableEmbeddedImpressionData {
  public messageId?: IterableEmbeddedImpressionDataDict['messageId'];
  public placementId?: IterableEmbeddedImpressionDataDict['placementId'];
  public displayCount?: IterableEmbeddedImpressionDataDict['displayCount'] = 0;
  public duration?: IterableEmbeddedImpressionDataDict['duration'] = 0.0;
  public start?: IterableEmbeddedImpressionDataDict['start'];

  constructor(
    messageId: string,
    placementId: number,
    options: Pick<
      IterableEmbeddedImpressionDataDict,
      'displayCount' | 'duration' | 'start'
    > = {}
  ) {
    this.messageId = messageId;
    this.placementId = placementId;

    const { displayCount = 0, duration = 0.0, start = null } = options;
    this.displayCount = displayCount;
    this.duration = duration;
    this.start = start;
  }
}
