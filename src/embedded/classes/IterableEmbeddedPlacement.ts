import { IterableEmbeddedMessage } from './IterableEmbeddedMessage';

/**
 * Iterable embedded placement
 * Contains placement id and the associated embedded messages
 */
export class IterableEmbeddedPlacement {
  readonly placementId: number;

  readonly messages?: IterableEmbeddedMessage[];

  constructor(placementId: number, messages?: IterableEmbeddedMessage[]) {
    this.placementId = placementId;
    this.messages = messages;
  }

  static fromDict(
    dict: Partial<EmbeddedPlacementDict>
  ): IterableEmbeddedPlacement {
    if (!dict.placementId) {
      throw new Error('placementId is required');
    }

    const placementId = dict.placementId;
    const messages = dict.messages
      ? dict.messages?.map((message) =>
          IterableEmbeddedMessage.fromDict(message)
        )
      : undefined;
    return new IterableEmbeddedPlacement(placementId, messages);
  }
}

interface EmbeddedPlacementDict {
  placementId: number;
  messages?: IterableEmbeddedMessage[];
}
