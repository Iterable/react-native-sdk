import { IterableEmbeddedMessageDefaultAction } from './IterableEmbeddedMessageDefaultAction';
import { IterableEmbeddedMessageElementsButton } from './IterableEmbeddedMessageElementsButton';
import { IterableEmbeddedMessageText } from './IterableEmbeddedMessageText';

export class IterableEmbeddedMessageElements {
  readonly title?: string;
  readonly body?: string;
  readonly mediaUrl?: string;
  readonly mediaUrlCaption?: string;
  readonly defaultAction?: IterableEmbeddedMessageDefaultAction;
  readonly buttons?: IterableEmbeddedMessageElementsButton[];
  readonly text?: IterableEmbeddedMessageText[];

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

export interface EmbeddedMessageElementsDict {
  title?: string;
  body?: string;
  mediaUrl?: string;
  mediaUrlCaption?: string;
  defaultAction?: IterableEmbeddedMessageDefaultAction;
  buttons?: IterableEmbeddedMessageElementsButton[];
  text?: IterableEmbeddedMessageText[];
}
