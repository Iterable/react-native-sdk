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
}

class Iterable {
    /**
     * 
     * @param {string} apiKey 
     * @param {IterableConfig | null} config
     */
    static initialize(apiKey: string, config?: IterableConfig | null) {
        console.log("initialize: " + apiKey);
        RNIterableAPI.initializeWithApiKey(apiKey, config);
    }

    /**
     * 
     * @param {string} email 
     */
    static setEmail(email: string) {
        console.log("setEmail: " + email);
        RNIterableAPI.setEmail(email);
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
