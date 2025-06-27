import { IterableEmbeddedMessageButton } from './IterableEmbeddedMessageButton';
import { IterableEmbeddedMessageText } from './IterableEmbeddedMessageText';

/**
 * IterableEmbeddedMessage represents an embedded message.
 */
export class IterableEmbeddedMessage {
  /** The metadata of the embedded message */
  readonly metadata: {
    /** The id of the message */
    messageId: string;
    /** The placement id of the message */
    placementId: number;
    /** The campaign id of the message */
    campaignId?: number;
    /** Whether the message is a proof */
    isProof: boolean;
  };
  /** The elements of the embedded message */
  readonly elements?: {
    /** The title of the embedded message */
    title?: string;
    /** The body of the embedded message */
    body?: string;
    /** The media url of the embedded message */
    mediaUrl?: string;
    /** The media url caption of the embedded message */
    mediaUrlCaption?: string;
    /** The default action of the embedded message */
    defaultAction?: {
      /** The type of action */
      type: string;
      /** The url for the action when the type is `openUrl` */
      data?: string;
    };
    /** The buttons of the embedded message */
    buttons?: IterableEmbeddedMessageButton[];
    /** The text of the embedded message */
    text?: IterableEmbeddedMessageText[];
  };
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

    if (dict.elements) {
      this.elements = {
        title: dict.elements?.title,
        body: dict.elements?.body,
        mediaUrl: dict.elements?.mediaUrl,
        mediaUrlCaption: dict.elements?.mediaUrlCaption,
      };

      if (dict.elements?.defaultAction) {
        this.elements.defaultAction = {
          type: dict.elements.defaultAction.type,
          data: dict.elements.defaultAction.data,
        };
      }

      if (dict.elements?.buttons) {
        this.elements.buttons = dict.elements.buttons.map(
          (button) => new IterableEmbeddedMessageButton(button)
        );
      }

      if (dict.elements?.text) {
        this.elements.text = dict.elements.text.map(
          (text) => new IterableEmbeddedMessageText(text)
        );
      }
    }

    this.payload = dict.payload;
  }
}

/**
 * An interface defining the dictionary object containing the properties for the embedded message.
 */
export interface EmbeddedMessageDict {
  /** The metadata of the embedded message */
  metadata: {
    /** The id of the message */
    messageId: string;
    /** The placement id of the message */
    placementId: number;
    /** The campaign id of the message */
    campaignId?: number;
    /** Whether the message is a proof */
    isProof: boolean;
  };
  /** The elements of the embedded message */
  elements?: {
    /** The title of the embedded message */
    title?: string;
    /** The body of the embedded message */
    body?: string;
    /** The media url of the embedded message */
    mediaUrl?: string;
    /** The media url caption of the embedded message */
    mediaUrlCaption?: string;
    /** The default action of the embedded message */
    defaultAction?: {
      /** The type of action */
      type: string;
      /** The url for the action when the type is `openUrl` */
      data?: string;
    };
    /** The buttons of the embedded message */
    buttons?: IterableEmbeddedMessageButton[];
    /** The text of the embedded message */
    text?: IterableEmbeddedMessageText[];
  };
  /** The custom payload of the embedded message */
  payload?: Record<string, unknown>;
}
