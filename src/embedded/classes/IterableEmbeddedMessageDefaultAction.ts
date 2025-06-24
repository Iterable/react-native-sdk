/**
 * IterableEmbeddedMessageDefaultAction represents the default action defined as
 * a response to user events for an embedded message
 */
export class IterableEmbeddedMessageDefaultAction {
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
   * Creates an instance of `IterableEmbeddedMessageDefaultAction`.
   *
   * @param type - The type of iterable action
   * @param data - The url for the action when the type is `openUrl`
   */
  constructor(type: string, data?: string) {
    this.type = type;
    this.data = data;
  }

  /**
   * Creates an instance of `IterableEmbeddedMessageDefaultAction` from a dictionary object.
   *
   * @param dict - The dictionary object containing the properties to initialize the `IterableEmbeddedMessageDefaultAction` instance.
   * @returns A new instance of `IterableEmbeddedMessageDefaultAction` initialized with the provided dictionary properties.
   */
  static fromDict(
    dict: Partial<EmbeddedMessageDefaultActionDict>
  ): IterableEmbeddedMessageDefaultAction {
    if (!dict.type) {
      throw new Error('type is required');
    }
    return new IterableEmbeddedMessageDefaultAction(dict.type, dict.data);
  }
}

/**
 * An interface defining the dictionary object containing the properties for the embedded message default action.
 */
export interface EmbeddedMessageDefaultActionDict {
  /** The type of the action */
  type: string;
  /** The url for the action when the type is `openUrl` */
  data?: string;
}
