import { IterableEmbeddedMessageElementsButton } from './IterableEmbeddedMessageElementsButton';
import { IterableEmbeddedMessageText } from './IterableEmbeddedMessageText';

import type { EmbeddedMessageElementsButtonDict } from './IterableEmbeddedMessageElementsButton';
import type { EmbeddedMessageTextDict } from './IterableEmbeddedMessageText';

/**
 * IterableEmbeddedMessageElements represents the elements of an embedded message.
 */
export class IterableEmbeddedMessageElements {
  /** The title of the embedded message */
  readonly title?: string;
  /** The body of the embedded message */
  readonly body?: string;
  /** The url of the embedded message image */
  readonly mediaUrl?: string;
  /** The caption of the embedded message image */
  readonly mediaUrlCaption?: string;
  /** The default action of the embedded message */
  readonly defaultAction?: {
    type: string;
    data?: string;
  };
  /** The buttons of the embedded message */
  readonly buttons?: IterableEmbeddedMessageElementsButton[];
  /** The text elements of the embedded message */
  readonly text?: IterableEmbeddedMessageText[];

  /**
   * Creates an instance of `IterableEmbeddedMessageElements`.
   *
   * @param dict - The dictionary object containing the properties to initialize the `IterableEmbeddedMessageElements` instance.
   */
  constructor(dict: Partial<EmbeddedMessageElementsDict>) {
    this.title = dict.title;
    this.body = dict.body;
    this.mediaUrl = dict.mediaUrl;
    this.mediaUrlCaption = dict.mediaUrlCaption;

    if (dict.defaultAction) {
      this.defaultAction = {
        type: dict.defaultAction.type,
        data: dict.defaultAction.data,
      };
    }

    this.buttons = dict.buttons?.map(
      (button) => new IterableEmbeddedMessageElementsButton(button)
    );

    this.text = dict.text?.map((text) => new IterableEmbeddedMessageText(text));
  }
}

/**
 * An interface defining the dictionary object containing the properties for the embedded message elements.
 */
export interface EmbeddedMessageElementsDict {
  /** The title of the embedded message */
  title?: string;
  /** The body of the embedded message */
  body?: string;
  /** The url of the embedded message image */
  mediaUrl?: string;
  /** The caption of the embedded message image */
  mediaUrlCaption?: string;
  /** The default action of the embedded message */
  defaultAction?: {
    type: string;
    data?: string;
  };
  /** The buttons of the embedded message */
  buttons?: EmbeddedMessageElementsButtonDict[];
  /** The text elements of the embedded message */
  text?: EmbeddedMessageTextDict[];
}
