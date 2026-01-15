import type { IterableEmbeddedMessageElements } from './IterableEmbeddedMessageElements';
import type { IterableEmbeddedMessageMetadata } from './IterableEmbeddedMessageMetadata';

/**
 * An embedded message.
 */
export interface IterableEmbeddedMessage {
  /** Identifying information about the campaign. */
  metadata: IterableEmbeddedMessageMetadata;
  /** What to display, and how to handle interaction. */
  elements?: IterableEmbeddedMessageElements | null;
  /** Custom JSON data included with the campaign. */
  payload?: Record<string, unknown> | null;
}
