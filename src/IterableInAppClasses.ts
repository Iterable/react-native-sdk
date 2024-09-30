/**
 * `show` to show the in-app otherwise `skip` to skip.
 */
enum IterableInAppShowResponse {
  show = 0,
  skip = 1,
}

/**
 * `immediate` will try to display the in-app automatically immediately
 * `event` is used for Push to in-app
 * `never` will not display the in-app automatically via the SDK
 */
enum IterableInAppTriggerType {
  immediate = 0,
  event = 1,
  never = 2,
}

class IterableInAppTrigger {
  type: IterableInAppTriggerType;

  constructor(type: IterableInAppTriggerType) {
    this.type = type;
  }

  static fromDict(dict: any): IterableInAppTrigger {
    const type = dict.type as IterableInAppTriggerType | IterableInAppTriggerType.immediate;
    return new IterableInAppTrigger(type);
  }
}

enum IterableInAppContentType {
  html = 0,
  alert = 1,
  banner = 2,
}

enum IterableInAppLocation {
  inApp = 0,
  inbox = 1,
}

enum IterableInAppCloseSource {
  back = 0,
  link = 1,
  unknown = 100,
}

enum IterableInAppDeleteSource {
  inboxSwipe = 0,
  deleteButton = 1,
  unknown = 100,
}

class IterableEdgeInsets {
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
      dict.right as number,
    );
  }
}

export interface IterableInAppContent {
  type: IterableInAppContentType;
}

class IterableHtmlInAppContent implements IterableInAppContent {
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
      dict.html as string,
    );
  }
}

class IterableInboxMetadata {
  title?: string;
  subtitle?: string;
  icon?: string;

  constructor(title: string | undefined, subtitle: string | undefined, icon: string | undefined) {
    this.title = title;
    this.subtitle = subtitle;
    this.icon = icon;
  }

  static fromDict(dict: any): IterableInboxMetadata {
    return new IterableInboxMetadata(dict.title, dict.subtitle, dict.icon);
  }
}

export {
  IterableInAppShowResponse,
  IterableInAppTriggerType,
  IterableInAppTrigger,
  IterableInAppContentType,
  IterableEdgeInsets,
  IterableHtmlInAppContent,
  IterableInboxMetadata,
  IterableInAppLocation,
  IterableInAppCloseSource,
  IterableInAppDeleteSource,
};
