'use strict'

import { NativeModules } from 'react-native'

import {
  IterableHtmlInAppContent,
  IterableInAppLocation,
  IterableInAppDeleteSource,
} from '.'
import { Iterable } from './Iterable'

import IterableInAppMessage from './IterableInAppMessage'

const RNIterableAPI = NativeModules.RNIterableAPI

class IterableInAppManager {
  /**
   * Returns a list of all in-app messages.
   */
  getMessages(): Promise<Array<IterableInAppMessage>> {
    Iterable.logger.log("InAppManager.getMessages")

    return RNIterableAPI.getInAppMessages().then((messages: Array<any>) => messages.map(message => { return IterableInAppMessage.fromDict(message) }))
  }

  /**
   * Returns a list of all in-app messages that are marked with `saveToInbox`
   */
  getInboxMessages(): Promise<Array<IterableInAppMessage>> {
    Iterable.logger.log("InAppManager.getInboxMessages")

    return RNIterableAPI.getInboxMessages().then((messages: Array<any>) => messages.map(message => { return IterableInAppMessage.fromDict(message) }))
  }

  /**
   * 
   * @param {IterableInAppMessage} message The message to show
   * @param {boolean} consume Set to true to consume the event from the server queue if the message is shown. This should be default.
   */
  showMessage(message: IterableInAppMessage, consume: boolean): Promise<string | undefined> {
    Iterable.logger.log("InAppManager.show")

    return RNIterableAPI.showMessage(message.messageId, consume)
  }

  /**
   * 
   * @param {IterableInAppMessage} message The message to remove
   * @param {IterableInAppLocation} location 
   * @param {IterableInAppDeleteSource} source 
   */
  removeMessage(message: IterableInAppMessage, location: IterableInAppLocation, source: IterableInAppDeleteSource): void {
     Iterable.logger.log("InAppManager.remove")

    return RNIterableAPI.removeMessage(message.messageId, location, source)
  }

  /**
   * 
   * @param {IterableInAppMessage} message 
   * @param {boolean} read 
   */
  setReadForMessage(message: IterableInAppMessage, read: boolean) {
     Iterable.logger.log("InAppManager.setRead")

    RNIterableAPI.setReadForMessage(message.messageId, read)
  }

  /**
   * Returns HTML in-app content for an in-app message.
   * @param {IterableInAppMessage} message 
   */
  getHtmlContentForMessage(message: IterableInAppMessage): Promise<IterableHtmlInAppContent> {
     Iterable.logger.log("InAppManager.getHtmlContentForMessage")

    return RNIterableAPI.getHtmlInAppContentForMessage(message.messageId)
      .then((content: any) => {
        return IterableHtmlInAppContent.fromDict(content)
      })
  }

  /**
   * Pauses or unpauses the automatic displaying of in-apps
   * @param {boolean} paused whether the automatic displaying should be paused
   */
  setAutoDisplayPaused(paused: boolean) {
     Iterable.logger.log("InAppManager.setAutoDisplayPaused")
     
    RNIterableAPI.setAutoDisplayPaused(paused)
  }
}

export default IterableInAppManager