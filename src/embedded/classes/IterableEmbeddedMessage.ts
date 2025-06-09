import { IterableEmbeddedMessageMetadata } from './IterableEmbeddedMessageMetadata';
import { IterableEmbeddedMessageElements } from './IterableEmbeddedMessageElements';

/**
 * IterableEmbeddedMessage represents an embedded message.
 */
export class IterableEmbeddedMessage {
  /** The metadata of the embedded message */
  metadata: IterableEmbeddedMessageMetadata;
  /** The elements of the embedded message */
  elements?: IterableEmbeddedMessageElements;
  /** The custom payload of the embedded message */
  payload?: Record<string, unknown>;

  /**
   * Creates an instance of `IterableEmbeddedMessage`.
   *
   * @param metadata - The metadata of the embedded message.
   * @param elements - The elements of the embedded message.
   * @param payload - The custom payload of the embedded message.
   */
  constructor(
    metadata: IterableEmbeddedMessageMetadata,
    elements?: IterableEmbeddedMessageElements,
    payload?: Record<string, unknown>
  ) {
    this.metadata = metadata;
    this.elements = elements;
    this.payload = payload;
  }

  /**
   * Creates an instance of `IterableEmbeddedMessage` from a dictionary object.
   *
   * @param dict - The dictionary object containing the properties to initialize the `IterableEmbeddedMessage` instance.
   * @returns A new instance of `IterableEmbeddedMessage` initialized with the provided dictionary properties.
   */
  static fromDict(dict: Partial<EmbeddedMessageDict>): IterableEmbeddedMessage {
    if (!dict.metadata) {
      throw new Error('metadata is required');
    }
    const metadata = IterableEmbeddedMessageMetadata.fromDict(dict.metadata);
    const elements = dict.elements
      ? IterableEmbeddedMessageElements.fromDict(dict.elements)
      : undefined;
    const payload = dict.payload;
    return new IterableEmbeddedMessage(metadata, elements, payload);
  }
}

/**
 * An interface defining the dictionary object containing the properties for the embedded message.
 */
interface EmbeddedMessageDict {
  metadata: IterableEmbeddedMessageMetadata;
  elements: IterableEmbeddedMessageElements;
  payload: Record<string, unknown>;
}
