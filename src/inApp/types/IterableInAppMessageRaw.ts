import type { IterableInAppTrigger } from '../classes/IterableInAppTrigger';

/** The raw message returned from the `IterableEventName.handleInAppCalled` event */
export type IterableInAppMessageRaw = {
  /** The unique identifier for the message. */
  messageId: string;
  /** The campaign identifier associated with the message. */
  campaignId: number;
  /** The trigger that initiates the in-app message. */
  trigger: IterableInAppTrigger;
  /** The timestamp when the message was created, in milliseconds. */
  createdAt?: number;
  /** The timestamp when the message expires, in milliseconds. */
  expiresAt?: number;
  /** A boolean indicating if the message should be saved to the inbox. */
  saveToInbox?: boolean;
  /**
   * Metadata for the inbox message, including title, subtitle, and icon.
   * This object contains display information for the message when shown in the inbox.
   */
  inboxMetadata?: {
    /** The title of the inbox message. */
    title: string | undefined;
    /** The subtitle of the inbox message. */
    subtitle: string | undefined;
    /** The icon of the inbox message. */
    icon: string | undefined;
  };
  /** Custom payload associated with the message. */
  customPayload?: unknown;
  /** A boolean indicating if the message has been read. */
  read?: boolean;
  /** The priority level of the message. */
  priorityLevel?: number;
};
