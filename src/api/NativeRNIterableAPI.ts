import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// NOTE: No types can be imported because of the way new arch works, so we have
// to re-define the types here.
interface EmbeddedMessage {
  metadata: {
    messageId: string;
    placementId: number;
    campaignId?: number | null;
    isProof?: boolean;
  };
  elements: {
    buttons?: Array<{
      id: string;
      title?: string | null;
      action: { type: string; data?: string } | null;
    }> | null;
    body?: string | null;
    mediaUrl?: string | null;
    mediaUrlCaption?: string | null;
    defaultAction?: { type: string; data?: string } | null;
    text?: Array<{
      id: string;
      text?: string | null;
      label?: string | null;
    }> | null;
    title?: string | null;
  } | null;
  payload?: { [key: string]: string | number | boolean | null } | null;
}

// Inbound fixed-shape structs. Keys are the source of truth and MUST stay in sync
// with the native decoders that read by string key. See the native `Serialization`
// files (iOS: ios/RNIterableAPI/Serialization.swift; Android:
// android/.../Serialization.java) for the authoritative key list per struct:
//   - CommerceItemSpec ↔ CommerceItem
//   - InboxImpressionRowSpec ↔ InboxImpressionTracker.RowInfo
// `dataFields` is `unknown` (not a typed dict): IterableCommerceItem.dataFields is
// typed `unknown` and is an open consumer-supplied data bag. Codegen accepts
// `unknown` (maps to GenericObjectTypeAnnotation, same as `Object`).
interface CommerceItemSpec {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sku?: string | null;
  description?: string | null;
  url?: string | null;
  imageUrl?: string | null;
  categories?: Array<string> | null;
  dataFields?: unknown;
}

interface AttributionInfoSpec {
  campaignId: number;
  templateId: number;
  messageId: string;
}

interface InboxImpressionRowSpec {
  messageId: string;
  silentInbox: boolean;
}

export interface Spec extends TurboModule {
  // Initialization
  initializeWithApiKey(
    apiKey: string,
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types -- RN codegen requires `Object`, not `object`
    config: Object,
    version: string
  ): Promise<boolean>;

  initialize2WithApiKey(
    apiKey: string,
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types -- RN codegen requires `Object`, not `object`
    config: Object,
    version: string,
    apiEndPointOverride: string
  ): Promise<boolean>;

  // User management
  setEmail(email: string | null, authToken?: string | null): void;
  getEmail(): Promise<string | null>;
  setUserId(userId?: string | null, authToken?: string | null): void;
  getUserId(): Promise<string | null | undefined>;

  // In-app messaging
  setInAppShowResponse(number: number): void;
  getInAppMessages(): Promise<
    Array<{ [key: string]: string | number | boolean }>
  >;
  getInboxMessages(): Promise<
    Array<{ [key: string]: string | number | boolean }>
  >;
  getUnreadInboxMessagesCount(): Promise<number>;
  showMessage(messageId: string, consume: boolean): Promise<string | null>;
  removeMessage(messageId: string, location: number, source: number): void;
  setReadForMessage(messageId: string, read: boolean): void;
  setAutoDisplayPaused(autoDisplayPaused: boolean): void;

  // Tracking
  trackEvent(
    name: string,
    dataFields?: { [key: string]: string | number | boolean }
  ): void;
  trackPushOpenWithCampaignId(
    campaignId: number,
    templateId: number | null,
    messageId: string,
    appAlreadyRunning: boolean,
    dataFields?: { [key: string]: string | number | boolean }
  ): void;
  trackInAppOpen(messageId: string, location: number): void;
  trackInAppClick(
    messageId: string,
    location: number,
    clickedUrl: string
  ): void;
  trackInAppClose(
    messageId: string,
    location: number,
    source: number,
    clickedUrl?: string | null
  ): void;
  inAppConsume(messageId: string, location: number, source: number): void;

  // Commerce
  updateCart(items: Array<CommerceItemSpec>): void;
  trackPurchase(
    total: number,
    items: Array<CommerceItemSpec>,
    dataFields?: { [key: string]: string | number | boolean }
  ): void;

  // User data
  updateUser(
    dataFields: { [key: string]: string | number | boolean },
    mergeNestedObjects: boolean
  ): void;
  updateEmail(email: string, authToken?: string): void;

  // Attribution
  getAttributionInfo(): Promise<AttributionInfoSpec | null>;
  setAttributionInfo(dict: AttributionInfoSpec | null): void;

  // Device management
  disableDeviceForCurrentUser(): void;
  disableDeviceForAllUsers(): void;
  registerDeviceToken(token: string): void;
  getLastPushPayload(): Promise<{
    [key: string]: string | number | boolean;
  } | null>;

  // Content
  getHtmlInAppContentForMessage(
    messageId: string
  ): Promise<{ [key: string]: string | number | boolean }>;

  // App links
  handleAppLink(appLink: string): Promise<boolean>;

  // Subscriptions
  updateSubscriptions(
    emailListIds: Array<number> | null,
    unsubscribedChannelIds: Array<number> | null,
    unsubscribedMessageTypeIds: Array<number> | null,
    subscribedMessageTypeIds: Array<number> | null,
    campaignId: number,
    templateId: number
  ): void;

  // Session tracking
  startSession(visibleRows: Array<InboxImpressionRowSpec>): void;
  endSession(): void;
  updateVisibleRows(
    visibleRows: Array<InboxImpressionRowSpec>
  ): void;

  // Auth
  getAuthToken(): Promise<string | null>;
  passAlongAuthToken(authToken?: string | null): void;
  pauseAuthRetries(pauseRetry: boolean): void;

  // Embedded Messaging
  syncEmbeddedMessages(): void;
  startEmbeddedSession(): void;
  endEmbeddedSession(): void;
  startEmbeddedImpression(messageId: string, placementId: number): void;
  pauseEmbeddedImpression(messageId: string): void;
  getEmbeddedMessages(
    placementIds: Array<number> | null
  ): Promise<Array<EmbeddedMessage>>;
  trackEmbeddedClick(
    message: EmbeddedMessage,
    buttonId: string | null,
    clickedUrl: string | null
  ): void;

  // Wake app -- android only
  wakeApp(): void;

  // REQUIRED for RCTEventEmitter
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

// Check if we're in a test environment
const isTestEnvironment = () => {
  return (
    typeof jest !== 'undefined' ||
    process.env.NODE_ENV === 'test' ||
    process.env.JEST_WORKER_ID !== undefined
  );
};

export default isTestEnvironment()
  ? undefined
  : TurboModuleRegistry.getEnforcing<Spec>('RNIterableAPI');
