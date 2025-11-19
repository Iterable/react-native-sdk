import { type IterableInAppMessage } from '../../inApp/classes/IterableInAppMessage';
import { IterableInAppShowResponse } from '../../inApp/enums/IterableInAppShowResponse';
import { IterableDataRegion } from '../enums/IterableDataRegion';
import { IterableLogLevel } from '../enums/IterableLogLevel';
import { IterablePushPlatform } from '../enums/IterablePushPlatform';
import type { IterableAuthFailure } from '../types/IterableAuthFailure';
import type { IterableRetryPolicy } from '../types/IterableRetryPolicy';
import { IterableAction } from './IterableAction';
import type { IterableActionContext } from './IterableActionContext';
import type { IterableAuthResponse } from './IterableAuthResponse';

/**
 * An IterableConfig object sets various properties of the SDK.
 *
 * An IterableConfig object is passed into the static initialize method on the
 * Iterable class when initializing the SDK.
 *
 */
export class IterableConfig {
  /**
   * The name of the Iterable push integration that will send push notifications to your app.
   *
   * Defaults to your app's application ID or bundle ID for iOS.
   *
   * Note: Don't specify this value unless you are using an older Iterable push integration that
   * has a custom name. To view your existing integrations, navigate to Settings \> Mobile Apps.
   */
  pushIntegrationName?: string;

  /**
   * When set to `true` (which is the default value), IterableSDK will automatically register and deregister
   * notification tokens when you provide `email` or `userId` values to the SDK using `Iterable.setEmail` or `Iterable.setUserId.`
   */
  autoPushRegistration = true;

  /**
   * @deprecated
   * When set to `true`, it will check for deferred deep links on first time app launch after installation from the App Store.
   *
   * This is currently deprecated and will be removed in the future.
   */
  checkForDeferredDeeplink = false;

  /**
   * Number of seconds between each in-app message when displaying multiple in-app messages in sequence.
   *
   * Defaults to 30 seconds.
   */
  inAppDisplayInterval = 30.0;

  /**
   * A callback function used to handle deep link URLs and in-app message button and link URLs.
   *
   * @param url - The URL to be processed (likely from a click).
   * @param context - The context in which the URL action is being performed.
   * Describes the source of the URL (push, in-app, or universal link) and
   * information about any associated custom actions.
   *
   * @remarks
   * Use this method to determine whether or not the app can handle the clicked
   * URL. If it can, the method should navigate the user to the right content in
   * the app and return `true`. Otherwise, it should return `false` to have the web
   * browser open the URL.
   *
   * @example
   * This example searches for URLs that contain product/, followed by more text. Upon finding this sequence of text, the code displays the appropriate screen and returns `true`. When it's not found, the app returns `false`.
   *
   * ```typescript
   * const config = new IterableConfig();
   *
   * config.urlHandler = (url, context) => {
   *  if (url.match(/product\/([^\/]+)/i)) {
   *    this.navigate(match[1]);
   *    return true; // handled
   *  }
   *  return false; // not handled
   * };
   *
   * Iterable.initialize('<YOUR_API_KEY>', config);
   * ```
   *
   * @returns A boolean indicating whether the URL was successfully handled.
   */
  urlHandler?: (url: string, context: IterableActionContext) => boolean;

  /**
   * A function expression used to handle `action://` URLs for in-app buttons
   * and links.
   *
   * Use this method to determine whether or not the app can handle the clicked
   * custom action URL. If it can, it should handle the action and return `true`.
   * Otherwise, it should return `false`.
   *
   * @param action - The custom action that was triggered.
   * @param context - The context in which the action was triggered.  In other
   * words, information about where the action was invoked.
   *
   * @remarks
   * A custom action URL has format `action://customActionName`: an `action://`
   * prefix, followed by a custom action name. Decide with your marketing team
   * on a set of known custom actions your app should support.
   *
   * **WARNING**: Earlier versions of the SDK used the `itbl:// prefix` for custom
   * action URLs. The SDK still supports these custom actions, but they are
   * deprecated and will not be supported forever. Migrate to `action://` as it's
   * possible to do so.
   *
   * @example
   * This example responds to the `action://achievedPremierStatus` custom action URL by updating the app's styles and return `true`. Since this is the only custom action handled by the method, it returns `false` for anything else.
   * ```typescript
   *  const config = new IterableConfig();
   *  config.customActionHandler = (action, context) => {
   *    if (action.type == "achievedPremierStatus") {
   *      // For this action, update the app's styles
   *      this.updateAppStyles("premier");
   *      return true;
   *    }
   *    return false;
   *  }
   *  Iterable.initialize('<YOUR_API_KEY>', config);
   * ```
   *
   * @returns A boolean indicating whether the action was handled.
   */
  customActionHandler?: (
    action: IterableAction,
    context: IterableActionContext
  ) => boolean;

