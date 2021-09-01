'use strict'

import { NativeModules, NativeEventEmitter, Linking } from 'react-native'

import IterableConfig from './IterableConfig'
import IterableInAppMessage from './IterableInAppMessage'
import IterableInAppManager from './IterableInAppManager'

import {
  IterableInAppLocation,
  IterableInAppCloseSource,
  IterableInAppDeleteSource,
} from './IterableInAppClasses'

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

  constructor(type: string, data?: string, userInput?: string) {
    this.type = type
    this.data = data
    this.userInput = userInput
  }

  static fromDict(dict: any): IterableAction {
    return new IterableAction(dict["type"], dict["data"], dict["userInput"])
  }
}

class IterableActionContext {
  action: IterableAction
  source: IterableActionSource

  constructor(action: IterableAction, source: IterableActionSource) {
    this.action = action
    this.source = source
  }

  static fromDict(dict: any): IterableActionContext {
    const action = IterableAction.fromDict(dict["action"])
    const source = dict["actionSource"] as IterableActionSource
    return new IterableActionContext(action, source)
  }
}

class IterableAttributionInfo {
  campaignId: number
  templateId: number
  messageId: string

  constructor(campaignId: number, templateId: number, messageId: string) {
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
  categories?: Array<string>
  dataFields?: any

  constructor(id: string, name: string, price: number, quantity: number, sku?: string, description?: string, url?: string, imageUrl?: string, categories?: Array<string>, dataFields?: any | undefined) {
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
  handleUrlCalled = "handleUrlCalled",
  handleCustomActionCalled = "handleCustomActionCalled",
  handleInAppCalled = "handleInAppCalled",
  handleAuthCalled = "handleAuthCalled",
  receivedIterableInboxChanged = "receivedIterableInboxChanged"
}

class Iterable {
  /**
  * inAppManager instance
  */
  static inAppManager = new IterableInAppManager()

  /**
  * 
  * @param {string} apiKey 
  * @param {IterableConfig} config
  */
  static initialize(apiKey: string, config: IterableConfig = new IterableConfig()): Promise<boolean> {
    console.log("initialize: " + apiKey);

    this.setupEventHandlers(config)
    const version = this.getVersionFromPackageJson()

    return RNIterableAPI.initializeWithApiKey(apiKey, config.toDict(), version)
  }

  /**
  * DO NOT CALL THIS METHOD. 
  * This method is used internally to connect to staging environment.
  */
  static initialize2(apiKey: string, config: IterableConfig = new IterableConfig(), apiEndPoint: string): Promise<boolean> {
    console.log("initialize2: " + apiKey);

    this.setupEventHandlers(config)
    const version = this.getVersionFromPackageJson()

    return RNIterableAPI.initialize2WithApiKey(apiKey, config.toDict(), version, apiEndPoint)
  }

  /**
  * Set the user of the SDK by email address
  * @param {string | undefined} email the email address of the user
  */
  static setEmail(email: string | undefined) {
    console.log("setEmail: " + email)
    RNIterableAPI.setEmail(email)
  }

  /**
   * Get the email of the current user
   */
  static getEmail(): Promise<string | undefined> {
    console.log("getEmail")
    return RNIterableAPI.getEmail()
  }

  /**
  * Set the user of the SDK by ID
  * @param {string | undefined} userId the ID of the user
  */
  static setUserId(userId: string | undefined) {
    console.log("setUserId: " + userId)
    RNIterableAPI.setUserId(userId)
  }

  /**
   * Get the user ID of the current user
   */
  static getUserId(): Promise<string | undefined> {
    console.log("getUserId")
    return RNIterableAPI.getUserId()
  }

  /**
   * 
   */
  static disableDeviceForCurrentUser() {
    console.log("disableDeviceForCurrentUser")
    RNIterableAPI.disableDeviceForCurrentUser()
  }

  /**
   * 
   */
  static getLastPushPayload(): Promise<any | undefined> {
    console.log("getLastPushPayload")
    return RNIterableAPI.getLastPushPayload()
  }

  /**
   * 
   */
  static getAttributionInfo(): Promise<IterableAttributionInfo | undefined> {
    console.log("getAttributionInfo")
    return RNIterableAPI.getAttributionInfo().then((dict: any | undefined) => {
      if (dict) {
        return new IterableAttributionInfo(dict["campaignId"] as number, dict["templateId"] as number, dict["messageId"] as string)
      } else {
        return undefined
      }
    })
  }

  /**
  * 
  * Attribution info (campaignId, messageId etc.) for last push open or app link click from an email.
  * @param {attributionInfo} IterableAttributionInfo 
  */
  static setAttributionInfo(attributionInfo?: IterableAttributionInfo) {
    console.log("setAttributionInfo")
    RNIterableAPI.setAttributionInfo(attributionInfo)
  }

  /**
  * 
  * @param {number} campaignId 
  * @param {number} templateId 
  * @param {string} messageId 
  * @param {boolean} appAlreadyRunning 
  * @param {any | undefined} dataFields 
  */
  static trackPushOpenWithCampaignId(campaignId: number, templateId: number, messageId: string | undefined, appAlreadyRunning: boolean, dataFields: any | undefined) {
    console.log("trackPushOpenWithCampaignId")
    RNIterableAPI.trackPushOpenWithCampaignId(campaignId, templateId, messageId, appAlreadyRunning, dataFields)
  }

  /**
   * 
   * @param {Array<IterableCommerceItem>} items
   */
  static updateCart(items: Array<IterableCommerceItem>) {
    console.log("updateCart")
    RNIterableAPI.updateCart(items)
  }

  /**
  * 
  * @param {number} total 
  * @param {Array<IterableCommerceItem>} items 
  * @param {any | undefined} dataFields 
  */
  static trackPurchase(total: number, items: Array<IterableCommerceItem>, dataFields: any | undefined) {
    console.log("trackPurchase")
    RNIterableAPI.trackPurchase(total, items, dataFields)
  }

  /**
  * 
  * @param {IterableInAppMessage} message 
  * @param {IterableInAppLocation} location 
  */
  static trackInAppOpen(message: IterableInAppMessage, location: IterableInAppLocation) {
    console.log("trackInAppOpen")
    RNIterableAPI.trackInAppOpen(message.messageId, location)
  }

  /**
  * 
  * @param {IterableInAppMessage} message 
  * @param {IterableInAppLocation} location 
  * @param {string} clickedUrl 
  */
  static trackInAppClick(message: IterableInAppMessage, location: IterableInAppLocation, clickedUrl: string) {
    console.log("trackInAppClick")
    RNIterableAPI.trackInAppClick(message.messageId, location, clickedUrl)
  }

  /**
  * 
  * @param {IterableInAppMessage} message 
  * @param {IterableInAppLocation} location 
  * @param {IterableInAppCloseSource} source
  * @param {string} clickedUrl 
  */
  static trackInAppClose(message: IterableInAppMessage, location: IterableInAppLocation, source: IterableInAppCloseSource, clickedUrl: string) {
    console.log("trackInAppClose")
    RNIterableAPI.trackInAppClose(message.messageId, location, source, clickedUrl)
  }

  /**
  * 
  * @param {IterableInAppMessage} message 
  * @param {IterableInAppLocation} location 
  * @param {IterableInAppDeleteSource} source
  */
  static inAppConsume(message: IterableInAppMessage, location: IterableInAppLocation, source: IterableInAppDeleteSource) {
    console.log("inAppConsume")
    RNIterableAPI.inAppConsume(message.messageId, location, source)
  }

  /**
  * 
  * @param {string} name 
  * @param {any | undefined} dataFields 
  */
  static trackEvent(name: string, dataFields: any | undefined) {
    console.log("trackEvent")
    RNIterableAPI.trackEvent(name, dataFields)
  }

  /**
  * 
  * @param {any} dataFields Data fields to store in user profile
  * @param {boolean} mergeNestedObjects Whether to merge top level objects instead of overwriting
  */
  static updateUser(dataFields: any, mergeNestedObjects: boolean) {
    console.log("updateUser")
    RNIterableAPI.updateUser(dataFields, mergeNestedObjects)
  }

  /**
  * 
  * @param email the new email to set
  */
  static updateEmail(email: string) {
    console.log("updateEmail")
    RNIterableAPI.updateEmail(email)
  }

  /**
  * 
  * @param {string} link URL in string form to be either opened as an app link or as a normal one
  */
  static handleAppLink(link: string): Promise<boolean> {
    console.log("handleAppLink")
    return RNIterableAPI.handleAppLink(link)
  }

  /**
  * 
  * @param {Array<number> | undefined} emailListIds the list of lists (by ID) that a user is subscribed to
  * @param {Array<number> | undefined} unsubscribedChannelIds the list of channels (by ID) to unsubscribe from
  * @param {Array<number> | undefined} unsubscribedMessageTypeIds the list of message types (by ID) to unsubscribe from
  * @param {Array<number> | undefined} subscribedMessageTypeIds the list of message types (by ID) to subscribe to
  * @param {number} campaignId the ID of the campaign to attribute unsubscribes, pass -1 for unknown campaignId
  * @param {number} templateId the ID of the template to attribute unsubscribes, pass -1 for unknown templateId
  */
  static updateSubscriptions(emailListIds: Array<number> | undefined,
    unsubscribedChannelIds: Array<number> | undefined,
    unsubscribedMessageTypeIds: Array<number> | undefined,
    subscribedMessageTypeIds: Array<number> | undefined,
    campaignId: number,
    templateId: number) {
    console.log("updateSubscriptions")
    RNIterableAPI.updateSubscriptions(emailListIds, unsubscribedChannelIds, unsubscribedMessageTypeIds, subscribedMessageTypeIds, campaignId, templateId)
  }

  // PRIVATE
  private static setupEventHandlers(config: IterableConfig) {
    if (config.urlHandler) {
      RNEventEmitter.addListener(
        EventName.handleUrlCalled,
        (dict) => {
          const url = dict["url"]
          const context = IterableActionContext.fromDict(dict["context"])
          if (config.urlHandler!(url, context) == false) {
            Linking.canOpenURL(url)
              .then(canOpen => {
                if (canOpen) { Linking.openURL(url) }
              })
              .catch(reason => { console.log("could not open url: " + reason) })
          }
        }
      )
    }

    if (config.customActionHandler) {
      RNEventEmitter.addListener(
        EventName.handleCustomActionCalled,
        (dict) => {
          const action = IterableAction.fromDict(dict["action"])
          const context = IterableActionContext.fromDict(dict["context"])
          config.customActionHandler!(action, context)
        }
      )
    }

    if (config.inAppHandler) {
      RNEventEmitter.addListener(
        EventName.handleInAppCalled,
        (messageDict) => {
          const message = IterableInAppMessage.fromDict(messageDict)
          const result = config.inAppHandler!(message)
          RNIterableAPI.setInAppShowResponse(result)
        }
      )
    }

    if (config.authHandler) {
      RNEventEmitter.addListener(
        EventName.handleAuthCalled,
        () => {
          config.authHandler!()
            .then(authToken => {
              RNIterableAPI.passAlongAuthToken(authToken)
            })
        }
      )
    }

    // setup silent push support
    Iterable.addSilentPushHandler()
  }

  private static addSilentPushHandler() {
    RNEventEmitter.addListener(
      EventName.receivedIterableInboxChanged,
      () => {
        console.log("received new inbox in-apps")
      })
  }

  private static getVersionFromPackageJson(): string {
    const json = require('../package.json')
    const version = json["version"] as string
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