'use strict'

import {
  NativeModules,
  NativeEventEmitter,
  Linking,
  Platform
} from 'react-native'

import {
  IterableInAppLocation,
  IterableInAppCloseSource,
  IterableInAppDeleteSource
} from './IterableInAppClasses'

import IterableInAppManager from './IterableInAppManager'
import IterableInAppMessage from './IterableInAppMessage'
import IterableConfig, { AuthResponse } from './IterableConfig'
import { IterableLogger } from './IterableLogger'

const RNIterableAPI = NativeModules.RNIterableAPI
const RNEventEmitter = new NativeEventEmitter(RNIterableAPI)

/**
* Enum representing the source of IterableAction.
*/
enum IterableActionSource {
  push = 0,
  appLink = 1,
  inApp = 2
}

enum AuthResponseCallback {
  SUCCESS,
  FAILURE,
}

/**
* Enum representing what level of logs will Android and iOS project be printing on their consoles respectively.
*/
enum IterableLogLevel {
  debug = 1,
  info = 2,
  error = 3
}

/**
* IterableAction represents an action defined as a response to user events.
* It is currently used in push notification actions (open push & action buttons).
*/
class IterableAction {
  type: string
  data?: string
  userInput?: string

  constructor (type: string, data?: string, userInput?: string) {
    this.type = type
    this.data = data
    this.userInput = userInput
  }

  static fromDict (dict: any): IterableAction {
    return new IterableAction(dict.type, dict.data, dict.userInput)
  }
}

class IterableActionContext {
  action: IterableAction
  source: IterableActionSource

  constructor (action: IterableAction, source: IterableActionSource) {
    this.action = action
    this.source = source
  }

  static fromDict (dict: any): IterableActionContext {
    const action = IterableAction.fromDict(dict.action)
    const source = dict.source as IterableActionSource
    return new IterableActionContext(action, source)
  }
}

class IterableAttributionInfo {
  campaignId: number
  templateId: number
  messageId: string

  constructor (campaignId: number, templateId: number, messageId: string) {
    this.campaignId = campaignId
    this.templateId = templateId
    this.messageId = messageId
  }
}

class IterableCommerceItem {
  id: string
  name: string
  price: number
  quantity: number
  sku?: string
  description?: string
  url?: string
  imageUrl?: string
  categories?: string[]
  dataFields?: any

  constructor (id: string, name: string, price: number, quantity: number, sku?: string, description?: string, url?: string, imageUrl?: string, categories?: string[], dataFields?: any | undefined) {
    this.id = id
    this.name = name
    this.price = price
    this.quantity = quantity
    this.sku = sku
    this.description = description
    this.url = url
    this.imageUrl = imageUrl
    this.categories = categories
    this.dataFields = dataFields
  }
}

