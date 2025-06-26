/**
 * Metadata for an embedded message.
 */
export class IterableEmbeddedMessageMetadata {
  /** The ID for the embedded message */
  readonly messageId: string;
  /** The placement ID for the embedded message */
  readonly placementId: number;
  /** The campaign ID for the embedded message */
  readonly campaignId?: number;
  /** Whether the embedded message is a proof */
  readonly isProof: boolean;

  /**
   * Constructs an instance of IterableEmbeddedMessageMetadata.
   *
   * @param dict - The dictionary object containing the metadata properties.
   */
  constructor(dict: EmbeddedMessageMetadataDict) {
    if (!dict.messageId || !dict.placementId) {
      throw new Error('messageId and placementId are required');
    }
    this.messageId = dict.messageId;
    this.placementId = dict.placementId;
    this.campaignId = dict.campaignId;
    this.isProof = dict.isProof ?? false;
  }
}

/**
 * An interface defining the dictionary object containing the metadata properties for an embedded message.
 */
export interface EmbeddedMessageMetadataDict {
  messageId: string;
  placementId: number;
  campaignId?: number;
  isProof?: boolean;
}
