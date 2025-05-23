import { IterableEmbeddedMessage } from './IterableEmbeddedMessage';

/**
 * Iterable embedded placement
 * Contains placement id and the associated embedded messages
 */
export class IterableEmbeddedPlacement {
  readonly placementId: number;

  readonly messages: IterableEmbeddedMessage[];

  constructor(placementId: number, messages: IterableEmbeddedMessage[]) {
    this.placementId = placementId;
    this.messages = messages;
  }
}
