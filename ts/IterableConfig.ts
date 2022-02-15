'use strict'

import { 
  IterableAction, 
  IterableActionContext, 
  IterableLogLevel,
} from '.'

import { IterableInAppShowResponse } from './IterableInAppClasses'

import IterableInAppMessage from './IterableInAppMessage'

/**
Iterable Configuration Object. Use this when initializing the API.
*/
class IterableConfig {
  /**
  * You don't have to set this variable. Set this value only if you are an existing Iterable customer who has already setup mobile integrations in Iterable Web UI.
  * In that case, set this variable to the push integration name that you have set for 'APNS' in Iterable Web UI.
  * To view your existing integrations, navigate to Settings > Mobile Apps
  */
  pushIntegrationName?: string

  /**
  * When set to true, IterableSDK will automatically register and deregister notification tokens.
  */
  autoPushRegistration = true

  /**
  * When set to true, it will check for deferred deep links on first time app launch after installation from the App Store.
  * This is currently deprecated and will be removed in the future.
  */
  checkForDeferredDeeplink = false

  /**
  * How many seconds to wait before showing the next in-app, if there are more than one present
  */
  inAppDisplayInterval: number = 30.0

  /**
  * How many seconds to wait before showing the next in-app, if there are more than one present
  */
  urlHandler?: (url: string, context: IterableActionContext) => boolean

  /**
  * How to handle IterableActions which are other than 'openUrl'
  */
  customActionHandler?: (action: IterableAction, context: IterableActionContext) => boolean

  /**
  * Implement this protocol to override default in-app behavior.
  * By default, every single in-app will be shown as soon as it is available.
  * If more than 1 in-app is available, we show the first.
  */
  inAppHandler?: (message: IterableInAppMessage) => IterableInAppShowResponse

  /**
   * The handler with which your own calls to your backend containing the auth token happen
   */
  authHandler?: () => Promise<string | undefined>

  /**
   * Set the verbosity of Android and iOS project's log system. 
   * By default, you will be able to see info level logs printed in IDE when running the app. 
  */
  logLevel: IterableLogLevel = IterableLogLevel.info

  /**
   * Set the amount of time (in seconds) before the current auth token expires to make a call to retrieve a new one
   */
  expiringAuthTokenRefreshPeriod: number = 60.0

  /**
   * We allow navigation only to urls with `https` protocol (for deep links within your app or external links).
   * If you want to allow other protocols, such as,  `http`, `tel` etc., please add them to the list below
  */
  allowedProtocols: Array<string> = []

  toDict(): any {
    return {
      "pushIntegrationName": this.pushIntegrationName,
      "autoPushRegistration": this.autoPushRegistration,
      "inAppDisplayInterval": this.inAppDisplayInterval,
      "urlHandlerPresent": this.urlHandler != undefined,
      "customActionHandlerPresent": this.customActionHandler != undefined,
      "inAppHandlerPresent": this.inAppHandler != undefined,
      "authHandlerPresent": this.authHandler != undefined,
      "logLevel": this.logLevel,
      "expiringAuthTokenRefreshPeriod": this.expiringAuthTokenRefreshPeriod,
      "allowedProtocols": this.allowedProtocols
    }
  }
}

export default IterableConfig