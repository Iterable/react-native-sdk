import { IterableEmbeddedMessageElementsButtonAction } from './IterableEmbeddedMessageElementsButtonAction';

/**
 * IterableEmbeddedMessageElementsButton represents a button in an embedded message.
 */
export class IterableEmbeddedMessageElementsButton {
  /** The ID for the embedded message button */
  readonly id: string;
  /** The title for the embedded message button */
  readonly title?: string;
  /** The action for the embedded message button */
  readonly action?: IterableEmbeddedMessageElementsButtonAction;

  /**
   * Creates an instance of IterableEmbeddedMessageButton.
   *
   * @param id - The ID for the embedded message button.
   * @param title - The title for the embedded message button.
   * @param action - The action for the embedded message button.
   */
  constructor(
    id: string,
    title?: string,
    action?: IterableEmbeddedMessageElementsButtonAction
  ) {
    this.id = id;
    this.title = title;
    this.action = action;
  }

  /**
   * Creates an instance of `IterableEmbeddedMessageButton` from a dictionary object.
   *
   * @param dict - The dictionary object containing the properties to initialize the `IterableEmbeddedMessageButton` instance.
   * @returns A new instance of `IterableEmbeddedMessageButton` initialized with the provided dictionary properties.
   */
  static fromDict(
    dict: Partial<EmbeddedMessageElementsButtonDict>
  ): IterableEmbeddedMessageElementsButton {
    if (!dict.id) {
      throw new Error('id is required');
    }
    const action = dict.action
      ? IterableEmbeddedMessageElementsButtonAction.fromDict(dict.action)
      : undefined;
    return new IterableEmbeddedMessageElementsButton(
      dict.id,
      dict.title,
      action
    );
  }
}

/**
 * An interface defining the dictionary object containing the properties for the embedded message button.
 */
export interface EmbeddedMessageElementsButtonDict {
  id: string;
  title?: string;
  action?: IterableEmbeddedMessageElementsButtonAction;
}
