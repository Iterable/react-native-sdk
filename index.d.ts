export class Iterable {
    static inAppManager: IterableInAppManager
    static initialize(apiKey: string, config: IterableConfig): void
    static setEmail(email: string): void
    static getEmail(): Promise<String | null>
    static setUserId(userId: string): void
    static getUserId(): Promise<String | null>
    static disableDeviceForCurrentUser(): void
    static disableDeviceForAllUsers(): void
    static getLastPushPayload(): Promise<any | null>
    static getAttributionInfo(): Promise<IterableAttributionInfo | null>
    static setAttributionInfo(attributionInfo?: IterableAttributionInfo): void
    static trackPushOpenWithPayload(payload: any, dataFields: any | null): void
    static trackPushOpenWithCampaignId(campaignId: number, templateId: number, messageId: String | null, appAlreadyRunning: Boolean, dataFields: any | null): void
    static trackPurchase(total: number, items: Array<IterableCommerceItem>, dataFields: any | null): void
    static trackInAppOpen(message: IterableInAppMessage, location: IterableInAppLocation): void
    static trackInAppClick(message: IterableInAppMessage, location: IterableInAppLocation, clickedUrl: String): void
    static inAppConsume(message: IterableInAppMessage, location: IterableInAppLocation, source: IterableInAppDeleteSource): void
    static trackEvent(name: String, dataFields: any | null): void
    static updateUser(dataFields: any, mergeNestedObjects: Boolean): void
    static updateEmail(email: String): void
    static handleUniversalLink: String): Promise<Boolean>
}

export enum PushServicePlatform {
    sandbox = 0,
    production = 1,
    auto = 2
}

export enum IterableActionSource {
    push = 0,
    universalLink = 1,
    inApp = 2
}

export class IterableConfig {
    pushIntegrationName?: String
    sandboxPushIntegrationName?: String
    pushPlatform: PushServicePlatform
    autoPushRegistration: Boolean
    checkForDeferredDeeplink: Boolean
    inAppDisplayInterval: number
    urlDelegate?: (url: String, context: IterableActionContext) => Boolean
    customActionDelegate?: (action: IterableAction, context: IterableActionContext) => Boolean
    inAppDelegate?: (message: IterableInAppMessage) => IterableInAppShowResponse
}

export class IterableAction {
    type: String
    data?: String
    userInput?: String

    constructor(type: String, data?: String, userInput?: String)
}

export class IterableActionContext {
    action: IterableAction
    source: IterableActionSource

    constructor(action: IterableAction, source: IterableActionSource)
}

export class IterableAttributionInfo {
    campaignId: number
    templateId: number
    messageId: String

    constructor(campaignId: number, templateId: number, messageId: String)
}

export class IterableCommerceItem {
    id: String
    name: String
    price: number
    quantity: number

    constructor(id: String, name: String, price: number, quantity: number)
}

export enum IterableInAppShowResponse {
    show = 0,
    skip = 1
}

export enum IterableInAppTriggerType {
    immediate = 0,
    event = 1,
    never = 2,
}

export class IterableInAppTrigger {
    type: IterableInAppTriggerType

    constructor(type: IterableInAppTriggerType)

    static fromDict(dict: any): IterableInAppTrigger
}

export enum IterableInAppContentType {
    html = 0,
    alert = 1,
    banner = 2,
}

export class IterableEdgeInsets {
    top: number
    left: number
    bottom: number
    right: number

    constructor(top: number, left: number, bottom: number, right: number)

    static fromDict(dict: any): IterableEdgeInsets
}

export interface IterableInAppContent {
    type: IterableInAppContentType
}

export class IterableHtmlInAppContent implements IterableInAppContent {
    type: IterableInAppContentType
    edgeInsets: IterableEdgeInsets
    backgroundAlpha: number
    html: String

    constructor(edgeInsets: IterableEdgeInsets, backgroundAlpha: number, html: String)

    static fromDict(dict: any): IterableHtmlInAppContent
}

export class IterableInboxMetadata {
    title?: String
    subTitle?: String
    icon?: String

    constructor(title: String | undefined, subTitle: String | undefined, icon: String | undefined)

    static fromDict(dict: any): IterableInboxMetadata
}

export class IterableInAppMessage {
    readonly messageId: String
    readonly campaignId: String
    readonly trigger: IterableInAppTrigger
    readonly createdAt?: Date
    readonly expiresAt?: Date
    readonly saveToInbox: Boolean
    readonly inboxMetadata: IterableInboxMetadata
    readonly customPayload?: any
    readonly read: Boolean

    constructor(messageId: String, 
        campaignId: String, 
        trigger: IterableInAppTrigger, 
        createdAt: Date | undefined, 
        expiresAt: Date | undefined, 
        saveToInbox: Boolean, 
        inboxMetadata: IterableInboxMetadata,
        customPayload: any | undefined,
        read: Boolean)

    isSilentInbox(): Boolean

    static fromDict(dict: any): IterableInAppMessage
}

export enum IterableInAppLocation {
    inApp = 0,
    inbox = 1,
}

export enum IterableInAppCloseSource {
    back = 0,
    link = 1,
    unknown = 100,
}

export enum IterableInAppDeleteSource {
    inboxSwipe = 0,
    deleteButton = 1,
    unknown = 100,
}

export class IterableInAppManager {
    getMessages(): Promise<Array<IterableInAppMessage>>
    showMessage(message: IterableInAppMessage, consume: Boolean): Promise<String | null>
    removeMessage(message: IterableInAppMessage, location: IterableInAppLocation, source: IterableInAppDeleteSource): void
    setReadForMessage(message: IterableInAppMessage, read: Boolean): void
}