  /**
   * Implement this callback to override default in-app behavior.
   *
   * By default, every single in-app will be shown as soon as it is available.
   * If more than 1 in-app is available, we show the first.
   *
   * @see [In-App Messages with Iterable's React Native SDK](https://support.iterable.com/hc/en-us/articles/360045714172-In-App-Messages-with-Iterable-s-React-Native-SDK)
   *
   * @remarks
   * Implement this property to override default in-app message behavior. For
   * example, you might use the custom payload associated with an incoming
   * message to choose whether or not to display it, or you might inspect the
   * priorityLevel property to determine the message's priority.
   *
   * @example
   * ```typescript
   * config.inAppHandler = (message: IterableInAppMessage) => {
   *   return message?.read ? IterableInAppShowResponse.skip :  IterableInAppShowResponse.show;
   * }
   * ```
   *
   * @param message - The in-app message to be processed.
   * @returns A response indicating how the in-app message should be shown.
   */
  inAppHandler?: (message: IterableInAppMessage) => IterableInAppShowResponse;

  /**
   * A function expression that provides a valid JWT for the app's current user
   * to Iterable's React Native SDK.
   *
   * Provide an implementation for this method only if your app uses a
   * [JWT-enabled API
   * key](https://support.iterable.com/hc/en-us/articles/360045714132-Installing-Iterable-s-React-Native-SDK#:~:text=app%20uses%20a-,JWT%2Denabled%20API%20key,-.).
   *
   * @remarks
   * To make requests to Iterable's API using a JWT-enabled API key, you should
   * first fetch a valid JWT for your app's current user from your own server,
   * which must generate it. The `authHandler` provides this JWT to Iterable's
   * React Native SDK, which can then append the JWT to subsequent API requests.
   * The SDK automatically calls `authHandler` at various times:
   * - When your app sets the user's email or user ID.
   * - When your app updates the user's email.
   * - Before the current JWT expires (at a configurable interval set by
   *   `expiringAuthTokenRefreshPeriod`)
   * - When your app receives a 401 response from Iterable's API with a
   *   `InvalidJwtPayload` error code. However, if the SDK receives a second
   *   consecutive 401 with an `InvalidJwtPayload` error when it makes a request
   *   with the new token, it won't call the `authHandler` again until you call
   *   `setEmail` or `setUserId` without passing in an auth token.
   *
   * **TIP**: The `setEmail` and `setUserId` mobile SDK methods accept an
   * optional, prefetched auth token. If you encounter SDK errors related to
   * auth token requests, try using this parameter.
   *
   * For more information about JWT-enabled API keys, read [JWT-Enabled API Keys](https://support.iterable.com/hc/articles/360050801231).
   *
   *  @example
   * This example demonstrates how an app that uses a JWT-enabled API key might initialize the SDK.
   *
   * ```typescript
   * const config = new IterableConfig();
   *
   * config.authHandler = () => {
   *  // ... Fetch a JWT from your server, or locate one you've already retrieved
   *  return new Promise(function (resolve, reject) {
   *    // Resolve the promise with a valid auth token for the current user
   *    resolve("<AUTH_TOKEN>")
   *  });
   * };
   * config.autoPushRegistration = false;
   *
   * Iterable.initialize('<YOUR_API_KEY>', config);
   * ```
   *
   * @returns A promise that resolves to an `IterableAuthResponse`, a `string`,
   * or `undefined`.
   */
  authHandler?: () => Promise<IterableAuthResponse | string | undefined>;

  /**
   * A callback function that is called when the SDK encounters an error while
   * validing the JWT.
   *
   * The retry for JWT should be automatically handled by the native SDK, so
   * this is just for logging/transparency purposes.
   *
   * @param authFailure - The details of the auth failure.
   *
   * @example
   * ```typescript
   * const config = new IterableConfig();
   * config.onJwtError = (authFailure) => {
   *   console.error('Error fetching JWT:', authFailure);
   * };
   * ```
   */
  onJwtError?: (authFailure: IterableAuthFailure) => void;

  /**
   * Set the verbosity of Android and iOS project's log system.
   *
   * By default, you will be able to see info level logs printed in IDE when running the app.
   */
  logLevel: IterableLogLevel = IterableLogLevel.debug;

  /**
   * Configuration for JWT refresh retry behavior.
   * If not specified, the SDK will use default retry behavior.
   *
   * @example
   * ```typescript
   * const config = new IterableConfig();
   * config.retryPolicy = new IterableRetryPolicy({
   *   maxRetries: 3,
   *   initialDelay: 1000,
   *   maxDelay: 10000,
   * });
   * ```
   */
  retryPolicy?: IterableRetryPolicy;

  /**
   * Set whether the React Native SDK should print function calls to console.
   *
   * This is for calls within the React Native layer, and is separate from `logLevel`
   * which affects the Android and iOS native SDKs
   */
  logReactNativeSdkCalls = true;

  /**
   * The number of seconds before the current JWT's expiration that the SDK should call the
   * `authHandler` to get an updated JWT.
   */
  expiringAuthTokenRefreshPeriod = 60.0;

