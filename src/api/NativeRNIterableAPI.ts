import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface IterableConfigDict {
  pushIntegrationName?: string;
  autoPushRegistration?: boolean;
  inAppDisplayInterval?: number;
  urlHandlerPresent: boolean;
  customActionHandlerPresent?: boolean;
  inAppHandlerPresent?: boolean;
  authHandlerPresent?: boolean;
  expiringAuthTokenRefreshPeriod?: number;
  allowedProtocols?: string[];
  androidSdkUseInMemoryStorageForInApps?: boolean;
  useInMemoryStorageForInApps?: boolean;
  encryptionEnforced?: boolean;
  logLevel?: string | number;
  dataRegion?: string | number;
  pushPlatform?: string | number;
}

export interface Spec extends TurboModule {
  // multiply(a: number, b: number): number;
  hello(): void;

  // Initialization
  initializeWithApiKey(
    apiKey: string,
    config: { [key: string]: string | number | boolean },
    version: string
  ): Promise<boolean>;

  initialize2WithApiKey(
    apiKey: string,
    config: { [key: string]: string | number | boolean },
    apiEndPointOverride: string,
    version: string
  ): Promise<boolean>;

  // User management
  setEmail(email: string | null, authToken?: string | null): void;
  // getEmail(): Promise<string | null>;
  // setUserId(userId: string | null, authToken?: string | null): void;
  // getUserId(): Promise<string | null>;

  // // In-app messaging
  // setInAppShowResponse(number: number): void;
  // getInAppMessages(): Promise<{ [key: string]: string | number | boolean }[]>;
  // getInboxMessages(): Promise<{ [key: string]: string | number | boolean }[]>;
  // getUnreadInboxMessagesCount(): Promise<number>;
  // showMessage(messageId: string, consume: boolean): Promise<string | null>;
  // removeMessage(messageId: string, location: number, source: number): void;
  // setReadForMessage(messageId: string, read: boolean): void;
  // setAutoDisplayPaused(autoDisplayPaused: boolean): void;

  // // Tracking
  // trackEvent(
  //   name: string,
  //   dataFields?: { [key: string]: string | number | boolean }
  // ): void;
  // trackPushOpenWithCampaignId(
  //   campaignId: number,
  //   templateId: number | null,
  //   messageId: string,
  //   appAlreadyRunning: boolean,
  //   dataFields?: { [key: string]: string | number | boolean }
  // ): void;
  // trackInAppOpen(messageId: string, location: number): void;
  // trackInAppClick(
  //   messageId: string,
  //   location: number,
  //   clickedUrl: string
  // ): void;
  // trackInAppClose(
  //   messageId: string,
  //   location: number,
  //   source: number,
  //   clickedUrl?: string
  // ): void;
  // inAppConsume(messageId: string, location: number, source: number): void;

  // // Commerce
  // updateCart(items: { [key: string]: string | number | boolean }[]): void;
  // trackPurchase(
  //   total: number,
  //   items: { [key: string]: string | number | boolean }[],
  //   dataFields?: { [key: string]: string | number | boolean }
  // ): void;

  // // User data
  // updateUser(
  //   dataFields: { [key: string]: string | number | boolean },
  //   mergeNestedObjects: boolean
  // ): void;
  // updateEmail(email: string, authToken?: string): void;

  // // Attribution
  // getAttributionInfo(): Promise<{
  //   [key: string]: string | number | boolean;
  // } | null>;
  // setAttributionInfo(
  //   dict: { [key: string]: string | number | boolean } | null
  // ): void;

  // // Device management
  // disableDeviceForCurrentUser(): void;
  // getLastPushPayload(): Promise<{
  //   [key: string]: string | number | boolean;
  // } | null>;

  // // Content
  // getHtmlInAppContentForMessage(
  //   messageId: string
  // ): Promise<{ [key: string]: string | number | boolean }>;

  // // App links
  // handleAppLink(appLink: string): Promise<boolean>;

  // // Subscriptions
  // updateSubscriptions(
  //   emailListIds: number[] | null,
  //   unsubscribedChannelIds: number[] | null,
  //   unsubscribedMessageTypeIds: number[] | null,
  //   subscribedMessageTypeIds: number[] | null,
  //   campaignId: number,
  //   templateId: number
  // ): void;

  // // Session tracking
  // startSession(
  //   visibleRows: { [key: string]: string | number | boolean }[]
  // ): void;
  // endSession(): void;
  // updateVisibleRows(
  //   visibleRows: { [key: string]: string | number | boolean }[]
  // ): void;

  // // Auth
  // passAlongAuthToken(authToken: string | null): void;

  // // Wake app -- android only
  // wakeApp(): void;

  // // If your module will emit events, include the required listener stubs:
  // addListener(eventName: string): void;
  // removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNIterableAPI');
