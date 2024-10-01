import { type ViewToken } from 'react-native';

import IterableUtil from './IterableUtil';

import {
  IterableInAppTrigger,
  IterableInAppTriggerType,
  IterableInboxMetadata,
} from './IterableInAppClasses';

/**
 * Iterable in-app message
 */
export class IterableInAppMessage {
  /**
   * the ID for the in-app message
   */
  readonly messageId: string;

  /**
   * the campaign ID for this message
   */
  readonly campaignId: number;

  /**
   * when to trigger this in-app
   */
  readonly trigger: IterableInAppTrigger;

  /**
   * when was this message created
   */
  readonly createdAt?: Date;

  /**
   * when to expire this in-app (undefined means do not expire)
   */
  readonly expiresAt?: Date;

  /**
   * Whether to save this message to inbox
   */
  readonly saveToInbox: boolean;

  /**
   * Metadata such as title, subtitle etc. needed to display this in-app message in inbox.
   */
  readonly inboxMetadata?: IterableInboxMetadata;

  /**
   * Custom Payload for this message.
   */
  readonly customPayload?: any;

  /**
   * Whether this inbox message has been read
   */
  readonly read: boolean;

  /**
   * the priority value this in-app message has
   */
  readonly priorityLevel: number;

  constructor(
    messageId: string,
    campaignId: number,
    trigger: IterableInAppTrigger,
    createdAt: Date | undefined,
    expiresAt: Date | undefined,
    saveToInbox: boolean,
    inboxMetadata: IterableInboxMetadata | undefined,
    customPayload: any | undefined,
    read: boolean,
    priorityLevel: number
  ) {
    this.campaignId = campaignId;
    this.messageId = messageId;
    this.trigger = trigger;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
    this.saveToInbox = saveToInbox;
    this.inboxMetadata = inboxMetadata;
    this.customPayload = customPayload;
    this.read = read;
    this.priorityLevel = priorityLevel;
  }

  static fromViewToken(viewToken: ViewToken) {
    var inAppMessage = viewToken.item.inAppMessage as IterableInAppMessage;

    return new IterableInAppMessage(
      inAppMessage.messageId,
      inAppMessage.campaignId,
      inAppMessage.trigger,
      inAppMessage.createdAt,
      inAppMessage.expiresAt,
      inAppMessage.saveToInbox,
      inAppMessage.inboxMetadata,
      inAppMessage.customPayload,
      inAppMessage.read,
      inAppMessage.priorityLevel
    );
  }

  isSilentInbox(): boolean {
    return (
      // TODO: Figure out if this is purposeful
      // eslint-disable-next-line eqeqeq
      this.saveToInbox && this.trigger.type == IterableInAppTriggerType.never
    );
  }

  static fromDict(dict: any): IterableInAppMessage {
    const messageId = dict.messageId as string;
    const campaignId = dict.campaignId as number;
    const trigger = IterableInAppTrigger.fromDict(dict.trigger);
    let createdAt = dict.createdAt;
    if (createdAt) {
      var dateObject = new Date(0);
      createdAt = dateObject.setUTCMilliseconds(createdAt);
    }
    let expiresAt = dict.expiresAt;
    if (expiresAt) {
      var dateObject = new Date(0);
      expiresAt = dateObject.setUTCMilliseconds(expiresAt);
    }
    let saveToInbox = IterableUtil.readBoolean(dict, 'saveToInbox');
    let inboxMetadataDict = dict.inboxMetadata;
    let inboxMetadata: IterableInboxMetadata | undefined;
    if (inboxMetadataDict) {
      inboxMetadata = IterableInboxMetadata.fromDict(inboxMetadataDict);
    } else {
      inboxMetadata = undefined;
    }
    let customPayload = dict.customPayload;
    let read = IterableUtil.readBoolean(dict, 'read');

    let priorityLevel = dict.priorityLevel as number;

    return new IterableInAppMessage(
      messageId,
      campaignId,
      trigger,
      createdAt,
      expiresAt,
      saveToInbox,
      inboxMetadata,
      customPayload,
      read,
      priorityLevel
    );
  }
}

export default IterableInAppMessage;
