/**
 * IterableEmbeddedMessageElementsButton represents a button in an embedded message.
 */
export class IterableEmbeddedMessageButton {
  /** The ID for the embedded message button */
  readonly id: string;
  /** The title for the embedded message button */
  readonly title?: string;
  /** The action for the embedded message button */
  readonly action?: {
    /** The type of action */
    type: string;
    /** The url for the action when the type is `openUrl` */
    data?: string;
  };

  /**
   * Creates an instance of IterableEmbeddedMessageButton.
   *
   * @param dict - The dictionary object containing the properties to initialize the `IterableEmbeddedMessageButton` instance.
   */
  constructor(dict: EmbeddedMessageElementsButtonDict) {
    if (!dict.id) {
      throw new Error('id is required');
    }

    this.id = dict.id;
    this.title = dict.title;

    if (dict.action) {
      this.action = {
        type: dict.action.type,
        data: dict.action.data,
      };
    }
  }
}

/**
 * An interface defining the dictionary object containing the properties for the embedded message button.
 */
export interface EmbeddedMessageElementsButtonDict {
  /** The ID for the embedded message button */
  id: string;
  /** The title for the embedded message button */
  title?: string;
  /** The action for the embedded message button */
  action?: {
    /** The type of action */
    type: string;
    /** The url for the action when the type is `openUrl` */
    data?: string;
  };
}
