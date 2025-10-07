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
import type { IterableInboxImpressionRowInfo } from '../../inbox/types/IterableInboxImpressionRowInfo';
import type { IterableEmbeddedSession } from '../../embedded/classes/IterableEmbeddedSession';

export class IterableApi {
  static logger: IterableLogger = defaultLogger;

  constructor(logger: IterableLogger = defaultLogger) {
    IterableApi.logger = logger;
  }

  /**
   * Set the logger for IterableApi.
   * @param logger - The logger to set
   */
  static setLogger(logger: IterableLogger) {
    IterableApi.logger = logger;
  }

  // ====================================================== //
  // ===================== INITIALIZE ===================== //
  // ====================================================== //

  /**
   * Initializes the Iterable React Native SDK in your app's Javascript or Typescript code.
   *
   * @param apiKey - The [*mobile* API
   * key](https://support.iterable.com/hc/en-us/articles/360043464871-API-Keys)
   * for your application
   * @param config - Configuration object for the SDK
   * @param version - Version of the SDK, derived from the package.json file
   */
  static initializeWithApiKey(
    apiKey: string,
    config: IterableConfig = new IterableConfig(),
    version: string
  ): Promise<boolean> {
    IterableApi.logger.log('initializeWithApiKey: ', apiKey);
    return RNIterableAPI.initializeWithApiKey(apiKey, config.toDict(), version);
  }

  /**
   * DO NOT CALL THIS METHOD.
   * This method is used internally to connect to staging environment.
   *
   * @internal
   */
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

  // ---- End INITIALIZE ---- //

  // ====================================================== //
  // ===================== USER MANAGEMENT ================ //
  // ====================================================== //

  /**
   * Associate the current user with the passed in email parameter.
   *
   * @param email - Email address to associate with
   * the current user
   * @param authToken - Valid, pre-fetched JWT the SDK
   * can use to authenticate API requests, optional - If null/undefined, no JWT
   * related action will be taken
   */
  static setEmail(email: string | null, authToken?: string | null) {
    IterableApi.logger.log('setEmail: ', email);
    return RNIterableAPI.setEmail(email, authToken);
  }

  /**
   * Get the email associated with the current user.
   *
   * @returns The email associated with the current user
   */
  static getEmail() {
    IterableApi.logger.log('getEmail');
    return RNIterableAPI.getEmail();
  }

  /**
   * Associate the current user with the passed in `userId` parameter.
   *
   * WARNING: specify a user by calling `IterableApi.setEmail` or
   * `IterableApi.setUserId`, but **NOT** both.
   *
   * @param userId - User ID to associate with the current user
   * @param authToken - Valid, pre-fetched JWT the SDK
   * can use to authenticate API requests, optional - If null/undefined, no JWT
   * related action will be taken
   */
  static setUserId(
    userId: string | null | undefined,
    authToken?: string | null
  ) {
    IterableApi.logger.log('setUserId: ', userId);
    return RNIterableAPI.setUserId(userId, authToken);
  }

  /**
   * Get the `userId` associated with the current user.
   */
  static getUserId() {
    IterableApi.logger.log('getUserId');
    return RNIterableAPI.getUserId();
  }

  /**
   * Disable the device for the current user.
   */
  static disableDeviceForCurrentUser() {
    IterableApi.logger.log('disableDeviceForCurrentUser');
    return RNIterableAPI.disableDeviceForCurrentUser();
  }

  /**
   * Save data to the current user's Iterable profile.
   *
   * @param dataFields - The data fields to update
   * @param mergeNestedObjects - Whether to merge nested objects
   */
  static updateUser(dataFields: unknown, mergeNestedObjects: boolean) {
    IterableApi.logger.log('updateUser: ', dataFields, mergeNestedObjects);
    return RNIterableAPI.updateUser(dataFields, mergeNestedObjects);
  }

  /**
   * Change the value of the email field on the current user's Iterable profile.
   *
   * @param email - The new email to set
   * @param authToken - The new auth token (JWT) to set with the new email, optional - If null/undefined, no JWT-related action will be taken
   */
  static updateEmail(email: string, authToken?: string | null) {
    IterableApi.logger.log('updateEmail: ', email, authToken);
    return RNIterableAPI.updateEmail(email, authToken);
  }

  // ---- End USER MANAGEMENT ---- //

  // ====================================================== //
  // ===================== TRACKING ====================== //
  // ====================================================== //

  /**
   * Create a `pushOpen` event on the current user's Iterable profile, populating
   * it with data provided to the method call.
   *
   * @param campaignId - The campaign ID
   * @param templateId - The template ID
   * @param messageId - The message ID
   * @param appAlreadyRunning - Whether the app is already running
   * @param dataFields - The data fields to track
   */
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

  /**
   * Create a `purchase` event on the current user's Iterable profile, populating
   * it with data provided to the method call.
   *
   * @param total - The total cost of the purchase
   * @param items - The items included in the purchase
   * @param dataFields - The data fields to track
   */
  static trackPurchase(
    total: number,
    items: IterableCommerceItem[],
    dataFields?: unknown
  ) {
    IterableApi.logger.log('trackPurchase: ', total, items, dataFields);
    return RNIterableAPI.trackPurchase(total, items, dataFields);
  }

