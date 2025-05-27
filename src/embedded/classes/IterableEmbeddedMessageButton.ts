import { IterableEmbeddedMessageElementsButtonAction } from './IterableEmbeddedMessageElementsButtonAction';

export class IterableEmbeddedMessageButton {
  readonly id: string;
  readonly title?: string;
  readonly action?: IterableEmbeddedMessageElementsButtonAction;

  constructor(
    id: string,
    title?: string,
    action?: IterableEmbeddedMessageElementsButtonAction
  ) {
    this.id = id;
    this.title = title;
    this.action = action;
  }

  static fromDict(
    dict: Partial<EmbeddedMessageButtonDict>
  ): IterableEmbeddedMessageButton {
    if (!dict.id) {
      throw new Error('id is required');
    }
    return new IterableEmbeddedMessageButton(dict.id, dict.title, dict.action);
  }
}

export interface EmbeddedMessageButtonDict {
  id: string;
  title?: string;
  action?: IterableEmbeddedMessageElementsButtonAction;
}
