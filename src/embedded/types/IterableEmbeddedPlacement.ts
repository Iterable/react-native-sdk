import type { IterableEmbeddedMessage } from './IterableEmbeddedMessage';

export interface IterableEmbeddedPlacement {
  placementId: number;
  messages: IterableEmbeddedMessage[];
}
