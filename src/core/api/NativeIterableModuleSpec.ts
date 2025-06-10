import { type TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // Native SDK Functions
  initializeWithApiKey(
    apiKey: string,
    config: Record<string, unknown>,
    version: string
  ): Promise<boolean>;

  initialize2WithApiKey(
    apiKey: string,
    config: Record<string, unknown>,
    apiEndPointOverride: string,
    version: string
  ): Promise<boolean>;

  setEmail(email: string, authToken: string | null): void;
  getEmail(): Promise<string | null>;
  setUserId(userId: string, authToken: string | null): void;
  getUserId(): Promise<string | null>;

  // Iterable API Request Functions
  disableDeviceForCurrentUser(): void;
  setInAppShowResponse(inAppShowResponse: number): void;
  getLastPushPayload(): Promise<Record<string, unknown> | null>;
  getAttributionInfo(): Promise<Record<string, unknown> | null>;
  setAttributionInfo(attributionInfo: Record<string, unknown> | null): void;

  trackPushOpenWithCampaignId(
    campaignId: number,
    templateId: number,
    messageId: string,
    appAlreadyRunning: boolean,
    dataFields: Record<string, unknown> | null
  ): void;

  updateCart(items: Array<Record<string, unknown>>): void;

  trackPurchase(
    total: number,
    items: Array<Record<string, unknown>>,
    dataFields: Record<string, unknown> | null
  ): void;

  trackInAppOpen(messageId: string, location: number): void;
  trackInAppClick(messageId: string, location: number, clickedUrl: string): void;
  trackInAppClose(
    messageId: string,
    location: number,
    source: number,
    clickedUrl: string | null
  ): void;

  inAppConsume(messageId: string, location: number, source: number): void;
  trackEvent(name: string, dataFields: Record<string, unknown> | null): void;
  updateUser(dataFields: Record<string, unknown>, mergeNestedObjects: boolean): void;
  updateEmail(email: string, authToken: string | null): void;
  handleAppLink(appLink: string): Promise<boolean>;

  updateSubscriptions(
    emailListIds: number[] | null,
    unsubscribedChannelIds: number[] | null,
    unsubscribedMessageTypeIds: number[] | null,
    subscribedMessageTypeIds: number[] | null,
    campaignId: number,
    templateId: number
  ): void;

  // SDK In-App Manager Functions
  getInAppMessages(): Promise<Array<Record<string, unknown>>>;
  getHtmlInAppContentForMessage(messageId: string): Promise<string>;
  getInboxMessages(): Promise<Array<Record<string, unknown>>>;
  getUnreadInboxMessagesCount(): Promise<number>;
  showMessage(messageId: string, consume: boolean): Promise<boolean>;
  removeMessage(messageId: string, location: number, source: number): void;
  setReadForMessage(messageId: string, read: boolean): void;
  setAutoDisplayPaused(paused: boolean): void;

  // SDK Inbox Session Tracking Functions
  startSession(visibleRows: Array<Record<string, unknown>>): void;
  endSession(): void;
  updateVisibleRows(visibleRows: Array<Record<string, unknown>>): void;

  // SDK Auth Manager Functions
  passAlongAuthToken(authToken: string | null): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNIterableAPI');
