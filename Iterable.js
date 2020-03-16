// @flow
'use strict';

import { NativeModules } from 'react-native';

const RNIterableSDK = NativeModules.RNIterableSDK;

class Iterable {
    /**
     * 
     * @param {string} apiKey 
     */
    static initializeWithApiKey(apiKey: string) {
        console.log("initializeWithApiKey: " + apiKey);
        RNIterableSDK.initializeWithApiKey(apiKey);
    }

    /**
     * 
     * @param {string} email 
     */
    static setEmail(email: string) {
        console.log("setEmail: " + email);
        RNIterableSDK.setEmail(email);
    }

    static async getInAppMessages() {
        console.log("getInAppMessages");
        try {
            var messages = await RNIterableSDK.getInAppMessages();
            console.log(messages);
        } catch (e) {
            console.error(e);
        }
    }
}
export { Iterable };
