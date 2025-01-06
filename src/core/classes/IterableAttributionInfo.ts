/**
 * Represents attribution information for an Iterable campaign.
 */
export class IterableAttributionInfo {
  /**
   * The ID of the campaign.
   */
  campaignId: number;

  /**
   * The ID of the template used in the campaign.
   */
  templateId: number;

  /**
   * The ID of the message.
   */
  messageId: string;

  /**
   * Creates an instance of IterableAttributionInfo.
   * @param campaignId - The ID of the campaign.
   * @param templateId - The ID of the template used in the campaign.
   * @param messageId - The ID of the message.
   */
  constructor(campaignId: number, templateId: number, messageId: string) {
    this.campaignId = campaignId;
    this.templateId = templateId;
    this.messageId = messageId;
  }
}
