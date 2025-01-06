import { IterableInAppMessage } from '../../inApp';

/**
 * Represents the view model for an inbox row in the Iterable SDK.
 */
export interface IterableInboxRowViewModel {
  /**
   * The title of the inbox row.
   */
  title: string;

  /**
   * The subtitle of the inbox row. This field is optional.
   */
  subtitle?: string;

  /**
   * The URL of the image associated with the inbox row. This field is optional.
   */
  imageUrl?: string;

  /**
   * The date and time when the inbox row was created. This field is optional.
   */
  createdAt?: Date;

  /**
   * Indicates whether the inbox row has been read.
   */
  read: boolean;

  /**
   * The in-app message associated with the inbox row.
   */
  inAppMessage: IterableInAppMessage;
}
