/**
 * TODO: Add description
 */
export class IterableAttributionInfo {
  campaignId: number;
  templateId: number;
  messageId: string;

  constructor(campaignId: number, templateId: number, messageId: string) {
    this.campaignId = campaignId;
    this.templateId = templateId;
    this.messageId = messageId;
  }
}
