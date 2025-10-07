export interface IterableEmbeddedImpressionDict {
  /** The message ID. */
  messageId: string;
  /** The placement ID. */
  placementId: number;
  /** The display count. */
  displayCount: number;
  /** The duration. */
  duration: number;
}

/**
 * Represents an embedded impression.
 */
export class IterableEmbeddedImpression {
  public messageId: IterableEmbeddedImpressionDict['messageId'];
  public placementId: IterableEmbeddedImpressionDict['placementId'];
  public displayCount: IterableEmbeddedImpressionDict['displayCount'];
  public duration: IterableEmbeddedImpressionDict['duration'];

  constructor(options: Partial<IterableEmbeddedImpressionDict> = {}) {
    const {
      messageId = '',
      placementId = 0,
      displayCount = 0,
      duration = 0,
    } = options;
    this.messageId = messageId;
    this.placementId = placementId;
    this.displayCount = displayCount;
    this.duration = duration;
  }
}
