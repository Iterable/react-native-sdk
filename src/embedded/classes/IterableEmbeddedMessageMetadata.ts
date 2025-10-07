export interface IterableEmbeddedMessageMetadataDict {
  messageId: string;
  placementId: number;
  campaignId?: number | null;
  isProof?: boolean;
}

export class IterableEmbeddedMessageMetadata {
  public messageId: string;
  public placementId: number;
  public campaignId?: number | null = null;
  public isProof: boolean = false;

  constructor(options: Partial<IterableEmbeddedMessageMetadataDict> = {}) {
    const {
      messageId = '',
      placementId = 0,
      campaignId = null,
      isProof = false,
    } = options;

    this.messageId = messageId;
    this.placementId = placementId;
    this.campaignId = campaignId;
    this.isProof = isProof;
  }

  toDict(): IterableEmbeddedMessageMetadataDict {
    return {
      messageId: this.messageId,
      placementId: this.placementId,
      campaignId: this.campaignId ?? null,
      isProof: this.isProof,
    };
  }

  static fromDict(
    jsonObject: IterableEmbeddedMessageMetadataDict
  ): IterableEmbeddedMessageMetadata {
    return new IterableEmbeddedMessageMetadata({
      messageId: jsonObject.messageId,
      placementId: jsonObject.placementId,
      campaignId: jsonObject.campaignId ?? null,
      isProof: jsonObject.isProof ?? false,
    });
  }
}
