export interface IterableEmbeddedMessageMetadata {
  messageId: string;
  placementId: number;
  campaignId?: number | null;
  isProof?: boolean;
}
