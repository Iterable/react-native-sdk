import {
  Linking,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

import { buildInfo } from '../../itblBuildInfo';

// TODO: Organize these so that there are no circular dependencies
// See https://github.com/expo/expo/issues/35100
import { IterableInAppMessage } from '../../inApp/classes/IterableInAppMessage';
import { IterableInAppCloseSource } from '../../inApp/enums/IterableInAppCloseSource';
import { IterableInAppDeleteSource } from '../../inApp/enums/IterableInAppDeleteSource';
import { IterableInAppLocation } from '../../inApp/enums/IterableInAppLocation';
import { IterableAuthResponseResult, IterableEventName } from '../enums';

// Add this type-only import to avoid circular dependency
import type { IterableInAppManager } from '../../inApp/classes/IterableInAppManager';

import { IterableAction } from './IterableAction';
import { IterableActionContext } from './IterableActionContext';
import { IterableAttributionInfo } from './IterableAttributionInfo';
import { IterableAuthResponse } from './IterableAuthResponse';
import type { IterableCommerceItem } from './IterableCommerceItem';
import { IterableConfig } from './IterableConfig';
import { IterableLogger } from './IterableLogger';

const RNIterableAPI = NativeModules.RNIterableAPI;
const RNEventEmitter = new NativeEventEmitter(RNIterableAPI);

/* eslint-disable tsdoc/syntax */
/**
 * The main class for the Iterable React Native SDK.
 *
 * The majority of the high-level functionality can be accomplished through the
 * static methods of this class.  EG: initializing the SDK, logging in a user,
 * tracking purchases, etc.
 *
 * @example
 * // Initialize the SDK
 * Iterable.initialize(YOUR_API_KEY, new IterableConfig());
 *
 * // Log in a user
 * Iterable.setEmail('my.email@company.com');
 * // OR
 * Iterable.setUserId('myUserId');
 */
/* eslint-enable tsdoc/syntax */
export class Iterable {
  /**
   * Logger for the Iterable SDK
   * Log level is set with {@link IterableLogLevel}
   */
  static logger: IterableLogger = new IterableLogger(new IterableConfig());

  /**
   * Current configuration of the Iterable SDK
   */
  static savedConfig: IterableConfig = new IterableConfig();

  /**
   * In-app message manager for the current user.
   *
   * This property provides access to in-app message functionality including
   * retrieving messages, displaying messages, removing messages, and more.
   *
   * @example
   * ```typescript
   * // Get all in-app messages
   * Iterable.inAppManager.getMessages().then(messages => {
   *   console.log('Messages:', messages);
   * });
   *
   * // Show a specific message
   * Iterable.inAppManager.showMessage(message, true);
   * ```
   */
  static get inAppManager() {
    // Lazy initialization to avoid circular dependency
    if (!this._inAppManager) {
      // Import here to avoid circular dependency at module level
      // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
      const { IterableInAppManager } = require('../../inApp/classes/IterableInAppManager');
      this._inAppManager = new IterableInAppManager();
    }
    return this._inAppManager;
  }

  private static _inAppManager: IterableInAppManager | undefined;

  /**
   * Initializes the Iterable React Native SDK in your app's Javascript or Typescript code.
   *
   * Pass in a mobile API key distributed with the mobile app.
   * Warning: never user server-side API keys with the React Native SDK, mobile API keys have minimal access for security purposes.
   *
   * Pass in an `IterableConfig` object with the various customization properties setup.
   *
   * **WARNING**: Never use server-side API keys with Iterable's mobile SDKs.
   * Since API keys are, by necessity, distributed with the mobile apps that
   * contain them, bad actors can potentially access them. For this reason,
   * Iterable provides mobile API keys, which have minimal access.
   *
   * @param apiKey - The [*mobile* API
   * key](https://support.iterable.com/hc/en-us/articles/360043464871-API-Keys)
   * for your application
   * @param config - Configuration object for the SDK
   *
   * @example
   * Initializing the app could look like this:
   * ```typescript
   * // Create a new IterableConfig object
   * const config = new IterableConfig();
   *
   * // Set various properties on the config object
   * config.logLevel = IterableLogLevel.debug;
   *
   * // Initialize the SDK with the API key and config object
   * Iterable.initialize(API_KEY, config);
   * ```
   */
  static initialize(
    apiKey: string,
    config: IterableConfig = new IterableConfig()
  ): Promise<boolean> {
    Iterable.savedConfig = config;

    Iterable.logger = new IterableLogger(Iterable.savedConfig);

    Iterable?.logger?.log('initialize: ' + apiKey);

    this.setupEventHandlers();

    const version = this.getVersionFromPackageJson();

    return RNIterableAPI.initializeWithApiKey(apiKey, config.toDict(), version);
  }

  /**
   * DO NOT CALL THIS METHOD.
   * This method is used internally to connect to staging environment.
   *
   * @internal
   */
  static initialize2(
    apiKey: string,
    config: IterableConfig = new IterableConfig(),
    apiEndPoint: string
  ): Promise<boolean> {
    Iterable.savedConfig = config;

    Iterable.logger = new IterableLogger(Iterable.savedConfig);

    Iterable?.logger?.log('initialize2: ' + apiKey);

    this.setupEventHandlers();
    const version = this.getVersionFromPackageJson();

    return RNIterableAPI.initialize2WithApiKey(
      apiKey,
      config.toDict(),
      version,
      apiEndPoint
    );
  }

  /**
   * Associate the current user with the passed in email parameter.
   *
   * Note: specify a user by calling `Iterable.setEmail` or
   * `Iterable.setUserId`, but **NOT** both
   *
   * @remarks
   * Iterable's React Native SDK persists the user across app sessions and
   * restarts, until you manually change the user using `Iterable.setEmail` or
   * `Iterable.setUserId`.
   *
   * ## User profile creation:
   *
   * If your Iterable project does not have a user with the passed in email,
   * `setEmail` creates one and adds the email address to the user's Iterable
   * profile.
   *
   * ## Registering device token:
   *
   * If `IterableConfig.autoPushRegistration` is set to true, calling
   * `setEmail` automatically registers the device for push notifications and
   * sends the deviceId and token to Iterable.
   *
   * ## Optional JWT token parameter:
   *
   * An optional valid, pre-fetched JWT can be passed in to avoid race
   * conditions.  The SDK uses this JWT to authenticate API requests for this
   * user.
   *
   * ## Signing out a user from the SDK:
   *
   * To tell the SDK to sign out the current user, pass null into
   * `Iterable.setEmail`.  If IterableConfig.autoPushRegistration is set to
   * true, calling `Iterable.setEmail`(null) prevents Iterable from sending
   * further push notifications to that user, for that app, on that device.  On
   * the user's Iterable profile, `endpointEnabled` is set to false for the
   * device.
   *
   * @param email - Email address to associate with
   * the current user
   * @param authToken - Valid, pre-fetched JWT the SDK
   * can use to authenticate API requests, optional - If null/undefined, no JWT
   * related action will be taken
   *
   *  @example
   * ```typescript
   * Iterable.setEmail('my.user.name@gmail.com');
   * ```
   */
  static setEmail(email?: string | null, authToken?: string | null) {
    Iterable?.logger?.log('setEmail: ' + email);

    RNIterableAPI.setEmail(email, authToken);
  }

  /**
   * Get the email associated with the current user.
   *
   * @example
   * ```typescript
   * Iterable.getEmail().then((email) => {
   *  // Do something with the email
   * });
   * ```
   */
  static getEmail(): Promise<string | undefined> {
    Iterable?.logger?.log('getEmail');

    return RNIterableAPI.getEmail();
  }

  /**
   * Associate the current user with the passed in `userId` parameter.
   *
   * Note: specify a user by calling `Iterable.setEmail` or
   * `Iterable.setUserId`, but **NOT** both.
   *
   * @remarks
   * Iterable's React Native SDK persists the user across app sessions and
   * restarts, until you manually change the user using `Iterable.setEmail` or
   * `Iterable.setUserId`.
   *
   * ## User profile creation:
   *
   * If your Iterable project does not have a user with the passed in `UserId`,
   * `setUserId` creates one and adds a placeholder email address to the user's
   * Iterable profile.
   *
   * ## Registering device token:
   *
   * If `IterableConfig.autoPushRegistration` is set to `true`, calling
   * `setUserId` automatically registers the device for push notifications and
   * sends the `deviceId` and token to Iterable.
   *
   * ## Optional JWT token parameter:
   *
   * An optional valid, pre-fetched JWT can be passed in to avoid race
   * conditions.  The SDK uses this JWT to authenticate API requests for this
   * user.
   *
   * ## Signing out a user from the SDK:
   *
   * To tell the SDK to sign out the current user, pass null into
   * `Iterable.setUserId`.  If `IterableConfig.autoPushRegistration` is set to
   * true, calling `Iterable.setUserId(null)` prevents Iterable from sending
   * further push notifications to that user, for that app, on that device.  On
   * the user's Iterable profile, endpointEnabled is set to false for the
   * device.
   *
   * @param userId - User ID to associate with the current user
   * @param authToken - Valid, pre-fetched JWT the SDK can use to authenticate
   * API requests, optional - If null/undefined, no JWT related action will be
   * taken
   */
  static setUserId(userId?: string | null, authToken?: string | null) {
    Iterable?.logger?.log('setUserId: ' + userId);

    RNIterableAPI.setUserId(userId, authToken);
  }

  /**
   * Get the `userId` associated with the current user.
   *
   * @example
   * ```typescript
   * Iterable.getUserId().then((userId) => {
   *  // Do something with the userId
   * });
   * ```
   */
  static getUserId(): Promise<string | undefined> {
    Iterable?.logger?.log('getUserId');

    return RNIterableAPI.getUserId();
  }

  /**
   * Disable the device's token for the current user.  This will disable push notifications for the current user.
   *
   * @example
   * ```typescript
   * Iterable.disableDeviceForCurrentUser();
   * ```
   */
  static disableDeviceForCurrentUser() {
    Iterable?.logger?.log('disableDeviceForCurrentUser');

    RNIterableAPI.disableDeviceForCurrentUser();
  }

  /**
   * Get the payload of the last push notification with which the user
   * opened the application (by clicking an action button, etc.).
   *
   * @example
   * ```typescript
   * Iterable.getLastPushPayload().then((payload) => {
   *  // Do something with the payload
   * });
   * ```
   */
  static getLastPushPayload(): Promise<unknown> {
    Iterable?.logger?.log('getLastPushPayload');

    return RNIterableAPI.getLastPushPayload();
  }

  /**
   * Get the stored attribution information -- possibly based on a recent deep link click.
   *
   * The attribution information contains the campaign ID, template ID, and message ID of the message
   * that prompted the user to recently click a link.
   *
   * @see {@link IterableAttributionInfo}
   *
   * @example
   * ```typescript
   *  Iterable.getAttributionInfo().then((attributionInfo) => {
   *    Iterable.updateSubscriptions(
   *      null,
   *      [33015, 33016, 33018],
   *      null,
   *      null,
   *      attributionInfo.campaignId,
   *      attributionInfo.templateId
   *    );
   *  });
   * ```
   */
  static getAttributionInfo(): Promise<IterableAttributionInfo | undefined> {
    Iterable?.logger?.log('getAttributionInfo');

    return RNIterableAPI.getAttributionInfo().then(
      (dict?: IterableAttributionInfo) => {
        if (dict) {
          return new IterableAttributionInfo(
            dict.campaignId,
            dict.templateId,
            dict.messageId
          );
        } else {
          return undefined;
        }
      }
    );
  }

  /**
   * Manually set the current stored attribution information so that it can later be used when tracking events.
   *
   * The attribution information contains the campaign ID, template ID, and message ID of the message
   * that prompted the user to recently click a link.
   *
   * @see {@link IterableAttributionInfo}
   *
   * For deep link clicks, Iterable sets attribution information automatically.
   * However, use this method to set it manually if ever necessary.
   *
   * @param attributionInfo - Object storing current attribution info
   *
   * @example
   * ```typescript
   * const CAMPAIGN_ID = 1234;
   * const TEMPLATE_ID = 5678;
   * const MESSAGE_ID = 9012;
   *
   * const attributionInfo = new IterableAttributionInfo(CAMPAIGN_ID, TEMPLATE_ID, MESSAGE_ID);
   *
   * Iterable.setAttributionInfo(attributionInfo);
   * ```
   */
  static setAttributionInfo(attributionInfo?: IterableAttributionInfo) {
    Iterable?.logger?.log('setAttributionInfo');

    RNIterableAPI.setAttributionInfo(attributionInfo);
  }

  /**
   * Create a `pushOpen` event on the current user's Iterable profile, populating
   * it with data provided to the method call.
   *
   * **NOTE**: Iterable's SDK automatically tracks push notification opens.
   * However, it's also possible to manually track these events by calling this
   * method.
   *
   * @param campaignId - The ID of the campaign to associate with the push open
   * @param templateId - The ID of the template to associate with the push open
   * @param messageId - The ID of the message to associate with the push open
   * @param appAlreadyRunning - Whether or not the app was already running when
   * the push notification arrived
   * @param dataFields - Information to store with the push open event
   *
   * @example
   * ```typescript
   * const CAMPAIGN_ID = 12345;
   * const TEMPLATE_ID = 67890;
   * const MESSAGE_ID = '0fc6657517c64014868ea2d15f23082b';
   * const APP_ALREADY_RUNNING = false;
   * const DATA_FIELDS = {
   *    "discount": 0.99,
   *    "product": "cappuccino",
   * };
   *
   * Iterable.trackPushOpen(CAMPAIGN_ID, TEMPLATE_ID, MESSAGE_ID, APP_ALREADY_RUNNING, DATA_FIELDS);
   * ```
   */
  static trackPushOpenWithCampaignId(
    campaignId: number,
    templateId: number,
    messageId: string | undefined,
    appAlreadyRunning: boolean,
    dataFields?: unknown
  ) {
    Iterable?.logger?.log('trackPushOpenWithCampaignId');

    RNIterableAPI.trackPushOpenWithCampaignId(
      campaignId,
      templateId,
      messageId,
      appAlreadyRunning,
      dataFields
    );
  }

  /**
   * Update the items saved in the shopping cart (or equivalent).
   *
   * Represent each item in the updateCart event with an IterableCommerceItem object.
   *
   * @see {@link IterableCommerceItem}
   *
   * @param items - The items added to the shopping cart
   *
   * @example
   * ```typescript
   * const item = new IterableCommerceItem(
   *    "TOY1",
   *    "Red Racecar",
   *    4.99,
   *    1,
   *    "RR123",
   *    "A small, red racecar.",
   *    "https://www.example.com/toys/racecar",
   *    "https://www.example.com/toys/racecar/images/car.png",
   *    ["Toy", "Inexpensive"],
   * );
   *
   * Iterable.updateCart([item]);
   * ```
   */
  static updateCart(items: IterableCommerceItem[]) {
    Iterable?.logger?.log('updateCart');

    RNIterableAPI.updateCart(items);
  }

  /**
   * Launch the application from the background in Android devices.
   *
   * @group Android Only
   *
   * @example
   * ```typescript
   * Iterable.wakeApp();
   * ```
   */
  static wakeApp() {
    if (Platform.OS === 'android') {
      Iterable?.logger?.log('Attempting to wake the app');

      RNIterableAPI.wakeApp();
    }
  }

  /**
   * Create a purchase event on the current user's Iterable profile.
   *
   * Represent each item in the purchase event with an {@link IterableCommerceItem} object.
   *
   * @see {@link IterableCommerceItem}
   *
   * **NOTE**: `total` is a parameter that is passed in. Iterable does not sum the `price` fields of the various items in the purchase event.
   *
   * @param total - The total cost of the purchase
   * @param items - The items included in the purchase
   * @param dataFields - Descriptive data to store on the purchase event
   *
   * @example
   * ```typescript
   * const items = [
   *  new IterableCommerceItem('item1', 'Item 1', 10.0, 1),
   *  new IterableCommerceItem('item2', 'Item 2', 20.0, 2),
   * ];
   * const dataFields = { 'key1': 'value1', };
   *
   * Iterable.trackPurchase(30.0, items, dataFields);
   * ```
   */
  static trackPurchase(
    total: number,
    items: IterableCommerceItem[],
    dataFields?: unknown
  ) {
    Iterable?.logger?.log('trackPurchase');

    RNIterableAPI.trackPurchase(total, items, dataFields);
  }

  /**
   * Create an `inAppOpen` event for the specified message on the current user's profile
   * for manual tracking purposes. Iterable's SDK automatically tracks in-app message opens when you use the
   * SDK's default rendering.
   *
   * @param message - The in-app message (an {@link IterableInAppMessage} object)
   * @param location - The location of the in-app message (an IterableInAppLocation enum)
   *
   * @example
   * ```typescript
   * const message = new IterableInAppMessage(1234, 4567, IterableInAppTrigger.auto, new Date(), new Date(), false, undefined, undefined, false, 0);
   * Iterable.trackInAppOpen(message, IterableInAppLocation.inApp);
   * ```
   *
   * @remarks
   * Iterable's SDK automatically tracks in-app message opens when you use the
   * SDK's default rendering. However, it's also possible to manually track
   * these events by calling this method.
   */
  static trackInAppOpen(
    message: IterableInAppMessage,
    location: IterableInAppLocation
  ) {
    Iterable?.logger?.log('trackInAppOpen');

    RNIterableAPI.trackInAppOpen(message.messageId, location);
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
   *
   * @example
   * ```typescript
   * const message = new IterableInAppMessage(1234, 4567, IterableInAppTrigger.auto, new Date(), new Date(), false, undefined, undefined, false, 0);
   * Iterable.trackInAppClick(message, IterableInAppLocation.inApp, 'https://www.example.com');
   * ```
   *
   * @remarks
   * Iterable's SDK automatically tracks in-app message clicks when you use the
   * SDK's default rendering. However, you can also manually track these events
   * by calling this method.
   */
  static trackInAppClick(
    message: IterableInAppMessage,
    location: IterableInAppLocation,
    clickedUrl: string
  ) {
    Iterable?.logger?.log('trackInAppClick');

    RNIterableAPI.trackInAppClick(message.messageId, location, clickedUrl);
  }

  /**
   * Create an `inAppClose` event for the specified message on the current
   * user's profile for manual tracking purposes. Iterable's SDK automatically
   * tracks in-app message close events when you use the SDK's default
   * rendering.
   *
   * @param message - The in-app message.
   * @param location - The location of the in-app message.  Useful for determining if the messages is in a mobile inbox.
   * @param source - The way the in-app was closed.
   * @param clickedUrl - The URL clicked by the user.
   *
   * @example
   * ```typescript
   * const message = new IterableInAppMessage(1234, 4567, IterableInAppTrigger.auto, new Date(), new Date(), false, undefined, undefined, false, 0);
   * Iterable.trackInAppClose(message, IterableInAppLocation.inApp, IterableInAppCloseSource.back, 'https://www.example.com');
   * ```
   *
   * @remarks
   * Iterable's SDK automatically tracks in-app message close events when you
   * use the SDK's default rendering. However, it's also possible to manually
   * track these events by calling this method.
   */
  static trackInAppClose(
    message: IterableInAppMessage,
    location: IterableInAppLocation,
    source: IterableInAppCloseSource,
    clickedUrl?: string
  ) {
    Iterable?.logger?.log('trackInAppClose');

    RNIterableAPI.trackInAppClose(
      message.messageId,
      location,
      source,
      clickedUrl
    );
  }

  /**
   * Remove the specified message from the current user's message queue.
   *
   * This creates an in-app delete event for the specified message on the current user's profile
   * unless otherwise specified (specifying a source of {@link IterableInAppDeleteSource.unknown} prevents
   * an `inAppDelete` event from being created).
   *
   * @param message - The in-app message (an {@link IterableInAppMessage} object)
   * @param location - The location of the in-app message (an {@link IterableInAppLocation} enum)
   * @param source - How the in-app message was deleted (an {@link IterableInAppDeleteSource} enum)
   *
   * @example
   * ```typescript
   * const message = new IterableInAppMessage(
   *    1234,
   *    4567,
   *    IterableInAppTrigger.auto,
   *    new Date(),
   *    new Date(),
   *    false,
   *    undefined,
   *    undefined,
   *    false,
   *    0,
   * );
   *
   * Iterable.inAppConsume(message, IterableInAppLocation.inApp, IterableInAppDeleteSource.delete);
   * ```
   *
   * @remarks
   * After a user has read an in-app message, you can _consume_ it so that it's no
   * longer in their queue of messages. When you use the SDK's default rendering
   * for in-app messages, it handles this automatically. However, you can also
   * use this method to do it manually (for example, after rendering an in-app
   * message in a custom way).
   */
  static inAppConsume(
    message: IterableInAppMessage,
    location: IterableInAppLocation,
    source: IterableInAppDeleteSource
  ) {
    Iterable?.logger?.log('inAppConsume');

    RNIterableAPI.inAppConsume(message.messageId, location, source);
  }

  /**
   * Create a custom event to the current user's Iterable profile.
   *
   * Pass in the name of the event stored in eventName key and the data associated with the event.
   * The eventType is set to "customEvent".
   *
   * @param name - The event name of the custom event
   * @param dataFields - Descriptive data to store on the custom event
   *
   *  @example
   * ```typescript
   * Iterable.trackEvent("completedOnboarding",
   *  {
   *    "includedProfilePhoto": true,
   *    "favoriteColor": "red",
   *    "favoriteFlavor": "cinnamon",
   *  }
   * );
   * ```
   */
  static trackEvent(name: string, dataFields?: unknown) {
    Iterable?.logger?.log('trackEvent');

    RNIterableAPI.trackEvent(name, dataFields);
  }

  /**
   * Save data to the current user's Iterable profile.
   *
   * If `mergeNestedObjects` is set to `true`, top-level objects in the passed in dataFields parameter
   * are merged with their counterparts that already exist on the user's profile.
   * Otherwise, they are added.
   *
   * If `mergeNestedObjects` is set to `false`, the top-level objects in the passed in dataFields parameter
   * overwrite their counterparts that already exist on the user's profile.
   * Otherwise, they are added.
   *
   * @param dataFields - Data fields to store in user profile
   * @param mergeNestedObjects - Whether to merge top-level objects included in
   * dataFields with analogous, existing objects on the user profile (if `true`)
   * or overwrite them (if `false`).
   *
   * @example
   * This call adds the `firstName` field and `favorites` object to the current
   * user's Iterable profile. Since `mergeNestedObjects` is `false`, this call will
   * overwrite the existing favorites object (if there is one), replacing it
   * with the value in the call (otherwise, it would have merged the two
   * `favorites` objects).
   *
   * ```typescript
   * Iterable.updateUser(
   *   {
   *     "firstName": "Joe",
   *     "favorites": {
   *       "color": "red",
   *       "flavor": "cinnamon"
   *     }
   *   },
   *   false
   * );
   * ```
   *
   * @remarks
   * **IMPORTANT**: `mergeNestedObjects` only works for data that is stored up to one level deep within an object (for example, `{mySettings:{mobile:true}}`). Note that `mergeNestedObjects` applies to objects, not arrays.
   */
  static updateUser(
    dataFields: unknown | undefined,
    mergeNestedObjects: boolean
  ) {
    Iterable?.logger?.log('updateUser');

    RNIterableAPI.updateUser(dataFields, mergeNestedObjects);
  }

  /**
   * Change the value of the email field on the current user's Iterable profile.
   *
   * If `Iterable.setUserId` was used to identify the current user, `Iterable.updateEmail` can be called to
   * give the current user a real (non-placeholder) email address.
   *
   * An optional valid, pre-fetched JWT can be passed in to avoid race conditions.
   * The SDK uses this JWT to authenticate API requests for this user.
   *
   * @param email - The new email to set
   * @param authToken - The new auth token (JWT) to set with the new email, optional - If null/undefined, no JWT-related action will be taken
   *
   * @example
   * ```typescript
   * Iterable.updateEmail('my.new.email@gmail.com', 'myAuthToken');
   * ```
   */
  static updateEmail(email: string, authToken?: string) {
    Iterable?.logger?.log('updateEmail');

    RNIterableAPI.updateEmail(email, authToken);
  }

  /**
   * tsdoc/syntax needs to be disabled as it conflicts with the mermaid syntax.
   * unfortunately, disabling it inline does not appear to work.
   */
  /* eslint-disable tsdoc/syntax */
  /**
   * Handle a universal link.
   *
   * `handleAppLink` will hand the passed in URL to `IterableConfig.urlHandler`, where it is determined whether or not
   * the app can handle the clicked URL.
   *
   * This can be used to handle deep links, universal links, and other URLs that
   * the app should handle.
   *
   * @see [Handling Deep Links in the Iterable React Native SDK](https://support.iterable.com/hc/en-us/articles/360046134911-Deep-Links-and-Custom-Actions-with-Iterable-s-React-Native-SDK#configuring-your-app-to-support-deep-links)
   *
   * @remarks
   * When you call `Iterable.handleAppLink,` you'll pass a URL—the tracking URL
   * generated by Iterable for the link you included in your message content.
   * `handleAppLink` will fetch the original URL (the one you added to your
   * message) from `Iterable` and hand it to `IterableConfig.urlHandler`, where you
   * can analyze it and decide what to do (for example, you might navigate the
   * user to a particular screen in your app that has content related to the
   * link).
   *
   * @mermaid The flow goes like this:
   * graph TD;
   *  A[Linking event listener] --> B[Iterable.handleAppLink] --> C[IterableConfig.urlHandler];
   *
   *
   * @param link - The tracking URL generated by Iterable for the link you included in your message content.
   *
   * @example
   * Basic usage is as follows:
   * ```typescript
   *  Iterable.handleAppLink('https://www.example.com').then((handled) => {
   *    console.log('Link handled: ' + handled);
   *  });
   * ```
   *
   * For deep linking, your code would look something like this:
   * ```tsx
   *  import { Linking } from 'react-native';
   *
   *  const MyApp = () => {
   *    // To handle deep links clicked when the app is not running,
   *    // implement `Linking.getInitialURL`:
   *    Linking.getInitialURL().then((url) => {
   *      if (url) {
   *        Iterable.handleAppLink(url);
   *      }
   *    });
   *
   *    // To handle deep links clicked when the app is already open
   *    // (even if  it's in the background), implement
   *    // `Linking.addEventListener('url', callback)`
   *    Linking.addEventListener('url', (event) => {
   *      if (event.url) {
   *        Iterable.handleAppLink(event.url);
   *      }
   *    });
   *
   *    // This, in turn, will call your `urlHandler` function on the
   *    // `IterableConfig` object you used to initialize the SDK.
   *    const config = new IterableConfig();
   *    config.urlHandler = (url) => {
   *      const isCoffeeUrl = url.search(/coffee/i) !== -1;
   *      if (isCoffeeUrl) {
   *        // Navigate to the coffee screen
   *      }
   *      return isCoffeeUrl;
   *    };
   *
   *    return ( /* Your app code here * / );
   *  }
   * ```
   */
  /* eslint-enable tsdoc/syntax */
  static handleAppLink(link: string): Promise<boolean> {
    Iterable?.logger?.log('handleAppLink');

    return RNIterableAPI.handleAppLink(link);
  }

  /**
   * Update the current user's subscribed email lists, unsubscribed channel IDs,
   * unsubscribed message type IDs (for opt-out message types), and subscribed message type IDs (for opt-in message types)
   * on the current user's profile.
   *
   * Pass in null for any of `emailListIds`, `unsubscribedChannelIds`, `unsubscribedMessageTypeIds`, or `subscribedMessageTypeIds`
   * to indicate that Iterable should not change the current value on the current user's profile.
   *
   * @param emailListIds - The list of email lists (by ID) to which the user should be subscribed
   * @param unsubscribedChannelIds - The list of message channels (by ID) to which the user should be unsubscribed
   * @param unsubscribedMessageTypeIds - The list of message types (by ID) to which the user should be unsubscribed (for opt-out message types)
   * @param subscribedMessageTypeIds - The list of message types (by ID) to which the user should be subscribed (for opt-in message types)
   * @param campaignId - The campaign ID to associate with events generated by this request, use `-1` if unknown or not applicable
   * @param templateId - The template ID to associate with events generated by this request, use `-1` if unknown or not applicable
   *
   * @example
   * ```typescript
   * const emailListIds = [1234, 5678];
   * const unsubscribedChannelIds = [1234, 5678];
   * const unsubscribedMessageTypeIds = [1234, 5678];
   * const subscribedMessageTypeIds = [1234, 5678];
   * const campaignId = 1234;
   * const templateId = 5678;
   *
   * Iterable.updateSubscriptions(
   *  emailListIds,
   *  unsubscribedChannelIds,
   *  unsubscribedMessageTypeIds,
   *  subscribedMessageTypeIds,
   *  campaignId,
   *  templateId,
   * );
   * ```
   */
  static updateSubscriptions(
    emailListIds: number[] | undefined,
    unsubscribedChannelIds: number[] | undefined,
    unsubscribedMessageTypeIds: number[] | undefined,
    subscribedMessageTypeIds: number[] | undefined,
    campaignId: number,
    templateId: number
  ) {
    Iterable?.logger?.log('updateSubscriptions');

    RNIterableAPI.updateSubscriptions(
      emailListIds,
      unsubscribedChannelIds,
      unsubscribedMessageTypeIds,
      subscribedMessageTypeIds,
      campaignId,
      templateId
    );
  }

  /**
   * Sets up event handlers for various Iterable events.
   *
   * This method performs the following actions:
   * - Removes all existing listeners to avoid duplicate listeners.
   * - Adds listeners for URL handling, custom actions, in-app messages, and authentication.
   *
   * Event Handlers:
   * - `handleUrlCalled`: Invokes the URL handler if configured, with a delay on Android to allow the activity to wake up.
   * - `handleCustomActionCalled`: Invokes the custom action handler if configured.
   * - `handleInAppCalled`: Invokes the in-app handler if configured and sets the in-app show response.
   * - `handleAuthCalled`: Invokes the authentication handler if configured and handles the promise result.
   * - `handleAuthSuccessCalled`: Sets the authentication response callback to success.
   * - `handleAuthFailureCalled`: Sets the authentication response callback to failure.
   *
   * Helper Functions:
   * - `callUrlHandler`: Calls the URL handler and attempts to open the URL if the handler returns false.
   *
   * @internal
   */
  private static setupEventHandlers() {
    //Remove all listeners to avoid duplicate listeners
    RNEventEmitter.removeAllListeners(IterableEventName.handleUrlCalled);
    RNEventEmitter.removeAllListeners(IterableEventName.handleInAppCalled);
    RNEventEmitter.removeAllListeners(
      IterableEventName.handleCustomActionCalled
    );
    RNEventEmitter.removeAllListeners(IterableEventName.handleAuthCalled);

    if (Iterable.savedConfig.urlHandler) {
      RNEventEmitter.addListener(IterableEventName.handleUrlCalled, (dict) => {
        const url = dict.url;
        const context = IterableActionContext.fromDict(dict.context);
        Iterable.wakeApp();

        if (Platform.OS === 'android') {
          //Give enough time for Activity to wake up.
          const timeoutId = setTimeout(() => {
            callUrlHandler(url, context);
          }, 1000);
          // Use unref() to prevent the timeout from keeping the process alive
          timeoutId.unref();
        } else {
          callUrlHandler(url, context);
        }
      });
    }

    if (Iterable.savedConfig.customActionHandler) {
      RNEventEmitter.addListener(
        IterableEventName.handleCustomActionCalled,
        (dict) => {
          const action = IterableAction.fromDict(dict.action);
          const context = IterableActionContext.fromDict(dict.context);
          Iterable.savedConfig.customActionHandler!(action, context);
        }
      );
    }

    if (Iterable.savedConfig.inAppHandler) {
      RNEventEmitter.addListener(
        IterableEventName.handleInAppCalled,
        (messageDict) => {
          const message = IterableInAppMessage.fromDict(messageDict);
          // MOB-10423: Check if we can use chain operator (?.) here instead
          const result = Iterable.savedConfig.inAppHandler!(message);
          RNIterableAPI.setInAppShowResponse(result);
        }
      );
    }

    if (Iterable.savedConfig.authHandler) {
      let authResponseCallback: IterableAuthResponseResult;
      RNEventEmitter.addListener(IterableEventName.handleAuthCalled, () => {
        // MOB-10423: Check if we can use chain operator (?.) here instead

        Iterable.savedConfig.authHandler!()
          .then((promiseResult) => {
            // Promise result can be either just String OR of type AuthResponse.
            // If type AuthReponse, authToken will be parsed looking for `authToken` within promised object. Two additional listeners will be registered for success and failure callbacks sent by native bridge layer.
            // Else it will be looked for as a String.
            if (typeof promiseResult === typeof new IterableAuthResponse()) {
              RNIterableAPI.passAlongAuthToken(
                (promiseResult as IterableAuthResponse).authToken
              );

              const timeoutId = setTimeout(() => {
                if (
                  authResponseCallback === IterableAuthResponseResult.SUCCESS
                ) {
                  if ((promiseResult as IterableAuthResponse).successCallback) {
                    (promiseResult as IterableAuthResponse).successCallback?.();
                  }
                } else if (
                  authResponseCallback === IterableAuthResponseResult.FAILURE
                ) {
                  if ((promiseResult as IterableAuthResponse).failureCallback) {
                    (promiseResult as IterableAuthResponse).failureCallback?.();
                  }
                } else {
                  Iterable?.logger?.log(
                    'No callback received from native layer'
                  );
                }
              }, 1000);
              // Use unref() to prevent the timeout from keeping the process alive
              timeoutId.unref();
            } else if (typeof promiseResult === typeof '') {
              //If promise only returns string
              RNIterableAPI.passAlongAuthToken(promiseResult as string);
            } else {
              Iterable?.logger?.log(
                'Unexpected promise returned. Auth token expects promise of String or AuthResponse type.'
              );
            }
          })
          .catch((e) => Iterable?.logger?.log(e));
      });

      RNEventEmitter.addListener(
        IterableEventName.handleAuthSuccessCalled,
        () => {
          authResponseCallback = IterableAuthResponseResult.SUCCESS;
        }
      );
      RNEventEmitter.addListener(
        IterableEventName.handleAuthFailureCalled,
        () => {
          authResponseCallback = IterableAuthResponseResult.FAILURE;
        }
      );
    }

    function callUrlHandler(url: string, context: IterableActionContext) {
      // MOB-10424: Figure out if this is purposeful
      // eslint-disable-next-line eqeqeq
      if (Iterable.savedConfig.urlHandler?.(url, context) == false) {
        Linking.canOpenURL(url)
          .then((canOpen) => {
            if (canOpen) {
              Linking.openURL(url);
            }
          })
          .catch((reason) => {
            Iterable?.logger?.log('could not open url: ' + reason);
          });
      }
    }
  }

  /**
   * Retrieves the version number from the package.json file.
   *
   * @returns The version number as specified in the package.json file.
   *
   * @internal
   */
  public static getVersionFromPackageJson(): string {
    return buildInfo.version as string;
  }
}
