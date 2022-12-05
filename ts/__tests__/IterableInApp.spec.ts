import { MockRNIterableAPI } from '../__mocks__/MockRNIterableAPI'
import { NativeEventEmitter } from 'react-native'

import {
  Iterable,
  EventName
} from '../Iterable'

import IterableConfig from '../IterableConfig'

import IterableInAppMessage from '../IterableInAppMessage'

import {
  IterableInAppLocation,
  IterableInAppTrigger,
  IterableInAppTriggerType,
  IterableInboxMetadata,
  IterableInAppCloseSource,
  IterableInAppShowResponse,
  IterableInAppDeleteSource
} from '../IterableInAppClasses'
import { IterableLogger } from '../IterableLogger'

beforeEach(() => {
  jest.clearAllMocks()
  Iterable.logger = new IterableLogger(new IterableConfig())
})

test("trackInAppOpen_params_methodCalledWithParams", () => {
  // GIVEN an in-app message and a location
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), { "CustomPayloadKey": "CustomPayloadValue" }, false, 300.5)
  let location: IterableInAppLocation = IterableInAppLocation.inApp

  // WHEN Iterable.trackInAppOpen is called
  Iterable.trackInAppOpen(msg, location)

  // THEN corresponding method is called on MockIterableAPI with appropriate parameters
  expect(MockRNIterableAPI.trackInAppOpen).toBeCalledWith(msg.messageId, location)
})

test("trackInAppClick_params_methodCalledWithParams", () => {
  // GIVEN an in-app message, a location, and a url
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), { "CustomPayloadKey": "CustomPayloadValue" }, false, 300.5)
  let location: IterableInAppLocation = IterableInAppLocation.inApp
  let url: string = "URLClicked"

  // WHEN Iterable.trackInAppClick is called
  Iterable.trackInAppClick(msg, location, url)

  // THEN corresponding method is called on MockIterableAPI with appropriate parameters
  expect(MockRNIterableAPI.trackInAppClick).toBeCalledWith(msg.messageId, location, url)
})

test("trackInAppClose_params_methodCalledWithParams", () => {
  // GIVEN an in-app messsage, a location, a close source, and a url
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), { "CustomPayloadKey": "CustomPayloadValue" }, false, 300.5)
  let location: IterableInAppLocation = IterableInAppLocation.inbox
  let source: IterableInAppCloseSource = IterableInAppCloseSource.link
  let url: string = "ClickedURL"

  // WHEN Iterable.trackInAppClose is called
  Iterable.trackInAppClose(msg, location, source, url)

  // THEN corresponding method is called on MockIterableAPI with appropriate parameters
  expect(MockRNIterableAPI.trackInAppClose).toBeCalledWith(msg.messageId, location, source, url)
})

test("inAppConsume_params_methodCalledWithParams", () => {
  // GIVEN an in-app messsage, a location, and a delete source
  let msg = new IterableInAppMessage("asdf", 1234, new IterableInAppTrigger(IterableInAppTriggerType.never), undefined, undefined, false, undefined, undefined, false, 300.5)
  let location: IterableInAppLocation = IterableInAppLocation.inApp
  let source: IterableInAppDeleteSource = IterableInAppDeleteSource.unknown

  // WHEN Iterable.inAppConsume is called
  Iterable.inAppConsume(msg,location, source)

  // THEN corresponding method is called on MockIterableAPI with appropriate parameters
  expect(MockRNIterableAPI.inAppConsume).toBeCalledWith(msg.messageId, location, source)
})

