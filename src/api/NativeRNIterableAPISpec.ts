import { type TurboModule, TurboModuleRegistry } from 'react-native';

export interface IterableConfigDict {
  pushIntegrationName?: string;
  autoPushRegistration?: boolean;
  inAppDisplayInterval?: number;
  urlHandlerPresent: boolean;
  customActionHandlerPresent: boolean;
  inAppHandlerPresent: boolean;
  authHandlerPresent: boolean;
  // logLevel: IterableLogLevel;
  expiringAuthTokenRefreshPeriod?: number;
  allowedProtocols?: string[];
  androidSdkUseInMemoryStorageForInApps?: boolean;
  useInMemoryStorageForInApps?: boolean;
  // dataRegion: IterableDataRegion;
  // pushPlatform?: IterablePushPlatform;
  encryptionEnforced?: boolean;
  logLevel?: string;
  dataRegion?: string;
  pushPlatform?: string;
}

/**
 * TODO: Get correct types for the native SDK
 */
export interface Spec extends TurboModule {
  // Native SDK Functions
  initializeWithApiKey(
    apiKey: string,
    config: IterableConfigDict,
    version?: string
  ): Promise<boolean>;

  initialize2WithApiKey(
    apiKey: string,
    config: IterableConfigDict,
    apiEndPointOverride: string,
    version: string
  ): Promise<boolean>;

  setEmail(email: string | null | undefined, authToken: string | null | undefined): void;
  getEmail(): Promise<string | null>;
  setUserId(userId: string | null | undefined, authToken: string | null | undefined): void;
  getUserId(): Promise<string | null>;

  // Iterable API Request Functions
  disableDeviceForCurrentUser(): void;
  setInAppShowResponse(inAppShowResponse: number): void;
  getLastPushPayload(): Promise<{ [key: string]: string | number | boolean | null } | null>;
  getAttributionInfo(): Promise<{ [key: string]: string | number | boolean | null } | null>;
  setAttributionInfo(attributionInfo: { [key: string]: string | number | boolean | null } | null): void;

  trackPushOpenWithCampaignId(
    campaignId: number,
    templateId: number,
    messageId: string,
    appAlreadyRunning: boolean,
    dataFields: { [key: string]: string | number | boolean | null } | null
  ): void;

  updateCart(items: Array<{ [key: string]: string | number | boolean | null }>): void;

  trackPurchase(
    total: number,
    items: Array<{ [key: string]: string | number | boolean | null }>,
    dataFields: { [key: string]: string | number | boolean | null } | null
  ): void;

  trackInAppOpen(messageId: string, location: number): void;
  trackInAppClick(messageId: string, location: number, clickedUrl: string): void;
  trackInAppClose(
    messageId: string,
    location: number,
    source: number,
    clickedUrl?: string | null
  ): void;

  inAppConsume(messageId: string, location: number, source: number): void;
  trackEvent(name: string, dataFields: { [key: string]: string | number | boolean | null } | null): void;
  updateUser(dataFields: { [key: string]: string | number | boolean | null }, mergeNestedObjects: boolean): void;
  updateEmail(email: string, authToken: string | null | undefined): void;
  handleAppLink(appLink: string): Promise<boolean>;

  updateSubscriptions(
    emailListIds: number[] | null | undefined,
    unsubscribedChannelIds: number[] | null | undefined,
    unsubscribedMessageTypeIds: number[] | null | undefined,
    subscribedMessageTypeIds: number[] | null | undefined,
    campaignId: number,
    templateId: number
  ): void;

  // SDK In-App Manager Functions
  getInAppMessages(): Promise<Array<{ [key: string]: string | number | boolean | null }>>;
  getHtmlInAppContentForMessage(messageId: string): Promise<string>;
  getInboxMessages(): Promise<Array<{ [key: string]: string | number | boolean | null }>>;
  getUnreadInboxMessagesCount(): Promise<number>;
  showMessage(messageId: string, consume: boolean): Promise<boolean>;
  removeMessage(messageId: string, location: number, source: number): void;
  setReadForMessage(messageId: string, read: boolean): void;
  setAutoDisplayPaused(paused: boolean): void;

  // SDK Inbox Session Tracking Functions
  startSession(visibleRows: Array<{ [key: string]: string | number | boolean | null }>): void;
  endSession(): void;
  updateVisibleRows(visibleRows: Array<{ [key: string]: string | number | boolean | null }>): void;

  // SDK Auth Manager Functions
  passAlongAuthToken(authToken: string | null): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNIterableAPI');