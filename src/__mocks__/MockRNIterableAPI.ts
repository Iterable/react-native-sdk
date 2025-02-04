import { IterableAttributionInfo } from '../core';
import { IterableInAppMessage } from '../inApp';

export class MockRNIterableAPI {
  static email?: string;
  static userId?: string;
  static token?: string;
  static lastPushPayload?: unknown;
  static attributionInfo?: IterableAttributionInfo;
  static messages?: IterableInAppMessage[];
  static clickedUrl?: string;

  static async getEmail(): Promise<string | undefined> {
    return await new Promise((resolve) => {
      resolve(MockRNIterableAPI.email);
    });
  }

  static setEmail(email: string, authToken?: string): void {
    MockRNIterableAPI.email = email;
    MockRNIterableAPI.token = authToken;
  }

  static async getUserId(): Promise<string | undefined> {
    return await new Promise((resolve) => {
      resolve(MockRNIterableAPI.userId);
    });
  }

  static setUserId(userId: string, authToken?: string): void {
    MockRNIterableAPI.userId = userId;
    MockRNIterableAPI.token = authToken;
  }

  static disableDeviceForCurrentUser = jest.fn();

  static trackPushOpenWithCampaignId = jest.fn();

  static updateCart = jest.fn();

  static trackPurchase = jest.fn();

  static trackInAppOpen = jest.fn();

  static trackInAppClick = jest.fn();

  static trackInAppClose = jest.fn();

  static trackEvent = jest.fn();

  static async getLastPushPayload(): Promise<unknown | undefined> {
    return await new Promise((resolve) => {
      resolve(MockRNIterableAPI.lastPushPayload);
    });
  }

  static async getAttributionInfo(): Promise<
    IterableAttributionInfo | undefined
  > {
    return await new Promise((resolve) => {
      resolve(MockRNIterableAPI.attributionInfo);
    });
  }

  static setAttributionInfo(attributionInfo?: IterableAttributionInfo): void {
    MockRNIterableAPI.attributionInfo = attributionInfo;
  }

  static initializeWithApiKey = jest.fn();

  static setInAppShowResponse = jest.fn();

  static async getInAppMessages(): Promise<IterableInAppMessage[] | undefined> {
    return await new Promise((resolve) => {
      resolve(MockRNIterableAPI.messages);
    });
  }

  static setAutoDisplayPaused = jest.fn();

  static async showMessage(
    _message: IterableInAppMessage,
    _consume: boolean
  ): Promise<string | undefined> {
    return await new Promise((resolve) => {
      resolve(MockRNIterableAPI.clickedUrl);
    });
  }

  static removeMessage = jest.fn();

  static setReadForMessage = jest.fn();

  static inAppConsume = jest.fn();

  static updateUser = jest.fn();

  static updateEmail = jest.fn();

  static handleAppLink = jest.fn();

  static updateSubscriptions = jest.fn();

  // set messages function is to set the messages static property
  // this is for testing purposes only
  static setMessages(messages: IterableInAppMessage[]): void {
    MockRNIterableAPI.messages = messages;
  }

  // setClickedUrl function is to set the messages static property
  // this is for testing purposes only
  static setClickedUrl(clickedUrl: string): void {
    MockRNIterableAPI.clickedUrl = clickedUrl;
  }
}
