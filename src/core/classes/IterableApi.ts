import { Platform } from 'react-native';

import RNIterableAPI from '../../api';
import { IterableConfig } from './IterableConfig';
import type { IterableLogger } from './IterableLogger';
import { defaultLogger } from '../constants/defaults';
import { IterableAttributionInfo } from './IterableAttributionInfo';
import type { IterableCommerceItem } from './IterableCommerceItem';
import type { IterableInAppMessage } from '../../inApp/classes/IterableInAppMessage';
import type { IterableInAppLocation } from '../../inApp/enums/IterableInAppLocation';
import type { IterableInAppCloseSource } from '../../inApp/enums/IterableInAppCloseSource';
import type { IterableInAppDeleteSource } from '../../inApp/enums/IterableInAppDeleteSource';
import type { IterableHtmlInAppContent } from '../../inApp/classes/IterableHtmlInAppContent';
import type { IterableInAppShowResponse } from '../../inApp/enums/IterableInAppShowResponse';

export class IterableApi {
  static logger: IterableLogger = defaultLogger;

  constructor(logger: IterableLogger = defaultLogger) {
    IterableApi.logger = logger;
  }

  static setLogger(logger: IterableLogger) {
    IterableApi.logger = logger;
  }

  static initializeWithApiKey(
    apiKey: string,
    config: IterableConfig = new IterableConfig(),
    version: string
  ): Promise<boolean> {
    IterableApi.logger.log('initializeWithApiKey: ', apiKey);
    return RNIterableAPI.initializeWithApiKey(apiKey, config.toDict(), version);
  }

  static initialize2WithApiKey(
    apiKey: string,
    config: IterableConfig = new IterableConfig(),
    version: string,
    apiEndPoint: string
  ): Promise<boolean> {
    IterableApi.logger.log('initialize2WithApiKey: ', apiKey);
    return RNIterableAPI.initialize2WithApiKey(
      apiKey,
      config.toDict(),
      version,
      apiEndPoint
    );
  }

  static setEmail(email: string | null, authToken?: string | null) {
    IterableApi.logger.log('setEmail: ', email);
    return RNIterableAPI.setEmail(email, authToken);
  }

  static getEmail() {
    IterableApi.logger.log('getEmail');
    return RNIterableAPI.getEmail();
  }

  static setUserId(
    userId: string | null | undefined,
    authToken?: string | null
  ) {
    IterableApi.logger.log('setUserId: ', userId);
    return RNIterableAPI.setUserId(userId, authToken);
  }

  static getUserId() {
    IterableApi.logger.log('getUserId');
    return RNIterableAPI.getUserId();
  }

  static disableDeviceForCurrentUser() {
    IterableApi.logger.log('disableDeviceForCurrentUser');
    return RNIterableAPI.disableDeviceForCurrentUser();
  }

  static getLastPushPayload() {
    IterableApi.logger.log('getLastPushPayload');
    return RNIterableAPI.getLastPushPayload();
  }

  static getAttributionInfo() {
    IterableApi.logger.log('getAttributionInfo');
    // FIXME: What if this errors?
    return RNIterableAPI.getAttributionInfo().then(
      (
        dict: {
          campaignId: number;
          templateId: number;
          messageId: string;
        } | null
      ) => {
        if (dict) {
          return new IterableAttributionInfo(
            dict.campaignId as number,
            dict.templateId as number,
            dict.messageId as string
          );
        } else {
          return undefined;
        }
      }
    );
  }

  static setAttributionInfo(attributionInfo: IterableAttributionInfo) {
    IterableApi.logger.log('setAttributionInfo: ', attributionInfo);
    return RNIterableAPI.setAttributionInfo(attributionInfo);
  }

  static trackPushOpenWithCampaignId(
    campaignId: number,
    templateId: number,
    messageId: string | null | undefined,
    appAlreadyRunning: boolean,
    dataFields?: unknown
  ) {
    IterableApi.logger.log(
      'trackPushOpenWithCampaignId: ',
      campaignId,
      templateId,
      messageId,
      appAlreadyRunning,
      dataFields
    );
    return RNIterableAPI.trackPushOpenWithCampaignId(
      campaignId,
      templateId,
      messageId,
      appAlreadyRunning,
      dataFields
    );
  }

  static updateCart(items: IterableCommerceItem[]) {
    IterableApi.logger.log('updateCart: ', items);
    return RNIterableAPI.updateCart(items);
  }

  static wakeApp() {
    if (Platform.OS === 'android') {
      IterableApi.logger.log('wakeApp');
      return RNIterableAPI.wakeApp();
    }
  }

  static trackPurchase(
    total: number,
    items: IterableCommerceItem[],
    dataFields?: unknown
  ) {
    IterableApi.logger.log('trackPurchase: ', total, items, dataFields);
    return RNIterableAPI.trackPurchase(total, items, dataFields);
  }

  static trackInAppOpen(
    message: IterableInAppMessage,
    location: IterableInAppLocation
  ) {
    IterableApi.logger.log('trackInAppOpen: ', message, location);
    return RNIterableAPI.trackInAppOpen(message.messageId, location);
  }

  static trackInAppClick(
    message: IterableInAppMessage,
    location: IterableInAppLocation,
    clickedUrl: string
  ) {
    IterableApi.logger.log('trackInAppClick: ', message, location, clickedUrl);
    return RNIterableAPI.trackInAppClick(
      message.messageId,
      location,
      clickedUrl
    );
  }

