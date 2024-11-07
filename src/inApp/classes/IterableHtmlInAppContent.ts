import { IterableEdgeInsets } from 'core';

import { IterableInAppContentType } from 'inApp/enums';
import type { IterableInAppContent } from 'inApp/types';

// TODO: Add description
export class IterableHtmlInAppContent implements IterableInAppContent {
  type: IterableInAppContentType = IterableInAppContentType.html;
  edgeInsets: IterableEdgeInsets;
  html: string;

  constructor(edgeInsets: IterableEdgeInsets, html: string) {
    this.edgeInsets = edgeInsets;
    this.html = html;
  }

  static fromDict(dict: any): IterableHtmlInAppContent {
    return new IterableHtmlInAppContent(
      IterableEdgeInsets.fromDict(dict.edgeInsets),
      dict.html as string
    );
  }
}
