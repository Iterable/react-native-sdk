'use strict'

import { IterableUtil } from './IterableUtil'

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
  html: string

  constructor(edgeInsets: IterableEdgeInsets, html: string) {
    this.edgeInsets = edgeInsets
    this.html = html
  }

  static fromDict(dict: any): IterableHtmlInAppContent {
    return new IterableHtmlInAppContent(
      IterableEdgeInsets.fromDict(dict["edgeInsets"]),
      dict["html"] as string)
  }
}

class IterableInboxMetadata {
  title?: string
  subtitle?: string
  icon?: string

  constructor(title: string | undefined, subtitle: string | undefined, icon: string | undefined) {
    this.title = title
    this.subtitle = subtitle
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
  /**
   * the priority value this in-app message has
   */
  readonly priorityLevel: number

  constructor(messageId: string,
    campaignId: number,
    trigger: IterableInAppTrigger,
    createdAt: Date | undefined,
    expiresAt: Date | undefined,
    saveToInbox: boolean,
    inboxMetadata: IterableInboxMetadata | undefined,
    customPayload: any | undefined,
    read: boolean,
    priorityLevel: number) {
    this.campaignId = campaignId
    this.messageId = messageId
    this.trigger = trigger
    this.createdAt = createdAt
    this.expiresAt = expiresAt
    this.saveToInbox = saveToInbox
    this.inboxMetadata = inboxMetadata
    this.customPayload = customPayload
    this.read = read
    this.priorityLevel = priorityLevel
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
      var dateObject = new Date(0)
      createdAt = dateObject.setUTCMilliseconds(createdAt)
    }
    let expiresAt = dict["expiresAt"]
    if (expiresAt) {
      var dateObject = new Date(0)
      expiresAt = dateObject.setUTCMilliseconds(expiresAt)
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

    let priorityLevel = dict["priorityLevel"] as number

    return new IterableInAppMessage(
      messageId,
      campaignId,
      trigger,
      createdAt,
      expiresAt,
      saveToInbox,
      inboxMetadata,
      customPayload,
      read,
      priorityLevel
    )
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
}
