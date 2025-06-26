import { IterableEmbeddedMessageElements } from './IterableEmbeddedMessageElements';
import type { EmbeddedMessageElementsDict } from './IterableEmbeddedMessageElements';

/**
 * IterableEmbeddedMessage represents an embedded message.
 */
export class IterableEmbeddedMessage {
  /** The metadata of the embedded message */
  readonly metadata: {
    messageId: string;
    placementId: number;
    campaignId?: number;
    isProof: boolean;
  };
  /** The elements of the embedded message */
  readonly elements?: IterableEmbeddedMessageElements;
  /** The custom payload of the embedded message */
  readonly payload?: Record<string, unknown>;

  /**
   * Creates an instance of `IterableEmbeddedMessage`.
   *
   * @param dict - The dictionary object containing the properties to initialize the `IterableEmbeddedMessage` instance.
   */
  constructor(dict: EmbeddedMessageDict) {
    if (!dict.metadata) {
      throw new Error('metadata is required');
    }
    this.metadata = {
      messageId: dict.metadata.messageId,
      placementId: dict.metadata.placementId,
      campaignId: dict.metadata.campaignId,
      isProof: dict.metadata.isProof,
    };
    this.elements = dict.elements
      ? new IterableEmbeddedMessageElements(dict.elements)
      : undefined;
    this.payload = dict.payload;
  }
}

/**
 * An interface defining the dictionary object containing the properties for the embedded message.
 */
export interface EmbeddedMessageDict {
  /** The metadata of the embedded message */
  metadata: {
    messageId: string;
    placementId: number;
    campaignId?: number;
    isProof: boolean;
  };
  /** The elements of the embedded message */
  elements?: EmbeddedMessageElementsDict;
  /** The custom payload of the embedded message */
  payload?: Record<string, unknown>;
}