  /**
   * Use this array to declare the specific URL protocols that the SDK can
   * expect to see on incoming links from Iterable, so it knows that it can
   * safely handle them as needed. This array helps prevent the SDK from opening
   * links that use unexpected URL protocols.
   *
   * @example
   * To allow the SDK to handle `http`, `tel`, and `custom` links, use code similar to this:
   *
   * ```typescript
   * const config = new IterableConfig();
   * config.allowedProtocols = ["http", "tel", "custom"];
   * ```
   *
   * @remarks
   * **IMPORTANT**: Iterable's React Native SDK handles https, action, itbl, and
   * iterable links, regardless of the contents of this array. However, you must
   * explicitly declare any other types of URL protocols you'd like the SDK to
   * handle (otherwise, the SDK won't open them in the web browser or as deep
   * links).
   */
  allowedProtocols: string[] = [];

  /**
   * @deprecated
   * DEPRECATED - please use `useInMemoryStorageForInApps` as a replacement for this config option.
   *
   * NOTE: until this option is removed, it will still function with `useInMemoryStorageForInApps` by
   * doing an OR operation, so if either this or `useInMemoryStorageForInApps` are set to `true`,
   * the native Android SDK layer will use in memory storage for in-apps.
   *
   * This specifies the `useInMemoryStorageForInApps` config option downstream to the Android SDK layer.
   */
  androidSdkUseInMemoryStorageForInApps = false;

  /**
   * This specifies the `useInMemoryStorageForInApps` config option downstream to the native SDK layers.
   *
   * It determines whether Android and iOS apps should store in-app messages in memory, rather than in an unencrypted local file (defaults to `false`).
   *
   * Please read the respective `IterableConfig` files for specific details on this config option.
   *
   * @remarks
   * For more information about this option, and the deprecated-but-related
   * `androidSdkUseInMemoryStorageForInApps` available in version 1.3.7 of
   * Iterable's React Native SDK, read the [release notes for version 1.3.9](https://github.com/Iterable/react-native-sdk/releases/tag/1.3.9).
   */
  useInMemoryStorageForInApps = false;

  /**
   * This specifies the data region which determines the data center and associated endpoints used by the SDK
   */
  dataRegion: IterableDataRegion = IterableDataRegion.US;

  /**
   * This specifies the push platform to use for push notifications. Either `sandbox`, `production`, or `auto`.
   * The default value is `auto`, which means the SDK will automatically determine the push platform to use.
   * However, you can also set this to `sandbox` or `production` to force the SDK to use a specific platform.
   */
  pushPlatform: IterablePushPlatform = IterablePushPlatform.auto;

  /**
   * Android only feature: This controls whether the SDK should enforce encryption for all PII stored on disk.
   * By default, the SDK will not enforce encryption and may fallback to unencrypted storage in case the encryption fails.
   */
  encryptionEnforced = false;

  /**
   * Should the SDK enable and use embedded messaging?
   *
   * **Documentation**
   * - [Embedded Messaging Overview](https://support.iterable.com/hc/en-us/articles/23060529977364-Embedded-Messaging-Overview)
   * - [Android Embedded Messaging](https://support.iterable.com/hc/en-us/articles/23061877893652-Embedded-Messages-with-Iterable-s-Android-SDK)
   * - [iOS Embedded Messaging](https://support.iterable.com/hc/en-us/articles/23061840746900-Embedded-Messages-with-Iterable-s-iOS-SDK)
   */
  enableEmbeddedMessaging = false;

  /**
   * Converts the IterableConfig instance to a dictionary object.
   *
   * @returns An object representing the configuration.
   */
  toDict() {
    return {
      pushIntegrationName: this.pushIntegrationName,
      autoPushRegistration: this.autoPushRegistration,
      inAppDisplayInterval: this.inAppDisplayInterval,
      /**
       * A boolean indicating if a URL handler is present.
       *
       * TODO: Figure out if this is purposeful
       */
      // eslint-disable-next-line eqeqeq
      urlHandlerPresent: this.urlHandler != undefined,
      /**
       * A boolean indicating if a custom action handler is present.
       *
       * TODO: Figure out if this is purposeful
       */
      // eslint-disable-next-line eqeqeq
      customActionHandlerPresent: this.customActionHandler != undefined,
      /**
       * A boolean indicating if an in-app handler is present.
       *
       * TODO: Figure out if this is purposeful
       */
      // eslint-disable-next-line eqeqeq
      inAppHandlerPresent: this.inAppHandler != undefined,
      /**
       * A boolean indicating if an authentication handler is present.
       *
       * TODO: Figure out if this is purposeful
       */
      // eslint-disable-next-line eqeqeq
      authHandlerPresent: this.authHandler != undefined,
      /** The log level for the SDK. */
      logLevel: this.logLevel,
      expiringAuthTokenRefreshPeriod: this.expiringAuthTokenRefreshPeriod,
      allowedProtocols: this.allowedProtocols,
      androidSdkUseInMemoryStorageForInApps:
        this.androidSdkUseInMemoryStorageForInApps,
      useInMemoryStorageForInApps: this.useInMemoryStorageForInApps,
      dataRegion: this.dataRegion,
      pushPlatform: this.pushPlatform,
      encryptionEnforced: this.encryptionEnforced,
      retryPolicy: this.retryPolicy,
      enableEmbeddedMessaging: this.enableEmbeddedMessaging,
    };
  }
}
