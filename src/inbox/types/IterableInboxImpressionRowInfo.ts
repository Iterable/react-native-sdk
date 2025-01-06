/**
 * Interface representing the information of an impression row in the Iterable inbox.
 */
export interface IterableInboxImpressionRowInfo {
  /** The message ID of the impression row. */
  messageId: string;
  /** Do you want the message to show in the inbox list but not as a notification? */
  silentInbox: boolean;
}
