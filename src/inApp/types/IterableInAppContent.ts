import type { IterableInAppContentType } from '../enums';

/**
 * Information about the content of an in-app message in the Iterable SDK.
 */
export interface IterableInAppContent {
  /** The type of content */
  type: IterableInAppContentType;
}
