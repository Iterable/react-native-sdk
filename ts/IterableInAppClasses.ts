'use strict';

import { NativeModules } from 'react-native';
const RNIterableAPI = NativeModules.RNIterableAPI


enum IterableInAppShowResponse {
  show = 0,
  skip = 1
}

enum IterableInAppTriggerType {
  immediate = 0,
  event = 1,
  never = 2,
}

class IterableInAppTrigger {
  type: IterableInAppTriggerType
  
  constructor(type: IterableInAppTriggerType) {
    this.type = type
  }
  
  static fromDict(dict: any): IterableInAppTrigger {
    const type = dict["type"] as IterableInAppTriggerType | IterableInAppTriggerType.immediate
    return new IterableInAppTrigger(type)
  }
}

enum IterableInAppContentType {
  html = 0,
  alert = 1,
  banner = 2,
}

enum IterableInAppLocation {
  inApp = 0,
  inbox = 1,
}

enum IterableInAppCloseSource {
  back = 0,
  link = 1,
  unknown = 100,
}

enum IterableInAppDeleteSource {
  inboxSwipe = 0,
  deleteButton = 1,
  unknown = 100,
}

class IterableEdgeInsets {
  top: number
  left: number
  bottom: number
  right: number
  
  constructor(top: number, left: number, bottom: number, right: number) {
    this.top = top
    this.left = left
    this.bottom = bottom
    this.right = right
  }
  
  static fromDict(dict: any): IterableEdgeInsets {
    return new IterableEdgeInsets(dict["top"] as number, dict["left"] as number, dict["bottom"] as number, dict["right"] as number)
  }
}

export interface IterableInAppContent {
  type: IterableInAppContentType
}

class IterableHtmlInAppContent implements IterableInAppContent {
  type: IterableInAppContentType = IterableInAppContentType.html
  edgeInsets: IterableEdgeInsets
  backgroundAlpha: number
  html: string
  
  constructor(edgeInsets: IterableEdgeInsets, backgroundAlpha: number, html: string) {
    this.edgeInsets = edgeInsets
    this.backgroundAlpha = backgroundAlpha
    this.html = html
  }
  
  static fromDict(dict: any): IterableHtmlInAppContent {
    return new IterableHtmlInAppContent(
      IterableEdgeInsets.fromDict(dict["edgeInsets"]), 
      dict["backgroundAlpha"] as number, 
      dict["html"] as string)
    }
  }
  
  class IterableInboxMetadata {
    title?: string
    subTitle?: string
    icon?: string
    
    constructor(title: string | undefined, subTitle: string | undefined, icon: string | undefined) {
      this.title = title
      this.subTitle = subTitle
      this.icon = icon
    }
    
    static fromDict(dict: any): IterableInboxMetadata {
      return new IterableInboxMetadata(dict["title"], dict["subtitle"], dict["icon"])
    }
  }
  
  class IterableInAppMessage {
    readonly messageId: string
    readonly campaignId: string
    readonly trigger: IterableInAppTrigger
    readonly createdAt?: Date
    readonly expiresAt?: Date
    readonly saveToInbox: Boolean
    readonly inboxMetadata?: IterableInboxMetadata
    readonly customPayload?: any
    readonly read: Boolean
    
    constructor(messageId: string, 
      campaignId: string, 
      trigger: IterableInAppTrigger, 
      createdAt: Date | undefined, 
      expiresAt: Date | undefined, 
      saveToInbox: Boolean, 
      inboxMetadata: IterableInboxMetadata | undefined,
      customPayload: any | undefined,
      read: Boolean) {
        this.campaignId = campaignId
        this.messageId = messageId
        this.trigger = trigger
        this.createdAt = createdAt
        this.expiresAt = expiresAt
        this.saveToInbox = saveToInbox
        this.inboxMetadata = inboxMetadata
        this.customPayload = customPayload
        this.read = read
      }
      
      isSilentInbox(): Boolean {
        return this.saveToInbox && this.trigger.type == IterableInAppTriggerType.never
      }
      
      static fromDict(dict: any): IterableInAppMessage {
        const messageId = dict["messageId"] as string
        const campaignId = dict["campaignId"] as string
        const trigger = IterableInAppTrigger.fromDict(dict["trigger"])
        let createdAt = dict["createdAt"] 
        if (createdAt) {
          createdAt = new Date(createdAt as number)
        }
        let expiresAt = dict["expiresAt"] 
        if (expiresAt) {
          expiresAt = new Date(expiresAt as number)
        }
        let saveToInbox = dict["saveToInbox"] as Boolean
        let inboxMetadataDict = dict["inboxMetadata"]
        let inboxMetadata: IterableInboxMetadata | undefined
        if (inboxMetadataDict) {
          inboxMetadata = IterableInboxMetadata.fromDict(inboxMetadataDict)
        } else {
          inboxMetadata = undefined
        }
        let customPayload = dict["customPayload"]
        let read = dict["read"] as Boolean
        
        return new IterableInAppMessage(
          messageId,
          campaignId,
          trigger,
          createdAt,
          expiresAt,
          saveToInbox,
          inboxMetadata,
          customPayload,
          read
          )
        }        
      }
      
      class IterableInAppManager {
        getMessages(): Promise<Array<IterableInAppMessage>> {
          console.log("InAppManager.getMessages");
          return RNIterableAPI.getInAppMessages().then((messages: Array<any>) => messages.map (message => {return IterableInAppMessage.fromDict(message)}))
        }
        
        showMessage(message: IterableInAppMessage, consume: Boolean): Promise<string | undefined> {
          console.log("InAppManager.show")
          return RNIterableAPI.showMessage(message.messageId, consume)
        }
        
        removeMessage(message: IterableInAppMessage, location: IterableInAppLocation, source: IterableInAppDeleteSource): void {
          console.log("InAppManager.remove")
          return RNIterableAPI.removeMessage(message.messageId, location, source)
        }
        
        setReadForMessage(message: IterableInAppMessage, read: Boolean) {
          console.log("InAppManager.setRead")
          RNIterableAPI.setReadForMessage(message.messageId, read)
        }
      }
      
      export { 
        IterableInAppShowResponse,
        IterableInAppTriggerType, 
        IterableInAppTrigger,
        IterableInAppContentType,
        IterableEdgeInsets,
        IterableHtmlInAppContent,
        IterableInboxMetadata,
        IterableInAppMessage,
        IterableInAppLocation,
        IterableInAppCloseSource,
        IterableInAppDeleteSource,
        IterableInAppManager,
      }
      