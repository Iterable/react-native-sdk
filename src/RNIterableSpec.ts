import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  // MARK: - Native SDK Functions

  initializeWithApiKey(
    apiKey: string,
    config: object,
    version: string,
  ): Promise<void>;

  initialize2WithApiKey(
    apiKey: string,
    config: object,
    apiEndPointOverride: string,
    version: string,
  ): Promise<void>;

  setEmail(email: string | null, authToken: string | null): void;

  getEmail(): Promise<string | null>;

  setUserId(userId: string | null, authToken: string | null): void;

  getUserId(): Promise<string | null>;

  // MARK: - Iterable API Request Functions

  disableDeviceForCurrentUser(): void;

  setInAppShowResponse(inAppShowResponse: number): void;

  getLastPushPayload(): Promise<object | null>;

  getAttributionInfo(): Promise<object | null>;

  setAttributionInfo(attributionInfo: object | null): void;

  trackPushOpenWithCampaignId(
    campaignId: number,
    templateId: number,
    messageId: string,
    appAlreadyRunning: boolean,
    dataFields: object | null,
  ): void;

  updateCart(items: Array<object> | null): void;

  trackPurchase(
    total: number,
    items: Array<object> | null,
    dataFields: object | null,
  ): void;

  trackInAppOpen(
    messageId: string | null,
    location: number,
  ): void;

  trackInAppClick(
    messageId: string,
    location: number,
    clickedUrl: string,
  ): void;

  trackInAppClose(
    messageId: string,
    location: number,
    source: number,
    clickedUrl: string | null,
  ): void;

  inAppConsume(
    messageId: string,
    location: number,
    source: number,
  ): void;

  trackEvent(
    name: string,
    dataFields: object | null,
  ): void;

  updateUser(
    dataFields: object,
    mergeNestedObjects: boolean,
  ): void;

  updateEmail(
    email: string,
    authToken: string | null,
  ): void;

  handleAppLink(appLink: string): Promise<object | null>;

  updateSubscriptions(
    emailListIds: Array<number> | null,
    unsubscribedChannelIds: Array<number> | null,
    unsubscribedMessageTypeIds: Array<number> | null,
    subscribedMessageTypeIds: Array<number> | null,
    campaignId: number,
    templateId: number,
  ): void;

  // MARK: - SDK In-App Manager Functions

  getInAppMessages(): Promise<Array<object>>;

  getHtmlInAppContentForMessage(messageId: string): Promise<object | null>;

  getInboxMessages(): Promise<Array<object>>;

  getUnreadInboxMessagesCount(): Promise<number>;

  showMessage(
    messageId: string,
    consume: boolean,
  ): Promise<object | null>;

  removeMessage(
    messageId: string,
    location: number,
    source: number,
  ): void;

  setReadForMessage(
    messageId: string,
    read: boolean,
  ): void;

  setAutoDisplayPaused(paused: boolean): void;

  // MARK: - SDK Inbox Session Tracking Functions

  startSession(visibleRows: Array<object>): void;

  endSession(): void;

  updateVisibleRows(visibleRows: Array<object>): void;

  // MARK: - SDK Auth Manager Functions

  passAlongAuthToken(authToken: string | null): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNIterableAPI');
