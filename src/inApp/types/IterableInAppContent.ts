// expo throws an error if this is not imported directly due to circular
// dependencies
// See https://github.com/expo/expo/issues/35100
import type { IterableInAppContentType } from '../enums/IterableInAppContentType';

/**
 * Information about the content of an in-app message in the Iterable SDK.
 */
export interface IterableInAppContent {
  /** The type of content */
  type: IterableInAppContentType;
}
