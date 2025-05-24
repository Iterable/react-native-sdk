export class IterableEmbeddedMessageMetadata {
  static readonly TAG = 'ItblEmbeddedMessageMetadata';

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
  static fromDict(dict: {
    messageId: string;
    placementId: number;
    campaignId: number | undefined;
    isProof: boolean;
  }): IterableEmbeddedMessageMetadata {
    return new IterableEmbeddedMessageMetadata(
      dict.messageId,
      dict.placementId,
      dict.campaignId,
      dict.isProof
    );
  }
}
