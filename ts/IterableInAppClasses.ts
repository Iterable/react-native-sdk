'use strict'

import { NativeModules } from 'react-native'
import { IterableUtil } from './IterableUtil'

const RNIterableAPI = NativeModules.RNIterableAPI

/**
 * `show` to show the in-app otherwise `skip` to skip.
 */
enum IterableInAppShowResponse {
  show = 0,
  skip = 1
}

/**
 * `immediate` will try to display the in-app automatically immediately
 * `event` is used for Push to in-app
 * `never` will not display the in-app automatically via the SDK
 */
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

/**
 * Iterable in-app message
 */
class IterableInAppMessage {
  /**
   * the ID for the in-app message
   */
  readonly messageId: string
  /**
   * the campaign ID for this message
   */
  readonly campaignId: number
  /**
   * when to trigger this in-app
   */
  readonly trigger: IterableInAppTrigger
  /**
   * when was this message created
   */
  readonly createdAt?: Date
  /**
   * when to expire this in-app (undefined means do not expire)
   */
  readonly expiresAt?: Date
  /**
   * Whether to save this message to inbox
   */
  readonly saveToInbox: boolean
  /**
   * Metadata such as title, subtitle etc. needed to display this in-app message in inbox.
   */
  readonly inboxMetadata?: IterableInboxMetadata
  /**
   * Custom Payload for this message.
   */
  readonly customPayload?: any
  /**
   * Whether this inbox message has been read
   */
  readonly read: boolean

  constructor(messageId: string,
    campaignId: number,
    trigger: IterableInAppTrigger,
    createdAt: Date | undefined,
    expiresAt: Date | undefined,
    saveToInbox: boolean,
    inboxMetadata: IterableInboxMetadata | undefined,
    customPayload: any | undefined,
    read: boolean) {
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

  isSilentInbox(): boolean {
    return this.saveToInbox && this.trigger.type == IterableInAppTriggerType.never
  }

  static fromDict(dict: any): IterableInAppMessage {
    const messageId = dict["messageId"] as string
    const campaignId = dict["campaignId"] as number
    const trigger = IterableInAppTrigger.fromDict(dict["trigger"])
    let createdAt = dict["createdAt"]
    if (createdAt) {
      createdAt = new Date(createdAt as number)
    }
    let expiresAt = dict["expiresAt"]
    if (expiresAt) {
      expiresAt = new Date(expiresAt as number)
    }
    let saveToInbox = IterableUtil.readBoolean(dict, "saveToInbox")
    let inboxMetadataDict = dict["inboxMetadata"]
    let inboxMetadata: IterableInboxMetadata | undefined
    if (inboxMetadataDict) {
      inboxMetadata = IterableInboxMetadata.fromDict(inboxMetadataDict)
    } else {
      inboxMetadata = undefined
    }
    let customPayload = dict["customPayload"]
    let read = IterableUtil.readBoolean(dict, "read")

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
  /**
   * Returns a list of all in-app messages.
   */
  getMessages(): Promise<Array<IterableInAppMessage>> {
    console.log("InAppManager.getMessages");
    return RNIterableAPI.getInAppMessages().then((messages: Array<any>) => messages.map(message => { return IterableInAppMessage.fromDict(message) }))
  }

  /**
   * 
   * @param {IterableInAppMessage} message The message to show
   * @param {boolean} consume Set to true to consume the event from the server queue if the message is shown. This should be default.
   */
  showMessage(message: IterableInAppMessage, consume: boolean): Promise<string | undefined> {
    console.log("InAppManager.show")
    return RNIterableAPI.showMessage(message.messageId, consume)
  }

  /**
   * 
   * @param {IterableInAppMessage} message The message to remove
   * @param {IterableInAppLocation} location 
   * @param {IterableInAppDeleteSource} source 
   */
  removeMessage(message: IterableInAppMessage, location: IterableInAppLocation, source: IterableInAppDeleteSource): void {
    console.log("InAppManager.remove")
    return RNIterableAPI.removeMessage(message.messageId, location, source)
  }

  /**
   * 
   * @param {IterableInAppMessage} message 
   * @param {boolean} read 
   */
  setReadForMessage(message: IterableInAppMessage, read: boolean) {
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
