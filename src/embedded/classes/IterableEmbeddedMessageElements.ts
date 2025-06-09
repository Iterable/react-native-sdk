import { IterableEmbeddedMessageDefaultAction } from './IterableEmbeddedMessageDefaultAction';
import { IterableEmbeddedMessageElementsButton } from './IterableEmbeddedMessageElementsButton';
import { IterableEmbeddedMessageText } from './IterableEmbeddedMessageText';

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
  readonly defaultAction?: IterableEmbeddedMessageDefaultAction;
  /** The buttons of the embedded message */
  readonly buttons?: IterableEmbeddedMessageElementsButton[];
  /** The text elements of the embedded message */
  readonly text?: IterableEmbeddedMessageText[];

  /**
   * Creates an instance of `IterableEmbeddedMessageElements`.
   *
   * @param title - The title of the embedded message.
   * @param body - The body of the embedded message.
   * @param mediaUrl - The url of the embedded message image.
   * @param mediaUrlCaption - The caption of the embedded message image.
   * @param defaultAction - The default action of the embedded message.
   * @param buttons - The buttons of the embedded message.
   * @param text - The text elements of the embedded message.
   */
  constructor(
    title?: string,
    body?: string,
    mediaUrl?: string,
    mediaUrlCaption?: string,
    defaultAction?: IterableEmbeddedMessageDefaultAction,
    buttons?: IterableEmbeddedMessageElementsButton[],
    text?: IterableEmbeddedMessageText[]
  ) {
    this.title = title;
    this.body = body;
    this.mediaUrl = mediaUrl;
    this.mediaUrlCaption = mediaUrlCaption;
    this.defaultAction = defaultAction;
    this.buttons = buttons;
    this.text = text;
  }

  /**
   * Creates an instance of `IterableEmbeddedMessageElements` from a dictionary object.
   *
   * @param dict - The dictionary object containing the properties to initialize the `IterableEmbeddedMessageElements` instance.
   * @returns A new instance of `IterableEmbeddedMessageElements` initialized with the provided dictionary properties.
   */
  static fromDict(
    dict: Partial<EmbeddedMessageElementsDict>
  ): IterableEmbeddedMessageElements {
    const title = dict.title;
    const body = dict.body;
    const mediaUrl = dict.mediaUrl;
    const mediaUrlCaption = dict.mediaUrlCaption;
    const defaultAction = dict.defaultAction
      ? IterableEmbeddedMessageDefaultAction.fromDict(dict.defaultAction)
      : undefined;

    const buttons = dict.buttons?.map((button) =>
      IterableEmbeddedMessageElementsButton.fromDict(button)
    );

    const text = dict.text?.map((text) =>
      IterableEmbeddedMessageText.fromDict(text)
    );

    return new IterableEmbeddedMessageElements(
      title,
      body,
      mediaUrl,
      mediaUrlCaption,
      defaultAction,
      buttons,
      text
    );
  }
}

/**
 * An interface defining the dictionary object containing the properties for the embedded message elements.
 */
export interface EmbeddedMessageElementsDict {
  title?: string;
  body?: string;
  mediaUrl?: string;
  mediaUrlCaption?: string;
  defaultAction?: IterableEmbeddedMessageDefaultAction;
  buttons?: IterableEmbeddedMessageElementsButton[];
  text?: IterableEmbeddedMessageText[];
}
