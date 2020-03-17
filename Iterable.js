// @flow
'use strict';

import { NativeModules } from 'react-native';

const RNIterableAPI = NativeModules.RNIterableAPI;

class Iterable {
    /**
     * 
     * @param {string} apiKey 
     */
    static initializeWithApiKey(apiKey: string) {
        console.log("initializeWithApiKey: " + apiKey);
        RNIterableAPI.initializeWithApiKey(apiKey);
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
export { Iterable };