test("inAppHandler_messageAndEventEmitted_methodCalledWithMessage", () => {
  // sets up event emitter
  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleInAppCalled)

  // sets up config file and inAppHandler function
  const config = new IterableConfig()
  config.inAppHandler = jest.fn((message: IterableInAppMessage) => {
    return IterableInAppShowResponse.show
  })

  // initialize Iterable object
  Iterable.initialize("apiKey", config)

  // GIVEN an in-app message
  const messageDict = {
    "messageId": "message1",
    "campaignId": 1234,
    "trigger": { "type": IterableInAppTriggerType.immediate },
    "priorityLevel": 300.5
  }
  const expectedMessage = new IterableInAppMessage("message1", 1234, new IterableInAppTrigger(IterableInAppTriggerType.immediate), undefined, undefined, false, undefined, undefined, false, 300.5)
  
  // WHEN handleInAppCalled event is emitted
  nativeEmitter.emit(EventName.handleInAppCalled, messageDict);

  // THEN inAppHandler and MockRNIterableAPI.setInAppShowResponse is called with message
  expect(config.inAppHandler)
  expect(config.inAppHandler).toBeCalledWith(expectedMessage)
  expect(MockRNIterableAPI.setInAppShowResponse).toBeCalledWith(IterableInAppShowResponse.show)
})

test("get in-app messages", () => {
  const messageDicts = [{
    "messageId": "message1",
    "campaignId": 1234,
    "trigger": { "type": IterableInAppTriggerType.immediate },
  }, {
    "messageId": "message2",
    "campaignId": 2345,
    "trigger": { "type": IterableInAppTriggerType.never },
  }]

  const messages = messageDicts.map(message => IterableInAppMessage.fromDict(message))
  MockRNIterableAPI.getInAppMessages = jest.fn(() => {
    return new Promise(res => res(messages))
  })

  return Iterable.inAppManager.getMessages().then(messagesObtained => {
    expect(messagesObtained).toEqual(messages)
  })
})

test("showMessage_messageAndConsume_returnsClickedUrl", () => {
  // GIVEN an in-app message and a clicked url
  let messageDict = {
    "messageId": "message1",
    "campaignId": 1234,
    "trigger": { "type": IterableInAppTriggerType.immediate },
  }
  let message: IterableInAppMessage = IterableInAppMessage.fromDict(messageDict)
  let consume: boolean = true
  let clickedUrl: string = "testUrl"

  // WHEN the simulated clicked url is set to the clicked url
  MockRNIterableAPI.setClickedUrl(clickedUrl)

  // THEN Iterable,inAppManager.showMessage returns the simulated clicked url
  return Iterable.inAppManager.showMessage(message, consume).then(url => {
    expect(url).toEqual(clickedUrl)
  })
})

test("removeMessage_params_methodCalledWithParams", () => {
  // GIVEN an in-app message
  let messageDict = {
    "messageId": "message1",
    "campaignId": 1234,
    "trigger": { "type": IterableInAppTriggerType.immediate },
  }
  let message = IterableInAppMessage.fromDict(messageDict)
  let location: IterableInAppLocation = IterableInAppLocation.inApp
  let source: IterableInAppDeleteSource = IterableInAppDeleteSource.deleteButton

  // WHEN Iterable.inAppManager.removeMessage is called
  Iterable.inAppManager.removeMessage(message, location, source)

  // THEN corresponding method is called on MockIterableAPI with appropriate parameters
  expect(MockRNIterableAPI.removeMessage).toBeCalledWith(message.messageId, location, source)
})

test("setReadForMessage_params_methodCalledWithParams", () => {
  // GIVEN an in-app message
  let messageDict = {
    "messageId": "message1",
    "campaignId": 1234,
    "trigger": { "type": IterableInAppTriggerType.immediate },
  }
  let message = IterableInAppMessage.fromDict(messageDict)
  let read: boolean = true

  // WHEN Iterable.inAppManager.setReadForMessage is called
  Iterable.inAppManager.setReadForMessage(message, read)

  // THEN corresponding method is called on MockRNIterableAPI with appropriate parameters
  expect(MockRNIterableAPI.setReadForMessage).toBeCalledWith(message.messageId, read)
})

test("setAutoDisplayPaused_params_methodCalledWithParams", () => {
  // GIVEN paused flag
  let paused: boolean = true

  // WHEN Iterable.inAppManager.setAutoDisplayPaused is called
  Iterable.inAppManager.setAutoDisplayPaused(paused)

  // THEN corresponding method is called on MockRNIterableAPI with appropriate parameters
  expect(MockRNIterableAPI.setAutoDisplayPaused).toBeCalledWith(paused)
})
