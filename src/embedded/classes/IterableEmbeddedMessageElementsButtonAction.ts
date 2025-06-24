/**
 * IterableEmbeddedMessageElementsButtonAction represents an action defined as a response to user events
 * for an embedded message button.
 */
export class IterableEmbeddedMessageElementsButtonAction {
  /**
   * The type of iterable action
   * For custom actions, the type is `action://` prefix followed by a custom action name
   */
  readonly type: string;

  /**
   * The url for the action when the type is `openUrl`
   * For custom actions, data is empty
   */
  readonly data?: string;

  /**
   * Creates an instance of IterableEmbeddedMessageElementsButtonAction.
   *
   * @param type - The type of the action.
   * @param data - Optional data associated with the action.
   */
  constructor(type: string, data?: string) {
    this.type = type;
    this.data = data;
  }

  /**
   * Creates an instance of `IterableEmbeddedMessageElementsButtonAction` from a dictionary object.
   *
   * @param dict - The dictionary object containing the properties to initialize the `IterableEmbeddedMessageElementsButtonAction` instance.
   * @returns A new instance of `IterableEmbeddedMessageElementsButtonAction` initialized with the provided dictionary properties.
   */
  static fromDict(
    dict: Partial<EmbeddedMessageButtonActionDict>
  ): IterableEmbeddedMessageElementsButtonAction {
    if (!dict.type) {
      throw new Error('type is required');
    }
    return new IterableEmbeddedMessageElementsButtonAction(
      dict.type,
      dict.data
    );
  }
}

/**
 * An interface defining the dictionary object containing the properties for the embedded message button action.
 */
export interface EmbeddedMessageButtonActionDict {
  /** The type of the action */
  type: string;
  /** The data associated with the action */
  data?: string;
}
