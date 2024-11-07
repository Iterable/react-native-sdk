import type { IterableEdgeInsetDetails } from '../../core';

/** The raw in-App content details returned from the server */
export interface IterableHtmlInAppContentRaw {
  edgeInsets: IterableEdgeInsetDetails;
  html: string;
}