  /**
   * Create an `inAppOpen` event for the specified message on the current user's profile
   * for manual tracking purposes. Iterable's SDK automatically tracks in-app message opens when you use the
   * SDK's default rendering.
   *
   * @param message - The in-app message (an {@link IterableInAppMessage} object)
   * @param location - The location of the in-app message (an IterableInAppLocation enum)
   */
  static trackInAppOpen(
    message: IterableInAppMessage,
    location: IterableInAppLocation
  ) {
    IterableApi.logger.log('trackInAppOpen: ', message, location);
    return RNIterableAPI.trackInAppOpen(message.messageId, location);
  }

  /**
   * Create an `inAppClick` event for the specified message on the current user's profile
   * for manual tracking purposes. Iterable's SDK automatically tracks in-app message clicks when you use the
   * SDK's default rendering. Click events refer to click events within the in-app message to distinguish
   * from `inAppOpen` events.
   *
   * @param message - The in-app message.
   * @param location - The location of the in-app message.
   * @param clickedUrl - The URL clicked by the user.
   */
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

  /**
   * Create an `inAppClose` event for the specified message on the current user's profile
   * for manual tracking purposes. Iterable's SDK automatically tracks in-app message close events when you use the
   * SDK's default rendering.
   *
   * @param message - The in-app message.
   * @param location - The location of the in-app message.
   * @param source - The way the in-app was closed.
   * @param clickedUrl - The URL clicked by the user.
   */
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

  /**
   * Create a custom event on the current user's Iterable profile, populating
   * it with data provided to the method call.
   *
   * @param name - The name of the event
   * @param dataFields - The data fields to track
   */
  static trackEvent(name: string, dataFields?: unknown) {
    IterableApi.logger.log('trackEvent: ', name, dataFields);
    return RNIterableAPI.trackEvent(name, dataFields);
  }

  /**
   * Track an embedded session.
   *
   * @param session - The session to track
   */
  static trackEmbeddedSession(session: IterableEmbeddedSession) {
    IterableApi.logger.log('trackEmbeddedSession: ', session);
    return RNIterableAPI.trackEmbeddedSession(session);
  }

  // ---- End TRACKING ---- //

  // ====================================================== //
  // ======================= AUTH ======================= //
  // ====================================================== //

  /**
   * Pause or resume the automatic retrying of authentication requests.
   *
   * @param pauseRetry - Whether to pause or resume the automatic retrying of authentication requests
   */
  static pauseAuthRetries(pauseRetry: boolean) {
    IterableApi.logger.log('pauseAuthRetries: ', pauseRetry);
    return RNIterableAPI.pauseAuthRetries(pauseRetry);
  }

  /**
   * Pass along an auth token to the SDK.
   *
   * @param authToken - The auth token to pass along
   */
  static passAlongAuthToken(authToken: string | null | undefined) {
    IterableApi.logger.log('passAlongAuthToken: ', authToken);
    return RNIterableAPI.passAlongAuthToken(authToken);
  }

  // ---- End AUTH ---- //

  // ====================================================== //
  // ======================= IN-APP ======================= //
  // ====================================================== //

  /**
   * Remove the specified message from the current user's message queue.
   *
   * @param message - The in-app message.
   * @param location - The location of the in-app message.
   * @param source - The way the in-app was consumed.
   */
  static inAppConsume(
    message: IterableInAppMessage,
    location: IterableInAppLocation,
    source: IterableInAppDeleteSource
  ) {
    IterableApi.logger.log('inAppConsume: ', message, location, source);
    return RNIterableAPI.inAppConsume(message.messageId, location, source);
  }

  /**
   * Retrieve the current user's list of in-app messages stored in the local queue.
   *
   * @returns A Promise that resolves to an array of in-app messages.
   */
  static getInAppMessages(): Promise<IterableInAppMessage[]> {
    IterableApi.logger.log('getInAppMessages');
    return RNIterableAPI.getInAppMessages() as unknown as Promise<
      IterableInAppMessage[]
    >;
  }

  /**
   * Retrieve the current user's list of in-app messages designated for the
   * mobile inbox and stored in the local queue.
   *
   * @returns A Promise that resolves to an array of messages marked as `saveToInbox`.
   */
  static getInboxMessages(): Promise<IterableInAppMessage[]> {
    IterableApi.logger.log('getInboxMessages');
    return RNIterableAPI.getInboxMessages() as unknown as Promise<
      IterableInAppMessage[]
    >;
  }

  /**
   * Renders an in-app message and consumes it from the user's message queue if necessary.
   *
   * If you skip showing an in-app message when it arrives, you can show it at
   * another time by calling this method.
   *
   * @param messageId - The message to show (an {@link IterableInAppMessage} object)
   * @param consume - Whether or not the message should be consumed from the user's message queue after being shown. This should be defaulted to true.
   */
  static showMessage(
    messageId: string,
    consume: boolean
  ): Promise<string | null> {
    IterableApi.logger.log('showMessage: ', messageId, consume);
    return RNIterableAPI.showMessage(messageId, consume);
  }