  static trackInAppClose(
    message: IterableInAppMessage,
    location: IterableInAppLocation,
    source: IterableInAppCloseSource,
    clickedUrl?: string
  ) {
    IterableApi.logger.log(
      'trackInAppClose: ',
      message,
      location,
      source,
      clickedUrl
    );
    return RNIterableAPI.trackInAppClose(
      message.messageId,
      location,
      source,
      clickedUrl
    );
  }

  static inAppConsume(
    message: IterableInAppMessage,
    location: IterableInAppLocation,
    source: IterableInAppDeleteSource
  ) {
    IterableApi.logger.log('inAppConsume: ', message, location, source);
    return RNIterableAPI.inAppConsume(message.messageId, location, source);
  }

  static trackEvent(name: string, dataFields?: unknown) {
    IterableApi.logger.log('trackEvent: ', name, dataFields);
    return RNIterableAPI.trackEvent(name, dataFields);
  }

  static updateUser(dataFields: unknown, mergeNestedObjects: boolean) {
    IterableApi.logger.log('updateUser: ', dataFields, mergeNestedObjects);
    return RNIterableAPI.updateUser(dataFields, mergeNestedObjects);
  }

  static updateEmail(email: string, authToken?: string | null) {
    IterableApi.logger.log('updateEmail: ', email, authToken);
    return RNIterableAPI.updateEmail(email, authToken);
  }

  static handleAppLink(link: string) {
    IterableApi.logger.log('handleAppLink: ', link);
    return RNIterableAPI.handleAppLink(link);
  }

  static updateSubscriptions(
    emailListIds: number[] | null,
    unsubscribedChannelIds: number[] | null,
    unsubscribedMessageTypeIds: number[] | null,
    subscribedMessageTypeIds: number[] | null,
    campaignId: number,
    templateId: number
  ) {
    IterableApi.logger.log(
      'updateSubscriptions: ',
      emailListIds,
      unsubscribedChannelIds,
      unsubscribedMessageTypeIds,
      subscribedMessageTypeIds,
      campaignId,
      templateId
    );
    return RNIterableAPI.updateSubscriptions(
      emailListIds,
      unsubscribedChannelIds,
      unsubscribedMessageTypeIds,
      subscribedMessageTypeIds,
      campaignId,
      templateId
    );
  }

  static pauseAuthRetries(pauseRetry: boolean) {
    IterableApi.logger.log('pauseAuthRetries: ', pauseRetry);
    return RNIterableAPI.pauseAuthRetries(pauseRetry);
  }

  static getInAppMessages(): Promise<IterableInAppMessage[]> {
    IterableApi.logger.log('getInAppMessages');
    return RNIterableAPI.getInAppMessages() as unknown as Promise<
      IterableInAppMessage[]
    >;
  }

  static getInboxMessages(): Promise<IterableInAppMessage[]> {
    IterableApi.logger.log('getInboxMessages');
    return RNIterableAPI.getInboxMessages() as unknown as Promise<
      IterableInAppMessage[]
    >;
  }

  static showMessage(
    messageId: string,
    consume: boolean
  ): Promise<string | null> {
    IterableApi.logger.log('showMessage: ', messageId, consume);
    return RNIterableAPI.showMessage(messageId, consume);
  }

  static removeMessage(
    messageId: string,
    location: number,
    source: number
  ): void {
    IterableApi.logger.log('removeMessage: ', messageId, location, source);
    return RNIterableAPI.removeMessage(messageId, location, source);
  }

  static setReadForMessage(messageId: string, read: boolean): void {
    IterableApi.logger.log('setReadForMessage: ', messageId, read);
    return RNIterableAPI.setReadForMessage(messageId, read);
  }

  static setAutoDisplayPaused(autoDisplayPaused: boolean): void {
    IterableApi.logger.log('setAutoDisplayPaused: ', autoDisplayPaused);
    return RNIterableAPI.setAutoDisplayPaused(autoDisplayPaused);
  }

  static getHtmlInAppContentForMessage(
    messageId: string
  ): Promise<IterableHtmlInAppContent> {
    IterableApi.logger.log('getHtmlInAppContentForMessage: ', messageId);
    return RNIterableAPI.getHtmlInAppContentForMessage(messageId);
  }

  static getHtmlInAppContentForMessageId(
    messageId: string
  ): Promise<IterableHtmlInAppContent> {
    IterableApi.logger.log('getHtmlInAppContentForMessageId: ', messageId);
    return RNIterableAPI.getHtmlInAppContentForMessage(messageId);
  }

  static setMessageAsRead(messageId: string, read: boolean): void {
    IterableApi.logger.log('setMessageAsRead: ', messageId, read);
    return RNIterableAPI.setReadForMessage(messageId, read);
  }

  static deleteItemById(
    messageId: string,
    location: number,
    source: number
  ): void {
    IterableApi.logger.log('deleteItemById: ', messageId, location, source);
    return RNIterableAPI.removeMessage(messageId, location, source);
  }

  static setInAppShowResponse(inAppShowResponse: IterableInAppShowResponse) {
    IterableApi.logger.log('setInAppShowResponse: ', inAppShowResponse);
    return RNIterableAPI.setInAppShowResponse(inAppShowResponse);
  }

  static passAlongAuthToken(authToken: string | null | undefined) {
    IterableApi.logger.log('passAlongAuthToken: ', authToken);
    return RNIterableAPI.passAlongAuthToken(authToken);
  }
}
