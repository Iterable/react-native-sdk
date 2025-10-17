import { IterableEdgeInsets } from '../../core/classes/IterableEdgeInsets';

import { IterableInAppContentType } from '../enums';
import type {
  IterableHtmlInAppContentRaw,
  IterableInAppContent,
} from '../types';

/**
 * Information about the display of an HTML in-app message.
 */
export class IterableHtmlInAppContent implements IterableInAppContent {
  /** The type of in-app content. */
  type: IterableInAppContentType = IterableInAppContentType.html;
  /** The space around the in-app content. */
  edgeInsets: IterableEdgeInsets;
  /** The raw HTML content of the in-app message. */
  html: string;

  /**
   * Constructs an `IterableHtmlInAppContent` instance with the provided `edgeInsets` and `html`.
   *
   * @param edgeInsets - The space around the in-app content.
   * @param html - The raw HTML content of the in-app message.
   */
  constructor(edgeInsets: IterableEdgeInsets, html: string) {
    this.edgeInsets = edgeInsets;
    this.html = html;
  }

  /**
   * Creates a new `IterableHtmlInAppContent` instance from a raw dictionary representation.
   *
   * @param dict - The raw dictionary representation of the HTML in-app content.
   * @returns A new `IterableHtmlInAppContent` instance with the values from the provided dictionary.
   */
  static fromDict(dict: IterableHtmlInAppContentRaw): IterableHtmlInAppContent {
    return new IterableHtmlInAppContent(
      IterableEdgeInsets.fromDict(dict.edgeInsets),
      dict.html
    );
  }
}
