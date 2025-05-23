import { IterableEmbeddedMessageMetadata } from './IterableEmbeddedMessageMetadata';
import { IterableEmbeddedMessageElements } from './IterableEmbeddedMessageElements';

export class IterableEmbeddedMessage {
  readonly metadata: IterableEmbeddedMessageMetadata;
  readonly elements: IterableEmbeddedMessageElements;
  readonly payload: Record<string, unknown>;

  constructor(
    metadata: IterableEmbeddedMessageMetadata,
    elements: IterableEmbeddedMessageElements,
    payload: Record<string, unknown>
  ) {
    this.metadata = metadata;
    this.elements = elements;
    this.payload = payload;
  }
}
