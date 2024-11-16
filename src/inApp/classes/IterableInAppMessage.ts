import { type ViewToken } from 'react-native';

import { IterableUtil } from '../../core';
import { IterableInAppTriggerType } from '../enums';
import { IterableInAppTrigger } from './IterableInAppTrigger';
import { IterableInboxMetadata } from './IterableInboxMetadata';

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
  readonly customPayload?: unknown;

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
    customPayload: unknown | undefined,
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
    const inAppMessage = viewToken.item.inAppMessage as IterableInAppMessage;

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

  static fromDict(dict: {
    messageId: string;
    campaignId: number;
    trigger: IterableInAppTrigger;
    createdAt?: number;
    expiresAt?: number;
    saveToInbox?: boolean;
    inboxMetadata?: {
      title: string | undefined;
      subtitle: string | undefined;
      icon: string | undefined;
    };
    customPayload?: unknown;
    read?: boolean;
    priorityLevel?: number;
  }): IterableInAppMessage {
    const messageId = dict.messageId;
    const campaignId = dict.campaignId;
    const trigger = IterableInAppTrigger.fromDict(dict.trigger);

    let createdAt = dict.createdAt;
    if (createdAt) {
      const dateObject = new Date(0);
      createdAt = dateObject.setUTCMilliseconds(createdAt);
    }
    let expiresAt = dict.expiresAt;
    if (expiresAt) {
      const dateObject = new Date(0);
      expiresAt = dateObject.setUTCMilliseconds(expiresAt);
    }
    const saveToInbox = IterableUtil.readBoolean(dict, 'saveToInbox');
    const inboxMetadataDict = dict.inboxMetadata;
    let inboxMetadata: IterableInboxMetadata | undefined;
    if (inboxMetadataDict) {
      inboxMetadata = IterableInboxMetadata.fromDict(inboxMetadataDict);
    } else {
      inboxMetadata = undefined;
    }
    const customPayload = dict.customPayload;
    const read = IterableUtil.readBoolean(dict, 'read');

    const priorityLevel = dict.priorityLevel;

    return new IterableInAppMessage(
      messageId,
      campaignId,
      trigger,
      // TODO: Speak to the team about `IterableInAppMessage` requiring a date
      // object, but being passed a number in this case
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //  @ts-ignore
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