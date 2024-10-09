/**
 * IterableInboxCustomizations is an interface that allows you to customize the appearance of the inbox screen in your app.
 */
export interface IterableInboxCustomizations {
  /** The title that appears at the top of the inbox screen. */
  navTitle?: string;
  /** The title that appears in the middle of the screen when the inbox contains no messages. Default value: "No saved messages". */
  noMessagesTitle?: string;
  /**  The body text that appears in the middle of the screen when the inbox contains no messages. Default value: "Check again later!" */
  noMessagesBody?: string;

  /** The container that holds the unread indicator. */
  unreadIndicatorContainer?: {
    flexDirection?: string;
    justifyContent?: string;
  };

  /** The unread indicator icon. */
  unreadIndicator?: {
    width?: number;
    height?: number;
    borderRadius?: number;
    backgroundColor?: string;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
  };

  /** For an unread message, this is the container for the thumbnail image associated with the message (as configured when setting up the template in Iterable). */
  unreadMessageThumbnailContainer?: {
    paddingLeft?: number;
    flexDirection?: string;
    justifyContent?: string;
  };

  /** For a read message, this is the container for the thumbnail image associated with the message (as configured when setting up the template in Iterable). */
  readMessageThumbnailContainer?: {
    paddingLeft?: number;
    flexDirection?: string;
    justifyContent?: string;
  };

  /** A container around various elements in the message item: title, body, and created at. */
  messageContainer?: {
    paddingLeft?: number;
    width?: string;
    flexDirection?: string;
    justifyContent?: string;
  };

  /** The title of the message, as displayed in the inbox. */
  title?: {
    fontSize?: number;
    paddingBottom?: number;
  };

  /** The body of the message, as displayed in the inbox (not when the message has been opened). */
  body?: {
    fontSize?: number;
    color?: string;
    width?: string;
    flexWrap?: string;
    paddingBottom?: number;
  };

  /** The message date. */
  createdAt?: {
    fontSize?: number;
    color?: string;
  };

  /** A message row. Use these styles to customize row height, padding, background color, border, etc. */
  messageRow?: {
    flexDirection?: string;
    backgroundColor?: string;
    paddingTop?: number;
    paddingBottom?: number;
    height?: number;
    borderStyle?: string;
    borderColor?: string;
    borderTopWidth?: number;
  };
}
