/**
 * Interface representing the information of an impression row in the Iterable inbox.
 */
export interface IterableInboxImpressionRowInfo {
  /**
   * The message ID of the impression row.
   */
  messageId: string;
  /**
   // eslint-disable-next-line tsdoc/syntax
   * TODO: Ask @evantk91 and @Ayyanchira about this field
   */
  silentInbox: boolean;
}
