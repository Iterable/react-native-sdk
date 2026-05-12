import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// NOTE: No types can be imported because of the way new arch works, so we have
// to re-define the types here.
// Codegen (RN 0.84+) rejects unions that include array types (e.g. `T[] | U`,
// `string | string[]`). Use `Object` / `unknown` where the bridge carries
// richer JSON than the parser allows.
export interface Spec extends TurboModule {
  // Initialization
  initializeWithApiKey(
    apiKey: string,
    config: object,
    version: string
  ): Promise<boolean>;

  initialize2WithApiKey(
    apiKey: string,
    config: object,
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
  getInAppMessages(): Promise<{ [key: string]: string | number | boolean }[]>;
  getInboxMessages(): Promise<{ [key: string]: string | number | boolean }[]>;
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
  updateCart(items: { [key: string]: string | number | boolean }[]): void;
  trackPurchase(
    total: number,
    items: { [key: string]: string | number | boolean }[],
    dataFields?: { [key: string]: string | number | boolean }
  ): void;

  // User data
  updateUser(
    dataFields: { [key: string]: string | number | boolean },
    mergeNestedObjects: boolean
  ): void;
  updateEmail(email: string, authToken?: string): void;

  // Attribution
  getAttributionInfo(): Promise<{
    [key: string]: string | number | boolean;
  } | null>;
  setAttributionInfo(
    dict: { [key: string]: string | number | boolean } | null
  ): void;

  // Device management
  disableDeviceForCurrentUser(): void;
  getLastPushPayload(): Promise<{
    [key: string]: string | number | boolean;
  } | null>;

  // Content
  getHtmlInAppContentForMessage(
    messageId: string
  ): Promise<{ [key: string]: string | number | boolean }>;

  // App links
  handleAppLink(appLink: string): Promise<boolean>;

  // Subscriptions (arrays only in spec — RN codegen rejects `T[] | null`; callers
  // may still pass null at the bridge when using typed assertions.)
  updateSubscriptions(
    emailListIds: number[],
    unsubscribedChannelIds: number[],
    unsubscribedMessageTypeIds: number[],
    subscribedMessageTypeIds: number[],
    campaignId: number,
    templateId: number
  ): void;

  // Session tracking
  startSession(
    visibleRows: { [key: string]: string | number | boolean }[]
  ): void;
  endSession(): void;
  updateVisibleRows(
    visibleRows: { [key: string]: string | number | boolean }[]
  ): void;

  // Auth
  passAlongAuthToken(authToken?: string | null): void;
  pauseAuthRetries(pauseRetry: boolean): void;

  // Embedded Messaging
  syncEmbeddedMessages(): void;
  startEmbeddedSession(): void;
  endEmbeddedSession(): void;
  startEmbeddedImpression(messageId: string, placementId: number): void;
  pauseEmbeddedImpression(messageId: string): void;
  getEmbeddedMessages(placementIds: number[]): Promise<object[]>;
  trackEmbeddedClick(
    message: object,
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
