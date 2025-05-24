import { IterableEmbeddedMessageDefaultAction } from './IterableEmbeddedMessageDefaultAction';
import { IterableEmbeddedMessageButton } from './IterableEmbeddedMessageButton';
import { IterableEmbeddedMessageText } from './IterableEmbeddedMessageText';

export class IterableEmbeddedMessageElements {
  readonly title: string;
  readonly body: string;
  readonly mediaUrl?: string;
  readonly mediaUrlCaption?: string;
  readonly defaultAction?: IterableEmbeddedMessageDefaultAction;
  readonly buttons?: IterableEmbeddedMessageButton[];
  readonly text?: IterableEmbeddedMessageText[];
  constructor(
    title: string,
    body: string,
    mediaUrl: string | undefined,
    mediaUrlCaption: string | undefined,
    defaultAction: IterableEmbeddedMessageDefaultAction | undefined,
    buttons: IterableEmbeddedMessageButton[] | undefined,
    text: IterableEmbeddedMessageText[] | undefined
  ) {
    this.title = title;
    this.body = body;
    this.mediaUrl = mediaUrl;
    this.mediaUrlCaption = mediaUrlCaption;
    this.defaultAction = defaultAction;
    this.buttons = buttons;
    this.text = text;
  }
}
