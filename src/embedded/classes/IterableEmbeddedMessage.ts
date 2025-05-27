import { IterableEmbeddedMessageMetadata } from './IterableEmbeddedMessageMetadata';
import { IterableEmbeddedMessageElements } from './IterableEmbeddedMessageElements';

export class IterableEmbeddedMessage {
  metadata: IterableEmbeddedMessageMetadata;
  elements?: IterableEmbeddedMessageElements;
  payload?: Record<string, unknown>;

  constructor(
    metadata: IterableEmbeddedMessageMetadata,
    elements?: IterableEmbeddedMessageElements,
    payload?: Record<string, unknown>
  ) {
    this.metadata = metadata;
    this.elements = elements;
    this.payload = payload;
  }

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

interface EmbeddedMessageDict {
  metadata: IterableEmbeddedMessageMetadata;
  elements: IterableEmbeddedMessageElements;
  payload: Record<string, unknown>;
}
