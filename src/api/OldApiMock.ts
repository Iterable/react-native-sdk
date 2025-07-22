export interface IterableConfigDict {
  pushIntegrationName?: string;
  autoPushRegistration?: boolean;
  inAppDisplayInterval?: number;
  urlHandlerPresent: boolean;
  customActionHandlerPresent: boolean;
  inAppHandlerPresent: boolean;
  authHandlerPresent: boolean;
  expiringAuthTokenRefreshPeriod?: number;
  allowedProtocols?: string[];
  androidSdkUseInMemoryStorageForInApps?: boolean;
  useInMemoryStorageForInApps?: boolean;
  encryptionEnforced?: boolean;
  logLevel?: string;
  dataRegion?: string;
  pushPlatform?: string;
}

export class OldApiMock {


  static initalizeWithApiKey(
    apiKey: string,
    config: IterableConfigDict,
    version: string
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  static initialize2WithApiKey(
    apiKey: string,
    config: IterableConfigDict,
    apiEndPointOverride: string,
    version: string
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  static setEmail(email: string | null, authToken?: string | null) {
  }

  static getEmail(): Promise<string | null> {
    return Promise.resolve(null);
  }

  static setUserId(userId: string | null, authToken?: string | null) {
  }

  static getUserId(): Promise<string | null> {
    return Promise.resolve(null);
  }

  static setInAppShowResponse(number: number) {
  }

  static getInAppMessages(): Promise<{ [key: string]: string | number | boolean }[]> {
    return Promise.resolve([]);
  }

  static getInboxMessages(): Promise<{ [key: string]: string | number | boolean }[]> {
    return Promise.resolve([]);
  }

  static getUnreadInboxMessagesCount(): Promise<number> {
    return Promise.resolve(0);
  }

  static showMessage(messageId: string, consume: boolean): Promise<string | null> {
    return Promise.resolve(null);
  }

  static removeMessage(messageId: string, location: number, source: number) {
  }

  static setReadForMessage(messageId: string, read: boolean) {
  }

  static setAutoDisplayPaused(autoDisplayPaused: boolean) {
  }

  static trackEvent(name: string, dataFields?: { [key: string]: string | number | boolean }) {
  }


  static trackPushOpenWithCampaignId(
    campaignId: number,
    templateId: number | null,
    messageId: string,
    appAlreadyRunning: boolean,
    dataFields?: { [key: string]: string | number | boolean }
  ) {
  }

  static trackInAppOpen(messageId: string, location: number) {
  }

  static trackInAppClick(messageId: string, location: number, clickedUrl: string) {
  }

  static trackInAppClose(messageId: string, location: number, source: number, clickedUrl?: string) {
  }

  static inAppConsume(messageId: string, location: number, source: number) {
  }

  static updateCart(items: { [key: string]: string | number | boolean }[]) {
  }

  static trackPurchase(total: number, items: { [key: string]: string | number | boolean }[], dataFields?: { [key: string]: string | number | boolean }) {
  }

  static updateUser(dataFields: { [key: string]: string | number | boolean }, mergeNestedObjects: boolean) {
  }

  static updateEmail(email: string, authToken?: string) {
  }

  static getAttributionInfo(): Promise<{ [key: string]: string | number | boolean } | null> {
    return Promise.resolve(null);
  }

  static setAttributionInfo(dict: { [key: string]: string | number | boolean } | null) {
  }

  static disableDeviceForCurrentUser() {
  }

  static getLastPushPayload(): Promise<{ [key: string]: string | number | boolean } | null> {
    return Promise.resolve(null);
  }

  static getHtmlInAppContentForMessage(messageId: string): Promise<{ [key: string]: string | number | boolean }> {
    return Promise.resolve({});
  }

  static handleAppLink(appLink: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  static updateSubscriptions(emailListIds: number[] | null, unsubscribedChannelIds: number[] | null, unsubscribedMessageTypeIds: number[] | null, subscribedMessageTypeIds: number[] | null, campaignId: number, templateId: number) {
  }

  static startSession(visibleRows: { [key: string]: string | number | boolean }[]) {
  }

  static endSession() {
  }

  static updateVisibleRows(visibleRows: { [key: string]: string | number | boolean }[]) {
  }

  static passAlongAuthToken(authToken: string | null) {
  }

  static wakeApp(): void {
  }
}
