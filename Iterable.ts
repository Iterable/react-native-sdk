// @flow
'use strict';

import { NativeModules, NativeEventEmitter } from 'react-native';

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
    pushIntegrationName?: String
    sandboxPushIntegrationName?: String
    pushPlatform: PushServicePlatform = PushServicePlatform.auto
    autoPushRegistration = true
    checkForDeferredDeeplink = false
    inAppDisplayInterval: number = 30.0
    urlDelegate?: (url: String, context: IterableActionContext) => Boolean
    customActionDelegate?: (action: IterableAction, context: IterableActionContext) => Boolean
}

class IterableAction {
    type: String
    data?: String
    userInput?: String
    
    constructor(type: String, data?: String, userInput?: String) {
        this.type = type
        this.data = data
        this.userInput = userInput
    }
}

class IterableActionContext {
    action: IterableAction
    source: IterableActionSource

    constructor(action: IterableAction, source: IterableActionSource) {
        this.action = action
        this.source = source
    }
}

class IterableAttributionInfo {
    campaignId: number
    templateId: number
    messageId: String

    constructor(campaignId: number, templateId: number, messageId: String) {
        this.campaignId = campaignId
        this.templateId = templateId
        this.messageId = messageId
    }
}

enum EventName {
    handleUrlCalled = "handleUrlCalled",
    handleCustomActionCalled = "handleCustomActionCalled",
}

class Iterable {
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
                    let url = dict["url"]
                    let contextDict = dict["context"]
                    let context = Iterable.convertDictToIterableContext(contextDict)
                    let result = config.urlDelegate!(url, context)
                    RNIterableAPI.setUrlHandled(result)
                }
            )
        }
        if (config.customActionDelegate) {
            RNEventEmitter.addListener(
                EventName.handleCustomActionCalled,
                (dict) => {
                    let actionDict = dict["action"]
                    let contextDict = dict["context"]
                    let action = Iterable.convertDictToIterableAction(actionDict)
                    let context = Iterable.convertDictToIterableContext(contextDict)
    
                    config.customActionDelegate!(action, context)
                }
            )
        }

        RNIterableAPI.initializeWithApiKey(apiKey, Iterable.createConfigDict(config))
    }

    /**
     * 
     * @param {string} email 
     */
    static setEmail(email: string) {
        console.log("setEmail: " + email);
        RNIterableAPI.setEmail(email);
    }

    static getEmail(): Promise<String | null> {
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

    static getUserId(): Promise<String | null> {
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

    static getLastPushPayload(): Promise<any | null> {
        console.log("getLastPushPayload")
        return RNIterableAPI.getLastPushPayload()
    }

    static getAttributionInfo(): Promise<IterableAttributionInfo | null> {
        console.log("getAttributionInfo")
        return RNIterableAPI.getAttributionInfo().then((dict: any) => {
            return new IterableAttributionInfo(dict["campaignId"] as number, dict["templateId"] as number, dict["messageId"] as String)
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

    private static createConfigDict(config: IterableConfig): any {
        return {
            "pushIntegrationName": config.pushIntegrationName,
            "sandboxPushIntegrationName": config.sandboxPushIntegrationName,
            "pushPlatform": config.pushPlatform,
            "autoPushRegistration": config.autoPushRegistration,
            "checkForDeferredDeeplink": config.checkForDeferredDeeplink,
            "inAppDisplayInterval": config.inAppDisplayInterval,
            "urlDelegatePresent": config.urlDelegate != undefined,
            "customActionDelegatePresent": config.customActionDelegate != undefined,
        }
    }

    private static convertDictToIterableContext(dict: any): IterableActionContext {
        const actionDict = dict["action"]
        const action = Iterable.convertDictToIterableAction(actionDict)
        const actionSource = dict["actionSource"] as IterableActionSource
        return new IterableActionContext(action, actionSource)
    }

    private static convertDictToIterableAction(actionDict: any): IterableAction {
        return new IterableAction(actionDict["type"], actionDict["data"], actionDict["userInput"])
    }

    static async getInAppMessages() {
        console.log("getInAppMessages");
        try {
            var messages = await RNIterableAPI.getInAppMessages();
            console.log(messages);
        } catch (e) {
            console.error(e);
        }
    }
}
export { Iterable, IterableConfig, PushServicePlatform, IterableAction, IterableActionContext, IterableAttributionInfo };
