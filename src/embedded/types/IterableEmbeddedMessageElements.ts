import type { IterableAction } from '../../core/classes/IterableAction';
import type { IterableEmbeddedMessageElementsButton } from './IterableEmbeddedMessageElementsButton';
import type { IterableEmbeddedMessageElementsText } from './IterableEmbeddedMessageElementsText';

/**
 * The elements of an embedded message.
 *
 * Includes what to display, and how to handle interaction.
 */
export interface IterableEmbeddedMessageElements {
  /** The message's title text. */
  title?: string | null;
  /** The message's body text. */
  body?: string | null;
  /** The URL of an image associated with the message. */
  mediaUrl?: string | null;
  /** Text description of the image. */
  mediaUrlCaption?: string | null;
  /** What to do when a user clicks on the message (outside of its buttons). */
  defaultAction?: IterableAction | null;
  /** Buttons to display. */
  buttons?: IterableEmbeddedMessageElementsButton[] | null;
  /** Extra data fields. Not for display. */
  text?: IterableEmbeddedMessageElementsText[] | null;
}
