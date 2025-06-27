/**
 * IterableEmbeddedMessageText represents a text element in an embedded message.
 */
export class IterableEmbeddedMessageText {
  /** The id of the text element */
  readonly id: string;
  /** The text of the text element */
  readonly text?: string;
  /** The type of the text element */
  readonly type?: string;

  /**
   * Creates an instance of `IterableEmbeddedMessageText`.
   *
   * @param id - The id of the text element
   * @param text - The text of the text element
   * @param type - The type of the text element
   */
  constructor(dict: EmbeddedMessageTextDict) {
    if (!dict.id) {
      throw new Error('id is required');
    }

    this.id = dict.id;
    this.text = dict.text;
    this.type = dict.type;
  }
}

/**
 * An interface defining the dictionary object containing the properties for an embedded message text.
 */
export interface EmbeddedMessageTextDict {
  /** The id of the text element */
  id: string;
  /** The text of the text element */
  text?: string;
  /** The type of the text element */
  type?: string;
}
