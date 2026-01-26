/**
 * Metadata for an embedded message.
 *
 * Consists of identifying information about the campaign.
 */
export interface IterableEmbeddedMessageMetadata {
  /** The ID of the message. */
  messageId: string;
  /** The ID of the placement associated with the message. */
  placementId: number;
  /** The ID of the campaign associated with the message. */
  campaignId?: number | null;
  /**
   * Whether the message is a proof/test message.
   *
   * EG: Sent directly from a template or campaign edit page.
   */
  isProof?: boolean;
}
