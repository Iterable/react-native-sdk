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
   * @param messageId - The ID for the embedded message.
   * @param placementId - The placement ID for the embedded message.
   * @param campaignId - The campaign ID for the embedded message.
   * @param isProof - Whether the embedded message is a proof.
   */
  constructor(
    messageId: string,
    placementId: number,
    campaignId: number | undefined,
    isProof: boolean = false
  ) {
    this.messageId = messageId;
    this.placementId = placementId;
    this.campaignId = campaignId;
    this.isProof = isProof;
  }

  /**
   * Creates an instance of `IterableEmbeddedMessageMetadata` from a dictionary object.
   *
   * @param dict - The dictionary objectcontaining the metadata properties.
   * This corresponds to the properties in {@link IterableEmbeddedMessageMetadata}
   *
   * @returns A new instance of `IterableEmbeddedMessageMetadata` with the provided properties.
   */
  static fromDict(
    dict: Partial<EmbeddedMessageMetadataDict>
  ): IterableEmbeddedMessageMetadata {
    if (!dict.messageId || !dict.placementId) {
      throw new Error('messageId and placementId are required');
    }
    return new IterableEmbeddedMessageMetadata(
      dict.messageId,
      dict.placementId,
      dict.campaignId,
      dict.isProof
    );
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
