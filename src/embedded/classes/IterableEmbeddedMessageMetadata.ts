export class IterableEmbeddedMessageMetadata {
  readonly messageId: string;
  readonly placementId: number;
  readonly campaignId?: number;
  readonly isProof: boolean;

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

export interface EmbeddedMessageMetadataDict {
  messageId: string;
  placementId: number;
  campaignId?: number;
  isProof?: boolean;
}