enum EventName {
  handleUrlCalled = 'handleUrlCalled',
  handleCustomActionCalled = 'handleCustomActionCalled',
  handleInAppCalled = 'handleInAppCalled',
  handleAuthCalled = 'handleAuthCalled',
  receivedIterableInboxChanged = 'receivedIterableInboxChanged',
  handleAuthSuccessCalled = 'handleAuthSuccessCalled',
  handleAuthFailureCalled = 'handleAuthFailureCalled'
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Iterable {
  static inAppManager = new IterableInAppManager()

  static logger: IterableLogger

  static savedConfig: IterableConfig

  /**
   * This static method is used to initialize the React Native SDK in your app's Javascript or Typescript code.
   *
   * Pass in a mobile API key distributed with the mobile app.
   * Warning: never user server-side API keys with the React Native SDK, mobile API keys have minimal access for security purposes.
   *
   * Pass in an IterableConfig object with the various customization properties setup.
   *
   * Note: Use Iterable.initialize and NOT Iterable.initialize2, as Iterable.initialize2 is only used internally.
   *
   * @param {string} apiKey mobile API key provided with the application
   * @param {IterableConfig} config config object with various properties
   */

  static async initialize (apiKey: string, config: IterableConfig = new IterableConfig()): Promise<boolean> {
    Iterable.savedConfig = config

    Iterable.logger = new IterableLogger(Iterable.savedConfig)

    Iterable.logger.log('initialize: ' + apiKey)

    this.setupEventHandlers()
    const version = this.getVersionFromPackageJson()

    return RNIterableAPI.initializeWithApiKey(apiKey, config.toDict(), version)
  }

  /**
  * DO NOT CALL THIS METHOD.
  * This method is used internally to connect to staging environment.
  */
  static async initialize2 (apiKey: string, config: IterableConfig = new IterableConfig(), apiEndPoint: string): Promise<boolean> {
    Iterable.savedConfig = config

    Iterable.logger = new IterableLogger(Iterable.savedConfig)

    Iterable.logger.log('initialize2: ' + apiKey)

    this.setupEventHandlers()
    const version = this.getVersionFromPackageJson()

    return RNIterableAPI.initialize2WithApiKey(apiKey, config.toDict(), version, apiEndPoint)
  }

  /**
   * This static method associates the current user with the passed in email parameter.
   *
   * Iterable's React Native SDK persists the user across app sessions and restarts, until you manually change the user using
   * Iterable.setEmail or Iterable.setUserId.
   *
   * User profile creation:
   *
   * If your Iterable project does not have a user with the passed in email, setEmail creates one and adds the email address
   * to the user's Iterable profile.
   *
   * Registering device token:
   *
   * If IterableConfig.autoPushRegisteration is set to true, calling setEmail automatically registers the device for push
   * notifications and sends the deviceId and token to Iterable.
   *
   * Optional JWT token parameter:
   *
   * An optional valid, pre-fetched JWT can be passed in to avoid race conditions.
   * The SDK uses this JWT to authenticate API requests for this user.
   *
   * Signing out a user from the SDK:
   *
   * To tell the SDK to sign out the current user, pass null into Iterable.setEmail.
   * If IterableConfig.autoPushRegisteration is set to true, calling Iterable.setEmail(null) prevents Iterable from sending further
   * push notifications to that user, for that app, on that device.
   * On the user's Iterable profile, endpointEnabled is set to false for the device.
   *
   * Note: specify a user by calling Iterable.setEmail or Iterable.setUserId, but NOT both.
   *
   * @param {string | undefined} email email address to associate with the current user
   * @param {string | undefined} authToken valid, pre-fecthed JWT the SDK can use to authenticate API requests, optional - if null/undefined, no JWT related action will be taken
   */

  static setEmail (email: string | undefined, authToken?: string | undefined): void {
    Iterable.logger.log('setEmail: ' + email)

    RNIterableAPI.setEmail(email, authToken)
  }

  /**
   * This static method returns the email associated with the current user.
   * Iterable.getEmail returns a promise. Use the keyword `then` to get the result of the promise.
   *
   * parameters: none
   */

  static async getEmail (): Promise<string | undefined> {
    Iterable.logger.log('getEmail')

    return RNIterableAPI.getEmail()
  }

  /**
   * This static method associates the current user with the passed in userId parameter.
   *
   * Iterable's React Native SDK persists the user across app sessions and restarts, until you manually change the user using
   * Iterable.setEmail or Iterable.setUserId.
   *
   * User profile creation:
   *
   * If your Iterable project does not have a user with the passed in UserId, setUserId creates one and adds a placeholder email
   * address to the user's Iterable profile.
   *
   * Registering device token:
   *
   * If IterableConfig.autoPushRegisteration is set to true, calling setUserId automatically registers the device for push
   * notifications and sends the deviceId and token to Iterable.
   *
   * Optional JWT token parameter:
   *
   * An optional valid, pre-fetched JWT can be passed in to avoid race conditions.
   * The SDK uses this JWT to authenticate API requests for this user.
   *
   * Signing out a user from the SDK:
   *
   * To tell the SDK to sign out the current user, pass null into Iterable.setUserId.
   * If IterableConfig.autoPushRegisteration is set to true, calling Iterable.setUserId(null) prevents Iterable from sending further
   * push notifications to that user, for that app, on that device.
   * On the user's Iterable profile, endpointEnabled is set to false for the device.
   *
   * Note: specify a user by calling Iterable.setEmail or Iterable.setUserId, but NOT both.
   *
   * parameters: @param {string | undefined} userId user ID to associate with the current user
   * optional parameter: @param {string | undefined} authToken valid, pre-fecthed JWT the SDK can use to authenticate API requests, optional - if null/undefined, no JWT related action will be taken
   */

  static setUserId (userId: string | undefined, authToken?: string | undefined): void {
    Iterable.logger.log('setUserId: ' + userId)

    RNIterableAPI.setUserId(userId, authToken)
  }

  /**
   * This static method returns the userId associated with the current user.
   * Iterable.getUserId returns a promise. Use the keyword `then` to get the result of the promise.
   *
   * parameters: none
   */

  static async getUserId (): Promise<string | undefined> {
    Iterable.logger.log('getUserId')

    return RNIterableAPI.getUserId()
  }

  /**
   * This static method disables the device's token for the current user.
   *
   * parameters: none
   */

  static disableDeviceForCurrentUser (): void {
    Iterable.logger.log('disableDeviceForCurrentUser')

    RNIterableAPI.disableDeviceForCurrentUser()
  }

  /**
   * This static method returns the payload of the last push notification with which the user
   * opened the application (by clicking an action button, etc.).
   *
   * Iterable.getLastPushPayload returns a promise. Use the keyword `then` to get the result of the promise.
   *
   * Parameters: none
   */

  static async getLastPushPayload (): Promise<any | undefined> {
    Iterable.logger.log('getLastPushPayload')

    return RNIterableAPI.getLastPushPayload()
  }

  /**
   * This static method returns the attribution information stored.
   * The attribution information contains the campaign ID, template ID, and message ID of the message
   * that prompted the user to recently click a link.
   * See IterableAttributionInfo class defined above.
   *
   * Iterable.getAttributionInfo returns a promise that resolves to an IterableAttributionInfo object.
   * Use the keyword `then` to get the result of the promise.
   *
   * parameters: none
   */

  static async getAttributionInfo (): Promise<IterableAttributionInfo | undefined> {
    Iterable.logger.log('getAttributionInfo')

    return RNIterableAPI.getAttributionInfo().then((dict: any | undefined) => {
      if (dict) {
        return new IterableAttributionInfo(dict.campaignId as number, dict.templateId as number, dict.messageId as string)
      } else {
        return undefined
      }
    })
  }

  /**
   * This static method manually sets the current attribution information stored.
   * The attribution information contains the campaign ID, template ID, and message ID of the message
   * that prompted the user to recently click a link.
   * See IterableAttributionInfo class defined above.
   *
   * For deep link clicks, Iterable sets attribution information automatically.
   * However, use this method to set it manually if ever necessary.
   *
   * @param {attributionInfo} IterableAttributionInfo object storing current attribution info
   */

  static setAttributionInfo (attributionInfo?: IterableAttributionInfo): void {
    Iterable.logger.log('setAttributionInfo')

    RNIterableAPI.setAttributionInfo(attributionInfo)
  }

  /**
   * This static method creates a pushOpen event on the current user's Iterable profile,
   * populating it with data provided to the method call.
   *
   * @param {number} campaignId the ID of the campaign to associate with the push open
   * @param {number} templateId the ID of the template to associate with the push open
   * @param {string} messageId the ID of the message to associate with the push open
   * @param {boolean} appAlreadyRunning whether or not the app was already running when the push notification arrived
   * @param {any | undefined} dataFields information to store with the push open event
   */

  static trackPushOpenWithCampaignId (
    campaignId: number,
    templateId: number,
    messageId: string | undefined,
    appAlreadyRunning: boolean,
    dataFields: any | undefined
  ): void {
    Iterable.logger.log('trackPushOpenWithCampaignId')

    RNIterableAPI.trackPushOpenWithCampaignId(campaignId, templateId, messageId, appAlreadyRunning, dataFields)
  }

  /**
   * This static method updates the items saved in the shopping cart (or equivalent).
   * Represent each item in the updateCart event with an IterableCommerceItem object.
   * See IterableCommerceItem class defined above.
   *
   * @param {Array<IterableCommerceItem>} items the items added to the shopping cart
   */

  static updateCart (items: IterableCommerceItem[]): void {
    Iterable.logger.log('updateCart')

    RNIterableAPI.updateCart(items)
  }

  /**
   * This static method launches the application from the background for Android devices.
   *
   * parameters: none
   */

  static wakeApp (): void {
    if (Platform.OS === 'android') {
      Iterable.logger.log('Attempting to wake the app')

      RNIterableAPI.wakeApp()
    }
  }

  /**
   * This static method creates a purchase event on the current user's Iterable profile.
   * Represent each item in the purchase event with an IterableCommerceItem object.
   * See IterableCommerceItem class defined above.
   *
   * Note: total is a parameter that is passed in. Iterable does not sum the price fields of the various items in the purchase event.
   *
   * @param {number} total the total cost of the purchase
   * @param {Array<IterableCommerceItem>} items the items included in the purchase
   * @param {any | undefined} dataFields descriptive data to store on the purchase event
   */

  static trackPurchase (total: number, items: IterableCommerceItem[], dataFields: any | undefined): void {
    Iterable.logger.log('trackPurchase')

    RNIterableAPI.trackPurchase(total, items, dataFields)
  }

  /**
   * This static method creates an inAppOpen event for the specified message on the current user's profile
   * for manual tracking purposes. Iterable's SDK automatically tracks in-app message opens when you use the
   * SDK's default rendering.
   *
   * @param {IterableInAppMessage} message the in-app message (an IterableInAppMessage object)
   * @param {IterableInAppLocation} location the location of the in-app message (an IterableInAppLocation enum)
   */

  static trackInAppOpen (message: IterableInAppMessage, location: IterableInAppLocation): void {
    Iterable.logger.log('trackInAppOpen')

    RNIterableAPI.trackInAppOpen(message.messageId, location)
  }

  /**
   * This static method creates an inAppClick event for the specified message on the current user's profile
   * for manual tracking purposes. Iterable's SDK automatically tracks in-app message clicks when you use the
   * SDK's default rendering. Click events refer to click events within the in-app message to distinguish
   * from inAppOpen events.
   *
   * @param {IterableInAppMessage} message the in-app message (an IterableInAppMessage object)
   * @param {IterableInAppLocation} location the location of the in-app message (an IterableInAppLocation enum)
   * @param {string} clickedUrl the URL clicked by the user
   */

  static trackInAppClick (message: IterableInAppMessage, location: IterableInAppLocation, clickedUrl: string): void {
    Iterable.logger.log('trackInAppClick')

    RNIterableAPI.trackInAppClick(message.messageId, location, clickedUrl)
  }

  /**
   * This static method creates an inAppClose event for the specified message on the current user's profile
   * for manual tracking purposes. Iterable's SDK automatically tracks in-app message close events when you use the
   * SDK's default rendering.
   *
   * @param {IterableInAppMessage} message the in-app message (an IterableInAppMessage object)
   * @param {IterableInAppLocation} location the location of the in-app message (an IterableInAppLocation enum)
   * @param {IterableInAppCloseSource} source the way the in-app was closed (an IterableInAppCloseSource enum)
   * @param {string} clickedUrl the URL clicked by the user
   */

  static trackInAppClose (message: IterableInAppMessage, location: IterableInAppLocation, source: IterableInAppCloseSource, clickedUrl?: string | undefined): void {
    Iterable.logger.log('trackInAppClose')

    RNIterableAPI.trackInAppClose(message.messageId, location, source, clickedUrl)
  }

  /**
   * This static method removes the specifed message from the current user's message queue.
   * Also, creates an in-app delete event for the specified message on the current user's profile
   * unless otherwise specifed (specifying a source of IterableInAppDeleteSource.unknown prevents
   * an inAppDelete event from being created).
   *
   * @param {IterableInAppMessage} message the in-app message (an IterableInAppMessage object)
   * @param {IterableInAppLocation} location the location of the in-app message (an IterableInAppLocation enum)
   * @param {IterableInAppDeleteSource} source how the in-app message was deleted (an IterableInAppDeleteSource enum)
   */

  static inAppConsume (message: IterableInAppMessage, location: IterableInAppLocation, source: IterableInAppDeleteSource): void {
    Iterable.logger.log('inAppConsume')

    RNIterableAPI.inAppConsume(message.messageId, location, source)
  }

  /**
   * This static method creates a custom event to the current user's Iterable profile.
   * Pass in the name of the event stored in eventName key and the data associated with the event.
   * The eventType is set to "customEvent".
   *
   * @param {string} name the eventName of the custom event
   * @param {any | undefined} dataFields descriptive data to store on the custom event
   */
  static trackEvent (name: string, dataFields: any | undefined): void {
    Iterable.logger.log('trackEvent')

    RNIterableAPI.trackEvent(name, dataFields)
  }

  /**
  * This static method saves data to the current user's Iterable profile.
  *
  * If mergeNestedObjects is set to true, top-level objects in the passed in dataFields parameter
  * are merged with their counterparts that already exist on the user's profile.
  * Otherwise, they are added.
  *
  * If mergeNestedObjects is set to false, the top-level objects in the passed in dataFields parameter
  * overwrite their counterparts that already exist on the user's profile.
  * Otherwise, they are added.
  *
  * @param {any} dataFields data fields to store in user profile
  * @param {boolean} mergeNestedObjects flag indicating whether to merge top-level objects
  */
  static updateUser (dataFields: any, mergeNestedObjects: boolean): void {
    Iterable.logger.log('updateUser')

    RNIterableAPI.updateUser(dataFields, mergeNestedObjects)
  }

  /**
   * This static method changes the value of the email field on the current user's Iterable profile.
   *
   * If Iterable.setUserId was used to identify the current user, Iterable.updateEmail can be called to
   * give the current user a real (non-placeholder) email address.
   *
   * An optional valid, pre-fetched JWT can be passed in to avoid race conditions.
   * The SDK uses this JWT to authenticate API requests for this user.
   *
   * @param email the new email to set
   * @param authToken the new auth token (JWT) to set with the new email, optional - if null/undefined, no JWT-related action will be taken
   */

  static updateEmail (email: string, authToken?: string | undefined): void {
    Iterable.logger.log('updateEmail')

    RNIterableAPI.updateEmail(email, authToken)
  }

  /**
   * This static method handles a universal link whether it is internal to the application or an external link.
   * HandleAppLink will hand the passed in URL to IterableConfig.urlHandler, where it is determined whether or not
   * the app can handle the clicked URL.
   *
   * @param {string} link URL link to be handled
   */

  static async handleAppLink (link: string): Promise<boolean> {
    Iterable.logger.log('handleAppLink')

    return RNIterableAPI.handleAppLink(link)
  }

  /**
   * This static method updates the current user's subscribed email lists, unsubscribed channel IDs,
   * unsubscribed message type IDs (for opt-out message types), and subscribed message type IDs (for opt-in message types)
   * on the current user's profile.
   *
   * pass in null for any of emailListIds, unsubscribedChannelIds, unsubscribedMessageTypeIds, or subscribedMessageTypeIds
   * to indicate that Iterable should not change the current value on the current user's profile.
   *
   * @param {Array<number> | undefined} emailListIds the list of email lists (by ID) to which the user should be subscribed
   * @param {Array<number> | undefined} unsubscribedChannelIds the list of message channels (by ID) to which the user should be unsubscribed
   * @param {Array<number> | undefined} unsubscribedMessageTypeIds the list of message types (by ID) to which the user should be unsubscribed (for opt-out message types)
   * @param {Array<number> | undefined} subscribedMessageTypeIds the list of message types (by ID) to which the user should be subscribed (for opt-in message types)
   * @param {number} campaignId the campaign ID to associate with events generated by this request, use -1 if unknown or not applicable
   * @param {number} templateId the template ID to associate with events generated by this request, use -1 if unknown or not applicable
   */

  static updateSubscriptions (emailListIds: number[] | undefined,
    unsubscribedChannelIds: number[] | undefined,
    unsubscribedMessageTypeIds: number[] | undefined,
    subscribedMessageTypeIds: number[] | undefined,
    campaignId: number,
    templateId: number): void {
    Iterable.logger.log('updateSubscriptions')

    RNIterableAPI.updateSubscriptions(
      emailListIds,
      unsubscribedChannelIds,
      unsubscribedMessageTypeIds,
      subscribedMessageTypeIds,
      campaignId,
      templateId
    )
  }

  // PRIVATE
  private static setupEventHandlers (): void {
    // Remove all listeners to avoid duplicate listeners
    RNEventEmitter.removeAllListeners(EventName.handleUrlCalled)
    RNEventEmitter.removeAllListeners(EventName.handleInAppCalled)
    RNEventEmitter.removeAllListeners(EventName.handleCustomActionCalled)
    RNEventEmitter.removeAllListeners(EventName.handleAuthCalled)

    if (Iterable.savedConfig.urlHandler != null) {
      RNEventEmitter.addListener(
        EventName.handleUrlCalled,
        (dict) => {
          const url = dict.url
          const context = IterableActionContext.fromDict(dict.context)
          Iterable.wakeApp()

          if (Platform.OS === 'android') {
            // Give enough time for Activity to wake up.
            setTimeout(() => {
              callUrlHandler(url, context)
            }, 1000)
          } else {
            callUrlHandler(url, context)
          }
        }
      )
    }

    if (Iterable.savedConfig.customActionHandler != null) {
      RNEventEmitter.addListener(
        EventName.handleCustomActionCalled,
        (dict) => {
          const action = IterableAction.fromDict(dict.action)
          const context = IterableActionContext.fromDict(dict.context)
          Iterable.savedConfig.customActionHandler?.(action, context)
        }
      )
    }

    if (Iterable.savedConfig.inAppHandler != null) {
      RNEventEmitter.addListener(
        EventName.handleInAppCalled,
        (messageDict) => {
          const message = IterableInAppMessage.fromDict(messageDict)
          const result = Iterable.savedConfig.inAppHandler?.(message)
          RNIterableAPI.setInAppShowResponse(result)
        }
      )
    }

    if (Iterable.savedConfig.authHandler != null) {
      let authResponseCallback: AuthResponseCallback
      RNEventEmitter.addListener(
        EventName.handleAuthCalled,
        () => {
          Iterable.savedConfig.authHandler?.()
            .then(promiseResult => {
            // Promise result can be either just String OR of type AuthResponse.
            // If type AuthReponse, authToken will be parsed looking for `authToken` within promised object. Two additional listeners will be registered for success and failure callbacks sent by native bridge layer.
            // Else it will be looked for as a String.
              if (typeof promiseResult === typeof (new AuthResponse())) {
                RNIterableAPI.passAlongAuthToken((promiseResult as AuthResponse).authToken)

                setTimeout(() => {
                  if (authResponseCallback === AuthResponseCallback.SUCCESS) {
                    if ((promiseResult as AuthResponse).successCallback != null) {
                      (promiseResult as AuthResponse).successCallback?.()
                    }
                  } else if (authResponseCallback === AuthResponseCallback.FAILURE) {
                    if ((promiseResult as AuthResponse).failureCallback != null) {
                      (promiseResult as AuthResponse).failureCallback?.()
                    }
                  } else {
                    Iterable.logger.log('No callback received from native layer')
                  }
                }, 1000)
              } else if (typeof promiseResult === typeof '') {
                // If promise only returns string
                RNIterableAPI.passAlongAuthToken((promiseResult as String))
              } else {
                Iterable.logger.log('Unexpected promise returned. Auth token expects promise of String or AuthResponse type.')
              }
            }).catch(e => Iterable.logger.log(e))
        }
      )

      RNEventEmitter.addListener(
        EventName.handleAuthSuccessCalled,
        () => {
          authResponseCallback = AuthResponseCallback.SUCCESS
        }
      )
      RNEventEmitter.addListener(
        EventName.handleAuthFailureCalled,
        () => {
          authResponseCallback = AuthResponseCallback.FAILURE
        }
      )
    }

    function callUrlHandler (url: any, context: IterableActionContext): void {
      if (Iterable.savedConfig.urlHandler?.(url, context) != null) {
        Linking.canOpenURL(url)
          .then(canOpen => {
            if (canOpen) { Linking.openURL(url) }
          })
          .catch(reason => { Iterable.logger.log('could not open url: ' + reason) })
      }
    }
  }

  private static getVersionFromPackageJson (): string {
    const json = require('../package.json')
    const version = json.version as string
    return version
  }
}

export {
  Iterable,
  IterableAction,
  IterableActionContext,
  IterableAttributionInfo,
  IterableCommerceItem,
  EventName,
  IterableActionSource,
  IterableLogLevel
}
