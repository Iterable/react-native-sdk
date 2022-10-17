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

  /** 
   * IterableInAppManager is set up as the inAppManager property of an Iterable instance.
   */

class IterableInAppManager {

  /**
   * This method returns the current user's list of in-app messages stored in the local queue in the form of a promise.
   * Use `then` keyword to get the array of IterableInAppMessage objects.
   * 
   * This method does not cause the application to immediately check for new in-app messages on the server, since the SDK keeps the message list in sync.
   * 
   * parameters: none
   */

  getMessages(): Promise<Array<IterableInAppMessage>> {
    Iterable.logger.log("InAppManager.getMessages")

    return RNIterableAPI.getInAppMessages().then((messages: Array<any>) => messages.map(message => { return IterableInAppMessage.fromDict(message) }))
  }

   /**
   * This method returns the current user's list of in-app messages designated for the mobile inbox stored in the local queue in the form of a promise.
   * Use `then` keyword to get the array of IterableInAppMessage objects marked as `saveToInbox`.
   * 
   * This method does not cause the application to immediately check for new in-app messages on the server, since the SDK keeps the message list in sync. 
   * 
   * parameters: none
   */

  getInboxMessages(): Promise<Array<IterableInAppMessage>> {
    Iterable.logger.log("InAppManager.getInboxMessages")

    return RNIterableAPI.getInboxMessages().then((messages: Array<any>) => messages.map(message => { return IterableInAppMessage.fromDict(message) }))
  }

  /**
   * This method renders an in-app message and consumes it from the user's message queue if necessary.
   * 
   * This method returns a Promise. Use `then` to get the string it returns, which corresponds to the URL
   * of the button or link the current user tapped in the in-app message to close it.
   * 
   * @param {IterableInAppMessage} message The message to show (an IterableInAppMessage object)
   * @param {boolean} consume Whether or not the message should be consumed from the user's message queue after being shown. This should be defaulted to true.
   */

  showMessage(message: IterableInAppMessage, consume: boolean): Promise<string | undefined> {
    Iterable.logger.log("InAppManager.show")

    return RNIterableAPI.showMessage(message.messageId, consume)
  }

  /**
   * This method removes the specifed message from the current user's message queue.
   * Also, this method calls the inAppConsume method internally. 
   * 
   * @param {IterableInAppMessage} message the in-app message (an IterableInAppMessage object)
   * @param {IterableInAppLocation} location the location of the in-app message (an IterableInAppLocation enum)
   * @param {IterableInAppDeleteSource} source how the in-app message was deleted (an IterableInAppDeleteSource enum)
   */
  removeMessage(message: IterableInAppMessage, location: IterableInAppLocation, source: IterableInAppDeleteSource): void {
     Iterable.logger.log("InAppManager.remove")

    return RNIterableAPI.removeMessage(message.messageId, location, source)
  }

  /**
   * This method sets the read status of specified in-app message.
   * 
   * @param {IterableInAppMessage} message the in-app message (an IterableInAppMessage object)
   * @param {boolean} read the boolean value indicating whether the in-app message was read
   */
  setReadForMessage(message: IterableInAppMessage, read: boolean) {
     Iterable.logger.log("InAppManager.setRead")

    RNIterableAPI.setReadForMessage(message.messageId, read)
  }

  /**
   * This method returns HTML in-app content for a specified in-app message.
   * This method returns a Promise. Use `then` to get the HTML content returned as an IterableHtmlInAppContent object.  
   * 
   * @param {IterableInAppMessage} message the in-app message (an IterableInAppMessage object)
   */

  getHtmlContentForMessage(message: IterableInAppMessage): Promise<IterableHtmlInAppContent> {
     Iterable.logger.log("InAppManager.getHtmlContentForMessage")

    return RNIterableAPI.getHtmlInAppContentForMessage(message.messageId)
      .then((content: any) => {
        return IterableHtmlInAppContent.fromDict(content)
      })
  }

  /**
   * This method turns on or off automatic displaying of incoming in-app messages.
   * If set to false, the SDK will immediately retrieve and process in-app messages from the message queue.
   * The default value of isAutoDisplayPaused is false (in the native code).
   * 
   * @param {boolean} paused whether the automatic displaying should be paused
   */
  setAutoDisplayPaused(paused: boolean) {
     Iterable.logger.log("InAppManager.setAutoDisplayPaused")
     
    RNIterableAPI.setAutoDisplayPaused(paused)
  }
}

export default IterableInAppManager