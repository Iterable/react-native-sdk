import type { IterableEmbeddedMessageElements } from './IterableEmbeddedMessageElements';
import type { IterableEmbeddedMessageMetadata } from './IterableEmbeddedMessageMetadata';

export interface IterableEmbeddedMessage {
  metadata: IterableEmbeddedMessageMetadata;
  elements?: IterableEmbeddedMessageElements | null;
  payload?: Record<string, unknown> | null;
}