  /**
   * Remove the specified message from the current user's message queue.
   *
   * @param messageId - The message to remove.
   * @param location - The location of the message.
   * @param source - The way the message was removed.
   */
  static removeMessage(
    messageId: string,
    location: number,
    source: number
  ): void {
    IterableApi.logger.log('removeMessage: ', messageId, location, source);
    return RNIterableAPI.removeMessage(messageId, location, source);
  }

  /**
   * Set the read status of the specified message.
   *
   * @param messageId - The message to set the read status of.
   * @param read - Whether the message is read.
   */
  static setReadForMessage(messageId: string, read: boolean): void {
    IterableApi.logger.log('setReadForMessage: ', messageId, read);
    return RNIterableAPI.setReadForMessage(messageId, read);
  }

  /**
   * Pause or unpause the automatic display of incoming in-app messages
   *
   * @param autoDisplayPaused - Whether to pause or unpause the automatic display of incoming in-app messages
   */
  static setAutoDisplayPaused(autoDisplayPaused: boolean): void {
    IterableApi.logger.log('setAutoDisplayPaused: ', autoDisplayPaused);
    return RNIterableAPI.setAutoDisplayPaused(autoDisplayPaused);
  }

  /**
   * Retrieve HTML in-app content for a specified in-app message.
   *
   * @param messageId - The message from which to get HTML content.
   *
   * @returns A Promise that resolves to an {@link IterableHtmlInAppContent} object.
   */
  static getHtmlInAppContentForMessage(
    messageId: string
  ): Promise<IterableHtmlInAppContent> {
    IterableApi.logger.log('getHtmlInAppContentForMessage: ', messageId);
    return RNIterableAPI.getHtmlInAppContentForMessage(messageId);
  }

  /**
   * Set the response to an in-app message.
   *
   * @param inAppShowResponse - The response to an in-app message.
   */
  static setInAppShowResponse(inAppShowResponse: IterableInAppShowResponse) {
    IterableApi.logger.log('setInAppShowResponse: ', inAppShowResponse);
    return RNIterableAPI.setInAppShowResponse(inAppShowResponse);
  }

  /**
   * Start a session.
   *
   * @param visibleRows - The visible rows.
   */
  static startSession(visibleRows: IterableInboxImpressionRowInfo[]) {
    IterableApi.logger.log('startSession: ', visibleRows);
    return RNIterableAPI.startSession(visibleRows);
  }

  /**
   * End a session.
   */
  static endSession() {
    IterableApi.logger.log('endSession');
    return RNIterableAPI.endSession();
  }

  /**
   * Update the visible rows.
   *
   * @param visibleRows - The visible rows.
   */
  static updateVisibleRows(visibleRows: IterableInboxImpressionRowInfo[] = []) {
    IterableApi.logger.log('updateVisibleRows: ', visibleRows);
    return RNIterableAPI.updateVisibleRows(visibleRows);
  }

  // ---- End IN-APP ---- //

  // ====================================================== //
  // ======================= MOSC ======================= //
  // ====================================================== //

  /**
   * Update the cart.
   *
   * @param items - The items.
   */
  static updateCart(items: IterableCommerceItem[]) {
    IterableApi.logger.log('updateCart: ', items);
    return RNIterableAPI.updateCart(items);
  }

  /**
   * Wake the app.
   * ANDROID ONLY
   */
  static wakeApp() {
    if (Platform.OS === 'android') {
      IterableApi.logger.log('wakeApp');
      return RNIterableAPI.wakeApp();
    }
  }

  /**
   * Handle an app link -- this is used to handle deep links.
   *
   * @param link - The link.
   */
  static handleAppLink(link: string) {
    IterableApi.logger.log('handleAppLink: ', link);
    return RNIterableAPI.handleAppLink(link);
  }

  /**
   * Update the subscriptions.
   *
   * @param emailListIds - The email list IDs.
   * @param unsubscribedChannelIds - The unsubscribed channel IDs.
   * @param unsubscribedMessageTypeIds - The unsubscribed message type IDs.
   * @param subscribedMessageTypeIds - The subscribed message type IDs.
   * @param campaignId - The campaign ID.
   * @param templateId - The template ID.
   */
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

  /**
   * Get the last push payload.
   */
  static getLastPushPayload() {
    IterableApi.logger.log('getLastPushPayload');
    return RNIterableAPI.getLastPushPayload();
  }

  /**
   * Get the attribution info.
   */
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

  /**
   * Set the attribution info.
   *
   * @param attributionInfo - The attribution info.
   */
  static setAttributionInfo(attributionInfo: IterableAttributionInfo) {
    IterableApi.logger.log('setAttributionInfo: ', attributionInfo);
    return RNIterableAPI.setAttributionInfo(attributionInfo);
  }

  // ---- End MOSC ---- //
}
