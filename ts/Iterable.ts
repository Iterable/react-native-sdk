'use strict';

import { NativeModules, NativeEventEmitter } from 'react-native';
import { 
  IterableInAppMessage, 
  IterableInAppShowResponse, 
  IterableInAppLocation,
  IterableInAppCloseSource,
  IterableInAppDeleteSource,
  IterableInAppManager,
} from './IterableInAppClasses'

const RNIterableAPI = NativeModules.RNIterableAPI
const RNEventEmitter = new NativeEventEmitter(RNIterableAPI)

enum PushServicePlatform {
  sandbox = 0,
  production = 1,
  auto = 2
}

enum IterableActionSource {
  push = 0,
  universalLink = 1,
  inApp = 2
}

class IterableConfig {
  pushIntegrationName?: string
  sandboxPushIntegrationName?: string
  pushPlatform: PushServicePlatform = PushServicePlatform.auto
  autoPushRegistration = true
  checkForDeferredDeeplink = false
  inAppDisplayInterval: number = 30.0
  urlDelegate?: (url: string, context: IterableActionContext) => Boolean
  customActionDelegate?: (action: IterableAction, context: IterableActionContext) => Boolean
  inAppDelegate?: (message: IterableInAppMessage) => IterableInAppShowResponse
  
  toDict(): any {
    return {
      "pushIntegrationName": this.pushIntegrationName,
      "sandboxPushIntegrationName": this.sandboxPushIntegrationName,
      "pushPlatform": this.pushPlatform,
      "autoPushRegistration": this.autoPushRegistration,
      "checkForDeferredDeeplink": this.checkForDeferredDeeplink,
      "inAppDisplayInterval": this.inAppDisplayInterval,
      "urlDelegatePresent": this.urlDelegate != undefined,
      "customActionDelegatePresent": this.customActionDelegate != undefined,
      "inAppDelegatePresent": this.inAppDelegate != undefined,
    }
  }
}

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
  
  constructor(id: string, name: string, price: number, quantity: number) {
    this.id = id
    this.name = name
    this.price = price
    this.quantity = quantity
  }
}

enum EventName {
  handleUrlCalled = "handleUrlCalled",
  handleCustomActionCalled = "handleCustomActionCalled",
  handleInAppCalled = "handleInAppCalled",
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
  static initialize(apiKey: string, config: IterableConfig = new IterableConfig()) {
    console.log("initialize: " + apiKey);
    
    if (config.urlDelegate) {
      RNEventEmitter.addListener(
        EventName.handleUrlCalled,
        (dict) => {
          const url = dict["url"]
          const context = IterableActionContext.fromDict(dict["context"])
          const result = config.urlDelegate!(url, context)
          RNIterableAPI.setUrlHandled(result)
        }
        )
      }
      if (config.customActionDelegate) {
        RNEventEmitter.addListener(
          EventName.handleCustomActionCalled,
          (dict) => {
            const action = IterableAction.fromDict(dict["action"])
            const context = IterableActionContext.fromDict(dict["context"])
            config.customActionDelegate!(action, context)
          }
          )
        }
        if (config.inAppDelegate) {
          RNEventEmitter.addListener(
            EventName.handleInAppCalled,
            (messageDict) => {
              const message = IterableInAppMessage.fromDict(messageDict)
              const result = config.inAppDelegate!(message)
              RNIterableAPI.setInAppShowResponse(result)
            }
            )
          }
          
          RNIterableAPI.initializeWithApiKey(apiKey, config.toDict())
        }
        
        /**
        * 
        * @param {string} email 
        */
        static setEmail(email: string | undefined) {
          console.log("setEmail: " + email);
          RNIterableAPI.setEmail(email);
        }
        
        static getEmail(): Promise<string | undefined> {
          console.log("getEmail")
          return RNIterableAPI.getEmail()
        }
        
        /**
        * 
        * @param {string} email 
        */
        static setUserId(userId: string) {
          console.log("setUserId: " + userId);
          RNIterableAPI.setUserId(userId);
        }
        
        static getUserId(): Promise<string | undefined> {
          console.log("getUserId")
          return RNIterableAPI.getUserId()
        }
        
        static disableDeviceForCurrentUser() {
          console.log("disableDeviceForCurrentUser")
          RNIterableAPI.disableDeviceForCurrentUser()
        }
        
        static disableDeviceForAllUsers() {
          console.log("disableDeviceForAllUsers")
          RNIterableAPI.disableDeviceForAllUsers()
        }
        
        static getLastPushPayload(): Promise<any | undefined> {
          console.log("getLastPushPayload")
          return RNIterableAPI.getLastPushPayload()
        }
        
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
        * @param {any} payload 
        * @param {any | undefined} dataFields 
        */
        static trackPushOpenWithPayload(payload: any, dataFields: any | undefined) {
          console.log("trackPushOpenWithPayload")
          RNIterableAPI.trackPushOpenWithPayload(payload, dataFields)
        }
        
        /**
        * 
        * @param {number} campaignId 
        * @param {number} templateId 
        * @param {string | undefined} messageId 
        * @param {Boolean} appAlreadyRunning 
        * @param {any | undefined} dataFields 
        */
        static trackPushOpenWithCampaignId(campaignId: number, templateId: number, messageId: string | undefined, appAlreadyRunning: Boolean, dataFields: any | undefined) {
          console.log("trackPushOpenWithCampaignId")
          RNIterableAPI.trackPushOpenWithCampaignId(campaignId, templateId, messageId, appAlreadyRunning, dataFields)
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
        * @param {Boolean} mergeNestedObjects Whether to merge top level objects instead of overwriting
        */
        static updateUser(dataFields: any, mergeNestedObjects: Boolean) {
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
        * @param {string} universalLink URL in string form to be either opened as a universal link or as a normal one
        */
        static handleUniversalLink(link: string): Promise<Boolean> {
          console.log("handleUniversalLink")
          return RNIterableAPI.handleUniversalLink(link)
        }
        
        /**
        * 
        * @param {Array<number> | undefined} emailListIds the list of lists (by ID) that a user is subscribed to
        * @param {Array<number> | undefined} unsubscribedChannelIds the list of channels (by ID) to unsubscribe from
        * @param {Array<number> | undefined} unsubscribedMessageTypeIds the list of message types (by ID) to unsubscribe from
        * @param {Array<number> | undefined} subscribedMessageTypeIds the list of message types (by ID) to subscribe to
        * @param {number | undefined} campaignId the ID of the campaign to attribute unsubscribes
        * @param {number | undefined} templateId the ID of the template to attribute unsubscribes
        */
        static updateSubscriptions(emailListIds: Array<number> | undefined, 
          unsubscribedChannelIds: Array<number> | undefined,
          unsubscribedMessageTypeIds: Array<number> | undefined,
          subscribedMessageTypeIds: Array<number> | undefined,
          campaignId: number | undefined,
          templateId: number | undefined) {
            console.log("updateSubscriptions")
            RNIterableAPI.updateSubscriptions(emailListIds, unsubscribedChannelIds, unsubscribedMessageTypeIds, subscribedMessageTypeIds, campaignId, templateId)
          }
        }
        
        export { Iterable, IterableConfig, PushServicePlatform, IterableAction, IterableActionContext, IterableAttributionInfo, IterableCommerceItem };
        