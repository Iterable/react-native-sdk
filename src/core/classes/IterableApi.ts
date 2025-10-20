import { Platform } from 'react-native';

import RNIterableAPI from '../../api';
import type { IterableHtmlInAppContent } from '../../inApp/classes/IterableHtmlInAppContent';
import type { IterableInAppMessage } from '../../inApp/classes/IterableInAppMessage';
import type { IterableInAppCloseSource } from '../../inApp/enums/IterableInAppCloseSource';
import type { IterableInAppDeleteSource } from '../../inApp/enums/IterableInAppDeleteSource';
import type { IterableInAppLocation } from '../../inApp/enums/IterableInAppLocation';
import type { IterableInAppShowResponse } from '../../inApp/enums/IterableInAppShowResponse';
import type { IterableInboxImpressionRowInfo } from '../../inbox/types/IterableInboxImpressionRowInfo';
import type { IterableGenerateJwtTokenArgs } from '../types/IterableGenerateJwtTokenArgs';
import { IterableAttributionInfo } from './IterableAttributionInfo';
import type { IterableCommerceItem } from './IterableCommerceItem';
import { IterableConfig } from './IterableConfig';
import { IterableLogger } from './IterableLogger';

/**
 * Contains functions that directly interact with the native layer.
 */
export class IterableApi {
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
    {
      config = new IterableConfig(),
      version,
    }: {
      config: IterableConfig;
      version: string;
    }
  ): Promise<boolean> {
    IterableLogger.log('initializeWithApiKey: ', apiKey);
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
    {
      config = new IterableConfig(),
      version,
      apiEndPoint,
    }: {
      config: IterableConfig;
      version: string;
      apiEndPoint: string;
    }
  ): Promise<boolean> {
    IterableLogger.log('initialize2WithApiKey: ', apiKey);
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
    IterableLogger.log('setEmail: ', email);
    return RNIterableAPI.setEmail(email, authToken);
  }

  /**
   * Get the email associated with the current user.
   *
   * @returns The email associated with the current user
   */
  static getEmail() {
    IterableLogger.log('getEmail');
    return RNIterableAPI.getEmail();
  }

  /**
   * Associate the current user with the passed in `userId` parameter.
   *
   * WARNING: specify a user by calling `Iterable.setEmail` or
   * `Iterable.setUserId`, but **NOT** both.
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
    IterableLogger.log('setUserId: ', userId);
    return RNIterableAPI.setUserId(userId, authToken);
  }

  /**
   * Get the `userId` associated with the current user.
   */
  static getUserId() {
    IterableLogger.log('getUserId');
    return RNIterableAPI.getUserId();
  }

  /**
   * Disable the device for the current user.
   */
  static disableDeviceForCurrentUser() {
    IterableLogger.log('disableDeviceForCurrentUser');
    return RNIterableAPI.disableDeviceForCurrentUser();
  }

  /**
   * Save data to the current user's Iterable profile.
   *
   * @param dataFields - The data fields to update
   * @param mergeNestedObjects - Whether to merge nested objects
   */
  static updateUser(dataFields: unknown, mergeNestedObjects: boolean) {
    IterableLogger.log('updateUser: ', dataFields, mergeNestedObjects);
    return RNIterableAPI.updateUser(dataFields, mergeNestedObjects);
  }

  /**
   * Change the value of the email field on the current user's Iterable profile.
   *
   * @param email - The new email to set
   * @param authToken - The new auth token (JWT) to set with the new email, optional - If null/undefined, no JWT-related action will be taken
   */
  static updateEmail(email: string, authToken?: string | null) {
    IterableLogger.log('updateEmail: ', email, authToken);
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
  static trackPushOpenWithCampaignId({
    campaignId,
    templateId,
    messageId,
    appAlreadyRunning,
    dataFields,
  }: {
    campaignId: number;
    templateId: number;
    messageId: string | null | undefined;
    appAlreadyRunning: boolean;
    dataFields?: unknown;
  }) {
    IterableLogger.log(
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
  static trackPurchase({
    total,
    items,
    dataFields,
  }: {
    total: number;
    items: IterableCommerceItem[];
    dataFields?: unknown;
  }) {
    IterableLogger.log('trackPurchase: ', total, items, dataFields);
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
  static trackInAppOpen({
    message,
    location,
  }: {
    message: IterableInAppMessage;
    location: IterableInAppLocation;
  }) {
    IterableLogger.log('trackInAppOpen: ', message, location);
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
  static trackInAppClick({
    message,
    location,
    clickedUrl,
  }: {
    message: IterableInAppMessage;
    location: IterableInAppLocation;
    clickedUrl: string;
  }) {
    IterableLogger.log('trackInAppClick: ', message, location, clickedUrl);
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
  static trackInAppClose({
    message,
    location,
    source,
    clickedUrl,
  }: {
    message: IterableInAppMessage;
    location: IterableInAppLocation;
    source: IterableInAppCloseSource;
    clickedUrl?: string;
  }) {
    IterableLogger.log(
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
  static trackEvent({
    name,
    dataFields,
  }: {
    name: string;
    dataFields?: unknown;
  }) {
    IterableLogger.log('trackEvent: ', name, dataFields);
    return RNIterableAPI.trackEvent(name, dataFields);
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
    IterableLogger.log('pauseAuthRetries: ', pauseRetry);
    return RNIterableAPI.pauseAuthRetries(pauseRetry);
  }

  /**
   * Pass along an auth token to the SDK.
   *
   * @param authToken - The auth token to pass along
   */
  static passAlongAuthToken(authToken: string | null | undefined) {
    IterableLogger.log('passAlongAuthToken: ', authToken);
    return RNIterableAPI.passAlongAuthToken(authToken);
  }

  /**
   * Generate a JWT token for the current user.
   *
   * @param opts - The options for generating a JWT token
   * @returns A Promise that resolves to the generated JWT token
   */
  static generateJwtToken(opts: IterableGenerateJwtTokenArgs): Promise<string> {
    IterableLogger.log('generateJwtToken: ', opts);
    return RNIterableAPI.generateJwtToken(opts);
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
    IterableLogger.log('inAppConsume: ', message, location, source);
    return RNIterableAPI.inAppConsume(message.messageId, location, source);
  }

  /**
   * Retrieve the current user's list of in-app messages stored in the local queue.
   *
   * @returns A Promise that resolves to an array of in-app messages.
   */
  static getInAppMessages(): Promise<IterableInAppMessage[]> {
    IterableLogger.log('getInAppMessages');
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
    IterableLogger.log('getInboxMessages');
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
    IterableLogger.log('showMessage: ', messageId, consume);
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
    IterableLogger.log('removeMessage: ', messageId, location, source);
    return RNIterableAPI.removeMessage(messageId, location, source);
  }

  /**
   * Set the read status of the specified message.
   *
   * @param messageId - The message to set the read status of.
   * @param read - Whether the message is read.
   */
  static setReadForMessage(messageId: string, read: boolean): void {
    IterableLogger.log('setReadForMessage: ', messageId, read);
    return RNIterableAPI.setReadForMessage(messageId, read);
  }

  /**
   * Pause or unpause the automatic display of incoming in-app messages
   *
   * @param autoDisplayPaused - Whether to pause or unpause the automatic display of incoming in-app messages
   */
  static setAutoDisplayPaused(autoDisplayPaused: boolean): void {
    IterableLogger.log('setAutoDisplayPaused: ', autoDisplayPaused);
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
    IterableLogger.log('getHtmlInAppContentForMessage: ', messageId);
    return RNIterableAPI.getHtmlInAppContentForMessage(messageId);
  }

  /**
   * Set the response to an in-app message.
   *
   * @param inAppShowResponse - The response to an in-app message.
   */
  static setInAppShowResponse(inAppShowResponse: IterableInAppShowResponse) {
    IterableLogger.log('setInAppShowResponse: ', inAppShowResponse);
    return RNIterableAPI.setInAppShowResponse(inAppShowResponse);
  }

  /**
   * Start a session.
   *
   * @param visibleRows - The visible rows.
   */
  static startSession(visibleRows: IterableInboxImpressionRowInfo[]) {
    IterableLogger.log('startSession: ', visibleRows);
    return RNIterableAPI.startSession(visibleRows);
  }

  /**
   * End a session.
   */
  static endSession() {
    IterableLogger.log('endSession');
    return RNIterableAPI.endSession();
  }

  /**
   * Update the visible rows.
   *
   * @param visibleRows - The visible rows.
   */
  static updateVisibleRows(visibleRows: IterableInboxImpressionRowInfo[] = []) {
    IterableLogger.log('updateVisibleRows: ', visibleRows);
    return RNIterableAPI.updateVisibleRows(visibleRows);
  }

  // ---- End IN-APP ---- //

  // ====================================================== //
  // ======================== MISC ======================== //
  // ====================================================== //

  /**
   * Update the cart.
   *
   * @param items - The items.
   */
  static updateCart(items: IterableCommerceItem[]) {
    IterableLogger.log('updateCart: ', items);
    return RNIterableAPI.updateCart(items);
  }

  /**
   * Wake the app.
   * ANDROID ONLY
   */
  static wakeApp() {
    if (Platform.OS === 'android') {
      IterableLogger.log('wakeApp');
      return RNIterableAPI.wakeApp();
    }
  }

  /**
   * Handle an app link -- this is used to handle deep links.
   *
   * @param link - The link.
   */
  static handleAppLink(link: string) {
    IterableLogger.log('handleAppLink: ', link);
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
  static updateSubscriptions({
    emailListIds,
    unsubscribedChannelIds,
    unsubscribedMessageTypeIds,
    subscribedMessageTypeIds,
    campaignId,
    templateId,
  }: {
    emailListIds: number[] | null;
    unsubscribedChannelIds: number[] | null;
    unsubscribedMessageTypeIds: number[] | null;
    subscribedMessageTypeIds: number[] | null;
    campaignId: number;
    templateId: number;
  }) {
    IterableLogger.log(
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
    IterableLogger.log('getLastPushPayload');
    return RNIterableAPI.getLastPushPayload();
  }

  /**
   * Get the attribution info.
   */
  static getAttributionInfo() {
    IterableLogger.log('getAttributionInfo');
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
  static setAttributionInfo(attributionInfo?: IterableAttributionInfo) {
    IterableLogger.log('setAttributionInfo: ', attributionInfo);
    return RNIterableAPI.setAttributionInfo(attributionInfo);
  }

  // ---- End MOSC ---- //
}
