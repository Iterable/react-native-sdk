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
  constructor(id: string, text?: string, type?: string) {
    this.id = id;
    this.text = text;
    this.type = type;
  }

  /**
   * Creates an instance of `IterableEmbeddedMessageText` from a dictionary object.
   *
   * @param dict - The dictionary object containing the properties to initialize the `IterableEmbeddedMessageText` instance.
   * @returns A new instance of `IterableEmbeddedMessageText` initialized with the provided dictionary properties.
   */
  static fromDict(
    dict: Partial<EmbeddedMessageTextDict>
  ): IterableEmbeddedMessageText {
    if (!dict.id) {
      throw new Error('id is required');
    }
    return new IterableEmbeddedMessageText(dict.id, dict.text, dict.type);
  }
}

/**
 * An interface defining the dictionary object containing the properties for an embedded message text.
 */
export interface EmbeddedMessageTextDict {
  id: string;
  text?: string;
  type?: string;
}
