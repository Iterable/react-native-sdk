// expo throws an error if this is not imported directly due to circular
// dependencies
// See https://github.com/expo/expo/issues/35100
import type { IterableEdgeInsetDetails } from '../../core/types/IterableEdgeInsetDetails';

/**
 * The raw in-App content details returned from the server.
 */
export interface IterableHtmlInAppContentRaw {
  /** The HTML content of the in-App message. */
  edgeInsets: IterableEdgeInsetDetails;
  /** The HTML content of the in-App message. */
  html: string;
}
