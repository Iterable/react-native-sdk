import type { IterableEdgeInsetDetails } from '../../core';

/**
 * The raw in-App content details returned from the server.
 */
export interface IterableHtmlInAppContentRaw {
  /** The HTML content of the in-App message. */
  edgeInsets: IterableEdgeInsetDetails;
  /** The HTML content of the in-App message. */
  html: string;
}
