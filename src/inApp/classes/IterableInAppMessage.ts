import { type ViewToken } from 'react-native';

// expo throws an error if this is not imported directly due to circular
// dependencies
// See https://github.com/expo/expo/issues/35100
import { IterableUtil } from '../../core/classes/IterableUtil';
import { IterableInAppTriggerType } from '../enums';
import type { IterableInAppMessageRaw } from '../types';
import { IterableInAppTrigger } from './IterableInAppTrigger';
import { IterableInboxMetadata } from './IterableInboxMetadata';

/**
 * Iterable in-app message
 */
export class IterableInAppMessage {
  /**
   * The ID for the in-app message
   */
  readonly messageId: string;

  /**
   * The campaign ID for this message
   */
  readonly campaignId: number;

  /**
   * Information regarding the triggering of this in-app message
   */
  readonly trigger: IterableInAppTrigger;

  /**
   * When was this message created?
   */
  readonly createdAt?: Date;

  /**
   * When to expire this in-app (`undefined` means do not expire)
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
   *
   * @example
   * If the custom payload was the following:
   * ```json
   * {
   *    "customDisplay": true,
   *    "promotionTitle": "Summer Sale",
   *    "promotionText": "Everything is 50% off."
   * }
   * ```
   * You could use the following code to determine whether to hide/show the message:
   * ```typescript
   *  config.inAppHandler = (message: IterableInAppMessage) => {
   *    if (message.customPayload.customDisplay == true) {
   *      return IterableInAppShowResponse.skip
   *    } else {
   *      return Iterable.InAppShowResponse.show
   *    }
   *  };
   * ```
   * You could then handle the showing of this message through a custom function.  EG:
   * ```typescript
   * Alert.alert(
   *  message.customPayload.promotionTitle,
   *  message.customPayload.promotionText,
   * );
   * ```
   */
  readonly customPayload?: unknown;

  /**
   * Whether this inbox message has been read
   */
  readonly read: boolean;

  /**
   * The priority value of this in-app message
   */
  readonly priorityLevel: number;

  /**
   * Constructs an instance of IterableInAppMessage.
   *
   * @param messageId - The unique identifier for the message.
   * @param campaignId - The identifier for the campaign associated with the message.
   * @param trigger - The trigger that caused the message to be displayed.
   * @param createdAt - The date and time when the message was created.
   * @param expiresAt - The date and time when the message expires.
   * @param saveToInbox - A boolean indicating whether the message should be saved to the inbox.
   * @param inboxMetadata - Metadata associated with the inbox message.
   * @param customPayload - A custom payload associated with the message.
   * @param read - A boolean indicating whether the message has been read.
   * @param priorityLevel - The priority level of the message.
   */
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

  /**
   * Creates an instance of `IterableInAppMessage` from a given `ViewToken`.
   *
   * @param viewToken - The `ViewToken` containing the in-app message data.
   * @returns A new instance of `IterableInAppMessage` populated with data from the `viewToken`.
   * @throws Error if the viewToken or its item or inAppMessage is null/undefined.
   */
  static fromViewToken(viewToken: ViewToken) {
    const inAppMessage = viewToken?.item?.inAppMessage as IterableInAppMessage;

    return new IterableInAppMessage(
      inAppMessage?.messageId,
      inAppMessage?.campaignId,
      inAppMessage?.trigger,
      inAppMessage?.createdAt,
      inAppMessage?.expiresAt,
      inAppMessage?.saveToInbox,
      inAppMessage?.inboxMetadata,
      inAppMessage?.customPayload,
      inAppMessage?.read,
      inAppMessage?.priorityLevel
    );
  }

  /**
   * Do you want the in-app message to be saved to the inbox without triggering a notification?
   *
   * @returns `true` if the message should be saved to the inbox without triggering a notification; otherwise, `false`.
   */
  isSilentInbox(): boolean {
    return (
      // MOB-10424: Figure out if this is purposeful
      // eslint-disable-next-line eqeqeq
      this.saveToInbox && this.trigger.type == IterableInAppTriggerType.never
    );
  }

  /**
   * Creates an instance of `IterableInAppMessage` from a dictionary object.
   *
   * @param dict - The dictionary containing the properties of the in-app message.
   * @returns An instance of `IterableInAppMessage` populated with the provided properties.
   */
  static fromDict(dict: IterableInAppMessageRaw): IterableInAppMessage {
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
      // MOB-10426: Speak to the team about `IterableInAppMessage` requiring a date
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
