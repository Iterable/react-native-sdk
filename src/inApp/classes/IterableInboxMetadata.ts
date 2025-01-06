/**
 * Metadata for a message.
 */
export class IterableInboxMetadata {
  /** The message title */
  title?: string;
  /** The message subtitle (this is sometimes a preview of the body text) */
  subtitle?: string;
  /** The icon associated with the message */
  icon?: string;

  /**
   * Constructs an instance of IterableInboxMetadata.
   *
   * @param title - The title of the inbox item.
   * @param subtitle - The subtitle of the inbox item.
   * @param icon - The icon associated with the inbox item.
   */
  constructor(
    title: string | undefined,
    subtitle: string | undefined,
    icon: string | undefined
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.icon = icon;
  }

  /**
   * Creates an instance of `IterableInboxMetadata` from a dictionary object.
   *
   * @param dict - The dictionary object containing the metadata properties.
   * This corresponds to the properties in {@link IterableInboxMetadata}.
   *
   * @returns A new instance of `IterableInboxMetadata` with the provided properties.
   */
  static fromDict(dict: {
    /** The message title */
    title: string | undefined;
    /** The message subtitle (this is sometimes a preview of the body text) */
    subtitle: string | undefined;
    /** The icon associated with the message */
    icon: string | undefined;
  }): IterableInboxMetadata {
    return new IterableInboxMetadata(dict.title, dict.subtitle, dict.icon);
  }
}
