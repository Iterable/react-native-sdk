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
    const action = dict.action
      ? IterableEmbeddedMessageElementsButtonAction.fromDict(dict.action)
      : undefined;
    return new IterableEmbeddedMessageButton(dict.id, dict.title, action);
  }
}

export interface EmbeddedMessageButtonDict {
  id: string;
  title?: string;
  action?: IterableEmbeddedMessageElementsButtonAction;
}
