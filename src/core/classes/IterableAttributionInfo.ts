import { asBridgeRecord, type BridgeRecord } from '../../api/bridge';

/** Shape returned by native `getAttributionInfo` / expected by `setAttributionInfo`. */
export type AttributionInfoBridge = {
  campaignId: number;
  templateId: number;
  messageId: string;
};

/** Accepted input for {@link IterableAttributionInfo.parseToBridge}. */
export type IterableAttributionInfoInput =
  | IterableAttributionInfo
  | AttributionInfoBridge
  | BridgeRecord;

/**
 * Represents attribution information for an Iterable campaign.
 */
export class IterableAttributionInfo {
  /**
   * The ID of the campaign.
   */
  campaignId: number;

  /**
   * The ID of the template used in the campaign.
   */
  templateId: number;

  /**
   * The ID of the message.
   */
  messageId: string;

  /**
   * Creates an instance of IterableAttributionInfo.
   * @param campaignId - The ID of the campaign.
   * @param templateId - The ID of the template used in the campaign.
   * @param messageId - The ID of the message.
   */
  constructor(campaignId: number, templateId: number, messageId: string) {
    this.campaignId = campaignId;
    this.templateId = templateId;
    this.messageId = messageId;
  }

  /** Plain map for the React Native bridge (native SDK JSON serialization). */
  toBridge(): AttributionInfoBridge {
    return {
      campaignId: this.campaignId,
      templateId: this.templateId,
      messageId: this.messageId,
    };
  }

  /**
   * Normalize a class instance, plain object, or native bridge payload into the
   * shape expected by the native layer.
   */
  static parseToBridge(
    value: IterableAttributionInfoInput | null | undefined
  ): AttributionInfoBridge | undefined {
    if (value == null) {
      return undefined;
    }
    if (value instanceof IterableAttributionInfo) {
      return value.toBridge();
    }

    const campaignId = value.campaignId;
    const templateId = value.templateId;
    const messageId = value.messageId;
    if (
      campaignId === undefined ||
      templateId === undefined ||
      messageId === undefined
    ) {
      return undefined;
    }

    return {
      campaignId: Number(campaignId),
      templateId: Number(templateId),
      messageId: String(messageId),
    };
  }

  /**
   * Build from a native bridge payload, plain object, or an existing instance.
   */
  static fromBridge(
    value: IterableAttributionInfoInput | null | undefined
  ): IterableAttributionInfo | undefined {
    const bridge = IterableAttributionInfo.parseToBridge(value);
    if (!bridge) {
      return undefined;
    }
    return new IterableAttributionInfo(
      bridge.campaignId,
      bridge.templateId,
      bridge.messageId
    );
  }

  /** Bridge record for TurboModule / native calls. */
  static toBridgeRecord(
    value: IterableAttributionInfoInput | null | undefined
  ): BridgeRecord | undefined {
    const bridge = IterableAttributionInfo.parseToBridge(value);
    return bridge !== undefined ? asBridgeRecord(bridge) : undefined;
  }
}
