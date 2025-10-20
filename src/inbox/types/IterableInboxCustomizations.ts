/**
 * Interface representing customizations for the Iterable Inbox.
 */
export interface IterableInboxCustomizations {
  /**
   * The title that appears at the top of the inbox screen.
   */
  navTitle?: string;

  /**
   * The title that appears in the middle of the screen when the inbox contains
   * no messages.
   *
   * @defaultValue "No saved messages".
   */
  noMessagesTitle?: string;

  /**
   * The body text that appears in the middle of the screen when the inbox
   * contains no messages.
   *
   * @defaultValue "Check again later!"
   */
  noMessagesBody?: string;

  /**
   * The container that holds the unread indicator.
   */
  unreadIndicatorContainer?: {
    /** The flex direction of the container.  */
    flexDirection?: string;

    /** The justification of the container's content. */
    justifyContent?: string;
  };

  /**
   * Customizations for the unread indicator icon.
   */
  unreadIndicator?: {
    /** The width of the unread indicator. */
    width?: number;

    /** The height of the unread indicator. */
    height?: number;

    /** The border radius of the unread indicator. */
    borderRadius?: number;

    /** The background color of the unread indicator. */
    backgroundColor?: string;

    /** The left margin of the unread indicator. */
    marginLeft?: number;

    /** The right margin of the unread indicator. */
    marginRight?: number;

    /** The top margin of the unread indicator. */
    marginTop?: number;
  };

  /**
   * For an unread message, this is the container for the thumbnail image
   * associated with the message (as configured when setting up the template in
   * Iterable).
   */
  unreadMessageThumbnailContainer?: {
    /** The left padding of the container. */
    paddingLeft?: number;

    /** The flex direction of the container. */
    flexDirection?: string;

    /** The justification of the container's content. */
    justifyContent?: string;
  };

  /**
   * For a read message, this is the container for the thumbnail image
   * associated with the message (as configured when setting up the template in
   * Iterable).
   */
  readMessageThumbnailContainer?: {
    /** The left padding of the container. */
    paddingLeft?: number;

    /** The flex direction of the container. */
    flexDirection?: string;

    /** The justification of the container's content. */
    justifyContent?: string;
  };

  /**
   * A container around various elements in the message item: title, body, and
   * created at.
   */
  messageContainer?: {
    /** The left padding of the container. */
    paddingLeft?: number;

    /** The width of the container. */
    width?: string;

    /** The flex direction of the container. */
    flexDirection?: string;

    /** The justification of the container's content. */
    justifyContent?: string;
  };

  /**
   * The title of the message, as displayed in the inbox.
   */
  title?: {
    /** The font size of the title. */
    fontSize?: number;

    /** The bottom padding of the title. */
    paddingBottom?: number;
  };

  /**
   * The body of the message, as displayed in the inbox (not when the message
   * has been opened).
   */
  body?: {
    /** The font size of the body text. */
    fontSize?: number;

    /** The color of the body text. */
    color?: string;

    /** The width of the body text. */
    width?: string;

    /** The flex wrap property of the body text. */
    flexWrap?: string;

    /** The bottom padding of the body text. */
    paddingBottom?: number;
  };

  /**
   * The message date.
   */
  createdAt?: {
    /** The font size of the creation date text. */
    fontSize?: number;

    /** The color of the creation date text. */
    color?: string;
  };

  /**
   * A message row.
   *
   * Use these styles to customize row height, padding, background color,
   * border, etc.
   */
  messageRow?: {
    /** The flex direction of the message row. */
    flexDirection?: string;

    /** The background color of the message row. */
    backgroundColor?: string;

    /** The top padding of the message row. */
    paddingTop?: number;

    /** The bottom padding of the message row. */
    paddingBottom?: number;

    /** The height of the message row. */
    height?: number;

    /** The border style of the message row. */
    borderStyle?: string;

    /** The border color of the message row. */
    borderColor?: string;

    /** The top border width of the message row. */
    borderTopWidth?: number;
  };
}
