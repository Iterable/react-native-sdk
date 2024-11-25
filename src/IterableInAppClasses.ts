/**
 * TODO: Break this file into multiple files
 */

// TODO: Add description
export enum IterableInAppShowResponse {
  /** Show in-app */
  show = 0,
  /** Skip showing in-app */
  skip = 1,
}

// TODO: Add description
export enum IterableInAppTriggerType {
  /** Tries to display the in-app automatically immediately  */
  immediate = 0,
  /** Used for Push to in-app */
  event = 1,
  /** Do not display the in-app automatically via the SDK */
  never = 2,
}

// TODO: Add description
export class IterableInAppTrigger {
  type: IterableInAppTriggerType;

  constructor(type: IterableInAppTriggerType) {
    this.type = type;
  }

  static fromDict(dict: any): IterableInAppTrigger {
    const type = dict.type as
      | IterableInAppTriggerType
      | IterableInAppTriggerType.immediate;
    return new IterableInAppTrigger(type);
  }
}

// TODO: Add description
export enum IterableInAppContentType {
  html = 0,
  alert = 1,
  banner = 2,
}

// TODO: Add description
export enum IterableInAppLocation {
  inApp = 0,
  inbox = 1,
}

// TODO: Add description
export enum IterableInAppCloseSource {
  back = 0,
  link = 1,
  unknown = 100,
}

// TODO: Add description
export enum IterableInAppDeleteSource {
  inboxSwipe = 0,
  deleteButton = 1,
  unknown = 100,
}

// TODO: Add description
export class IterableEdgeInsets {
  top: number;
  left: number;
  bottom: number;
  right: number;

  constructor(top: number, left: number, bottom: number, right: number) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  static fromDict(dict: any): IterableEdgeInsets {
    return new IterableEdgeInsets(
      dict.top as number,
      dict.left as number,
      dict.bottom as number,
      dict.right as number
    );
  }
}

// TODO: Add description
export interface IterableInAppContent {
  type: IterableInAppContentType;
}

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

export class IterableInboxMetadata {
  title?: string;
  subtitle?: string;
  icon?: string;

  constructor(
    title: string | undefined,
    subtitle: string | undefined,
    icon: string | undefined
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.icon = icon;
  }

  static fromDict(dict: any): IterableInboxMetadata {
    return new IterableInboxMetadata(dict.title, dict.subtitle, dict.icon);
  }
}
