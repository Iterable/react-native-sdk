// @flow
'use strict';

import { NativeModules } from 'react-native';

const RNIterableAPI = NativeModules.RNIterableAPI;

enum PushServicePlatform {
    sandbox = 0,
    production = 1,
    auto = 2
}

class IterableConfig {
    pushIntegrationName?: String
    sandboxPushIntegrationName?: String
    pushPlatform: PushServicePlatform = PushServicePlatform.auto
    autoPushRegistration = true
    checkForDeferredDeeplink = false
    inAppDisplayInterval: number = 30.0
    urlDelegate?: (url: String) => Boolean
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
            let urlCallback = (error:Error, url: String) => {
                let result = config.urlDelegate!(url)
                RNIterableAPI.setUrlHandled(result)
            }
            RNIterableAPI.initializeWithApiKeyAndConfigAndUrlCallback(apiKey, config, urlCallback);
        } else {
            RNIterableAPI.initializeWithApiKeyAndConfig(apiKey, config);
        }
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
export { Iterable, IterableConfig, PushServicePlatform };
