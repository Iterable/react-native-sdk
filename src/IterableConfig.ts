import { IterableAction } from './IterableAction';
import type { IterableActionContext } from './IterableActionContext';
import type { IterableAuthResponse } from './IterableAuthResponse';
import {
  IterableDataRegion,
  IterableLogLevel,
  IterablePushPlatform,
} from './enums';
import { IterableInAppMessage, IterableInAppShowResponse } from 'inApp';

/**
 * An IterableConfig object sets various properties of the SDK.
 * An IterableConfig object is passed into the static initialize method on the Iterable class when initializing the SDK.
 */

export class IterableConfig {
  /**
   * The name of the Iterable push integration that will send push notifications to your app.
   * Defaults to your app's application ID or bundle ID for iOS.
   *
   * Note: Don't specify this value unless you are using an older Iterable push integration that
   * has a custom name. To view your existing integrations, navigate to Settings > Mobile Apps.
   */
  pushIntegrationName?: string;

  /**
   * When set to true (which is the default value), IterableSDK will automatically register and deregister
   * notification tokens when you provide email or userId values to the SDK using Iterable.setEmail or Iterable.setUserId.
   */
  autoPushRegistration = true;

  /**
   * When set to true, it will check for deferred deep links on first time app launch after installation from the App Store.
   * This is currently deprecated and will be removed in the future.
   */
  checkForDeferredDeeplink = false;

  /**
   * Number of seconds to wait when displaying multiple in-app messages in sequence.
   * between each. Defaults to 30 seconds.
   */
  inAppDisplayInterval: number = 30.0;

  /**
   * A callback function used to handle deep link URLs and in-app message button and link URLs.
   */
  urlHandler?: (url: string, context: IterableActionContext) => boolean;

  /**
   * A function expression used to handle `action://` URLs for in-app buttons and links.
   */
  customActionHandler?: (
    action: IterableAction,
    context: IterableActionContext
  ) => boolean;

  /**
   * Implement this callback to override default in-app behavior.
   * By default, every single in-app will be shown as soon as it is available.
   * If more than 1 in-app is available, we show the first.
   *
   * See "In-App Messages with Iterable's React Native SDK" in support documentation
   * for more information.
   */
  inAppHandler?: (message: IterableInAppMessage) => IterableInAppShowResponse;

  /**
   * A function expression that provides a valid JWT for the app's current user to Iterable's
   * React Native SDK. Provide an implementation for this method only if your app uses a
   * JWT-enabled API key.
   */
  authHandler?: () => Promise<IterableAuthResponse | String | undefined>;

  /**
   * Set the verbosity of Android and iOS project's log system.
   * By default, you will be able to see info level logs printed in IDE when running the app.
   */
  logLevel: IterableLogLevel = IterableLogLevel.info;

  /**
   * Set whether the React Native SDK should print function calls to console
   * This is for calls within the React Native layer, and is separate from `logLevel`
   * which affects the Android and iOS native SDKs
   */
  logReactNativeSdkCalls: boolean = true;

  /**
   * The number of seconds before the current JWT's expiration that the SDK should call the
   * authHandler to get an updated JWT.
   */
  expiringAuthTokenRefreshPeriod: number = 60.0;

  /**
   * Use this array to declare the specific URL protocols that the SDK can expect to see on incoming
   * links from Iterable, so it knows that it can safely handle them as needed. This array helps
   * prevent the SDK from opening links that use unexpected URL protocols.
   */
  allowedProtocols: Array<string> = [];

  /**
   * DEPRECATED - please use `useInMemoryStorageForInApps` as a replacement for this config option.
   *
   * NOTE: until this option is removed, it will still function with `useInMemoryStorageForInApps` by
   * doing an OR operation, so if either this or `useInMemoryStorageForInApps` are set to `true`,
   * the native Android SDK layer will use in memory storage for in-apps.
   *
   * This specifies the `useInMemoryStorageForInApps` config option downstream to the Android SDK layer.
   */
  androidSdkUseInMemoryStorageForInApps: boolean = false;

  /**
   * This specifies the `useInMemoryStorageForInApps` config option downstream to the native SDK layers.
   * Please read the respective `IterableConfig` files for specific details on this config option.
   */
  useInMemoryStorageForInApps: boolean = false;

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
  encryptionEnforced: boolean = false;

  toDict(): any {
    return {
      pushIntegrationName: this.pushIntegrationName,
      autoPushRegistration: this.autoPushRegistration,
      inAppDisplayInterval: this.inAppDisplayInterval,
      // TODO: Figure out if this is purposeful
      // eslint-disable-next-line eqeqeq
      urlHandlerPresent: this.urlHandler != undefined,
      // TODO: Figure out if this is purposeful
      // eslint-disable-next-line eqeqeq
      customActionHandlerPresent: this.customActionHandler != undefined,
      // TODO: Figure out if this is purposeful
      // eslint-disable-next-line eqeqeq
      inAppHandlerPresent: this.inAppHandler != undefined,
      // TODO: Figure out if this is purposeful
      // eslint-disable-next-line eqeqeq
      authHandlerPresent: this.authHandler != undefined,
      logLevel: this.logLevel,
      expiringAuthTokenRefreshPeriod: this.expiringAuthTokenRefreshPeriod,
      allowedProtocols: this.allowedProtocols,
      androidSdkUseInMemoryStorageForInApps:
        this.androidSdkUseInMemoryStorageForInApps,
      useInMemoryStorageForInApps: this.useInMemoryStorageForInApps,
      dataRegion: this.dataRegion,
      pushPlatform: this.pushPlatform,
      encryptionEnforced: this.encryptionEnforced,
    };
  }
}

export default IterableConfig;
