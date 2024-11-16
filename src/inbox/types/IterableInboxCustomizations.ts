/**
 * Interface representing customizations for the Iterable Inbox.
 */
export interface IterableInboxCustomizations {
  /**
   * The title to be displayed in the navigation bar.
   */
  navTitle?: string;

  /**
   * The title to be displayed when there are no messages.
   */
  noMessagesTitle?: string;

  /**
   * The body text to be displayed when there are no messages.
   */
  noMessagesBody?: string;

  /**
   * Customizations for the container of the unread indicator.
   */
  unreadIndicatorContainer?: {
    /**
     * The flex direction of the container.
     */
    flexDirection?: string;

    /**
     * The justification of the container's content.
     */
    justifyContent?: string;
  };

  /**
   * Customizations for the unread indicator.
   */
  unreadIndicator?: {
    /**
     * The width of the unread indicator.
     */
    width?: number;

    /**
     * The height of the unread indicator.
     */
    height?: number;

    /**
     * The border radius of the unread indicator.
     */
    borderRadius?: number;

    /**
     * The background color of the unread indicator.
     */
    backgroundColor?: string;

    /**
     * The left margin of the unread indicator.
     */
    marginLeft?: number;

    /**
     * The right margin of the unread indicator.
     */
    marginRight?: number;

    /**
     * The top margin of the unread indicator.
     */
    marginTop?: number;
  };

  /**
   * Customizations for the container of the unread message thumbnail.
   */
  unreadMessageThumbnailContainer?: {
    /**
     * The left padding of the container.
     */
    paddingLeft?: number;

    /**
     * The flex direction of the container.
     */
    flexDirection?: string;

    /**
     * The justification of the container's content.
     */
    justifyContent?: string;
  };

  /**
   * Customizations for the container of the read message thumbnail.
   */
  readMessageThumbnailContainer?: {
    /**
     * The left padding of the container.
     */
    paddingLeft?: number;

    /**
     * The flex direction of the container.
     */
    flexDirection?: string;

    /**
     * The justification of the container's content.
     */
    justifyContent?: string;
  };

  /**
   * Customizations for the message container.
   */
  messageContainer?: {
    /**
     * The left padding of the container.
     */
    paddingLeft?: number;

    /**
     * The width of the container.
     */
    width?: string;

    /**
     * The flex direction of the container.
     */
    flexDirection?: string;

    /**
     * The justification of the container's content.
     */
    justifyContent?: string;
  };

  /**
   * Customizations for the message title.
   */
  title?: {
    /**
     * The font size of the title.
     */
    fontSize?: number;

    /**
     * The bottom padding of the title.
     */
    paddingBottom?: number;
  };

  /**
   * Customizations for the message body.
   */
  body?: {
    /**
     * The font size of the body text.
     */
    fontSize?: number;

    /**
     * The color of the body text.
     */
    color?: string;

    /**
     * The width of the body text.
     */
    width?: string;

    /**
     * The flex wrap property of the body text.
     */
    flexWrap?: string;

    /**
     * The bottom padding of the body text.
     */
    paddingBottom?: number;
  };

  /**
   * Customizations for the message creation date.
   */
  createdAt?: {
    /**
     * The font size of the creation date text.
     */
    fontSize?: number;

    /**
     * The color of the creation date text.
     */
    color?: string;
  };

  /**
   * Customizations for the message row.
   */
  messageRow?: {
    /**
     * The flex direction of the message row.
     */
    flexDirection?: string;

    /**
     * The background color of the message row.
     */
    backgroundColor?: string;

    /**
     * The top padding of the message row.
     */
    paddingTop?: number;

    /**
     * The bottom padding of the message row.
     */
    paddingBottom?: number;

    /**
     * The height of the message row.
     */
    height?: number;

    /**
     * The border style of the message row.
     */
    borderStyle?: string;

    /**
     * The border color of the message row.
     */
    borderColor?: string;

    /**
     * The top border width of the message row.
     */
    borderTopWidth?: number;
  };
}
