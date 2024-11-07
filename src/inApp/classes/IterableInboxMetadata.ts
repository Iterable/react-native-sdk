/**
 * TODO: Add description
 */
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

  static fromDict(dict: {
    title: string | undefined;
    subtitle: string | undefined;
    icon: string | undefined;
  }): IterableInboxMetadata {
    return new IterableInboxMetadata(dict.title, dict.subtitle, dict.icon);
  }
}

export default IterableInboxMetadata;
