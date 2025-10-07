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
import { Platform } from 'react-native';

export class IterableApi {
  private logger: IterableLogger = defaultLogger;

  constructor(logger: IterableLogger = defaultLogger) {
    this.logger = logger;
  }

  public static getInstance(): IterableApi {
    return new IterableApi();
  }

  public initializeWithApiKey(
    apiKey: string,
    config: IterableConfig = new IterableConfig(),
    version: string
  ) {
    this.logger.log('initializeWithApiKey: ', apiKey);
    RNIterableAPI.initializeWithApiKey(apiKey, config.toDict(), version);
  }

  public initialize2WithApiKey(
    apiKey: string,
    config: IterableConfig = new IterableConfig(),
    version: string,
    apiEndPoint: string
  ) {
    this.logger.log('initialize2WithApiKey: ', apiKey);
    RNIterableAPI.initialize2WithApiKey(
      apiKey,
      config.toDict(),
      version,
      apiEndPoint
    );
  }

  public setEmail(email: string | null, authToken?: string | null) {
    this.logger.log('setEmail: ', email);
    RNIterableAPI.setEmail(email, authToken);
  }

  public getEmail() {
    this.logger.log('getEmail');
    return RNIterableAPI.getEmail();
  }

  public setUserId(userId: string | null, authToken?: string | null) {
    this.logger.log('setUserId: ', userId);
    RNIterableAPI.setUserId(userId, authToken);
  }

  public getUserId() {
    this.logger.log('getUserId');
    return RNIterableAPI.getUserId();
  }

  public disableDeviceForCurrentUser() {
    this.logger.log('disableDeviceForCurrentUser');
    RNIterableAPI.disableDeviceForCurrentUser();
  }

  public getLastPushPayload() {
    this.logger.log('getLastPushPayload');
    return RNIterableAPI.getLastPushPayload();
  }

  public getAttributionInfo() {
    this.logger.log('getAttributionInfo');
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

  public setAttributionInfo(attributionInfo: IterableAttributionInfo) {
    this.logger.log('setAttributionInfo: ', attributionInfo);
    RNIterableAPI.setAttributionInfo(attributionInfo);
  }

  public trackPushOpenWithCampaignId(
    campaignId: number,
    templateId: number,
    messageId: string | null,
    appAlreadyRunning: boolean,
    dataFields?: unknown
  ) {
    this.logger.log(
      'trackPushOpenWithCampaignId: ',
      campaignId,
      templateId,
      messageId,
      appAlreadyRunning,
      dataFields
    );
    RNIterableAPI.trackPushOpenWithCampaignId(
      campaignId,
      templateId,
      messageId,
      appAlreadyRunning,
      dataFields
    );
  }

  public updateCart(items: IterableCommerceItem[]) {
    this.logger.log('updateCart: ', items);
    RNIterableAPI.updateCart(items);
  }

  public wakeApp() {
    if (Platform.OS === 'android') {
      this.logger.log('wakeApp');
      RNIterableAPI.wakeApp();
    }
  }

  public trackPurchase(
    total: number,
    items: IterableCommerceItem[],
    dataFields?: unknown
  ) {
    this.logger.log('trackPurchase: ', total, items, dataFields);
    RNIterableAPI.trackPurchase(total, items, dataFields);
  }

  public trackInAppOpen(
    message: IterableInAppMessage,
    location: IterableInAppLocation
  ) {
    this.logger.log('trackInAppOpen: ', message, location);
    RNIterableAPI.trackInAppOpen(message.messageId, location);
  }

  public trackInAppClick(
    message: IterableInAppMessage,
    location: IterableInAppLocation,
    clickedUrl: string
  ) {
    this.logger.log('trackInAppClick: ', message, location, clickedUrl);
    RNIterableAPI.trackInAppClick(message.messageId, location, clickedUrl);
  }

  public trackInAppClose(
    message: IterableInAppMessage,
    location: IterableInAppLocation,
    source: IterableInAppCloseSource,
    clickedUrl?: string
  ) {
    this.logger.log('trackInAppClose: ', message, location, source, clickedUrl);
    RNIterableAPI.trackInAppClose(
      message.messageId,
      location,
      source,
      clickedUrl
    );
  }

  public inAppConsume(
    message: IterableInAppMessage,
    location: IterableInAppLocation,
    source: IterableInAppDeleteSource
  ) {
    this.logger.log('inAppConsume: ', message, location, source);
    RNIterableAPI.inAppConsume(message.messageId, location, source);
  }

  public trackEvent(name: string, dataFields?: unknown) {
    this.logger.log('trackEvent: ', name, dataFields);
    RNIterableAPI.trackEvent(name, dataFields);
  }

  public updateUser(dataFields: unknown, mergeNestedObjects: boolean) {
    this.logger.log('updateUser: ', dataFields, mergeNestedObjects);
    RNIterableAPI.updateUser(dataFields, mergeNestedObjects);
  }

  public updateEmail(email: string, authToken?: string | null) {
    this.logger.log('updateEmail: ', email, authToken);
    RNIterableAPI.updateEmail(email, authToken);
  }

  public handleAppLink(link: string) {
    this.logger.log('handleAppLink: ', link);
    RNIterableAPI.handleAppLink(link);
  }

  public updateSubscriptions(
    emailListIds: number[] | null,
    unsubscribedChannelIds: number[] | null,
    unsubscribedMessageTypeIds: number[] | null,
    subscribedMessageTypeIds: number[] | null,
    campaignId: number,
    templateId: number
  ) {
    this.logger.log(
      'updateSubscriptions: ',
      emailListIds,
      unsubscribedChannelIds,
      unsubscribedMessageTypeIds,
      subscribedMessageTypeIds,
      campaignId,
      templateId
    );
    RNIterableAPI.updateSubscriptions(
      emailListIds,
      unsubscribedChannelIds,
      unsubscribedMessageTypeIds,
      subscribedMessageTypeIds,
      campaignId,
      templateId
    );
  }

  public pauseAuthRetries(pauseRetry: boolean) {
    this.logger.log('pauseAuthRetries: ', pauseRetry);
    RNIterableAPI.pauseAuthRetries(pauseRetry);
  }
}
