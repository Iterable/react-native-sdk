import { IterableEmbeddedMessage } from './IterableEmbeddedMessage';
import type { IterableEmbeddedMessageDict } from './IterableEmbeddedMessage';

export interface IterableEmbeddedPlacementDict {
  placementId: number;
  messages: IterableEmbeddedMessageDict[];
}

export class IterableEmbeddedPlacement {
  public placementId: number;
  public messages: IterableEmbeddedMessage[];

  constructor(placementId: number, messages: IterableEmbeddedMessage[]) {
    this.placementId = placementId;
    this.messages = messages;
  }

  toDict(): IterableEmbeddedPlacementDict {
    return {
      placementId: this.placementId,
      messages: this.messages.map((m) => m.toDict()),
    };
  }

  static fromDict(
    jsonObject: IterableEmbeddedPlacementDict
  ): IterableEmbeddedPlacement {
    const placementId = jsonObject.placementId;
    const messages = (jsonObject.messages ?? []).map((m) =>
      IterableEmbeddedMessage.fromDict(m)
    );

    return new IterableEmbeddedPlacement(placementId, messages);
  }
}
