import { IterableEmbeddedMessage } from './IterableEmbeddedMessage';

/**
 * IterableEmbeddedPlacement represents an embedded placement.
 */
export class IterableEmbeddedPlacement {
  /** The placement id of the embedded placement */
  readonly placementId: number;
  /** The messages associated with the embedded placement */
  readonly messages?: IterableEmbeddedMessage[];

  /**
   * Creates an instance of `IterableEmbeddedPlacement`.
   *
   * @param placementId - The placement id of the embedded placement.
   * @param messages - The messages associated with the embedded placement.
   */
  constructor(placementId: number, messages?: IterableEmbeddedMessage[]) {
    this.placementId = placementId;
    this.messages = messages;
  }

  /**
   * Creates an instance of `IterableEmbeddedPlacement` from a dictionary object.
   *
   * @param dict - The dictionary object containing the properties to initialize the `IterableEmbeddedPlacement` instance.
   * @returns A new instance of `IterableEmbeddedPlacement` initialized with the provided dictionary properties.
   */
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

/**
 * An interface defining the dictionary object containing the properties for the embedded placement.
 */
export interface EmbeddedPlacementDict {
  placementId: number;
  messages?: IterableEmbeddedMessage[];
}
