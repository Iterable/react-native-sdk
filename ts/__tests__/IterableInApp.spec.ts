import { MockRNIterableAPI } from '../__mocks__/MockRNIterableAPI'
import { TestHelper } from './TestHelper'
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

test("trackInAppOpen", () => {
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), { "CustomPayloadKey": "CustomPayloadValue" }, false, 300.5);
  Iterable.trackInAppOpen(
    msg,
    IterableInAppLocation.inApp
  )

  expect(MockRNIterableAPI.trackInAppOpen).toBeCalledWith(
    "someMessageId",
    0
  )
})

test("trackInAppClick", () => {
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), { "CustomPayloadKey": "CustomPayloadValue" }, false, 300.5);
  Iterable.trackInAppClick(
    msg,
    IterableInAppLocation.inApp,
    "URLClicked"
  )

  expect(MockRNIterableAPI.trackInAppClick).toBeCalledWith(
    "someMessageId",
    0,
    "URLClicked"
  )
})

test("trackInAppClose", () => {
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), { "CustomPayloadKey": "CustomPayloadValue" }, false, 300.5);
  Iterable.trackInAppClose(
    msg,
    IterableInAppLocation.inbox,
    IterableInAppCloseSource.link,
    "ClickedURL"
  )

  expect(MockRNIterableAPI.trackInAppClose).toBeCalledWith(
    "someMessageId",
    1,
    1,
    "ClickedURL"
  )
})

test("in-app consume", () => {
  let message = new IterableInAppMessage("asdf", 1234, new IterableInAppTrigger(IterableInAppTriggerType.never), undefined, undefined, false, undefined, undefined, false, 300.5)

  Iterable.inAppConsume(message, IterableInAppLocation.inApp, IterableInAppDeleteSource.unknown)

  expect(MockRNIterableAPI.inAppConsume).toBeCalledWith(message.messageId, IterableInAppLocation.inApp, IterableInAppDeleteSource.unknown)
})

test("in-app handler is called", () => {
  MockRNIterableAPI.setInAppShowResponse.mockReset()

  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleInAppCalled)

  const config = new IterableConfig()

  config.inAppHandler = jest.fn((message: IterableInAppMessage) => {
    return IterableInAppShowResponse.show
  })

  Iterable.initialize("apiKey", config)
  const messageDict = {
    "messageId": "message1",
    "campaignId": 1234,
    "trigger": { "type": IterableInAppTriggerType.immediate },
    "priorityLevel": 300.5
  }
  nativeEmitter.emit(EventName.handleInAppCalled, messageDict);

  return TestHelper.delayed(0, () => {
    expect(config.inAppHandler)
    const expectedMessage = new IterableInAppMessage("message1", 1234, new IterableInAppTrigger(IterableInAppTriggerType.immediate), undefined, undefined, false, undefined, undefined, false, 300.5)
    expect(config.inAppHandler).toBeCalledWith(expectedMessage)
    expect(MockRNIterableAPI.setInAppShowResponse).toBeCalledWith(IterableInAppShowResponse.show)
  })
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

  MockRNIterableAPI.setMessages(messages)

  return Iterable.inAppManager.getMessages().then(messagesObtained => {
    expect(messagesObtained).toEqual(messages)
  })
})

test("in-app show message is called", () => {
  const messageDict = {
    "messageId": "message1",
    "campaignId": 1234,
    "trigger": { "type": IterableInAppTriggerType.immediate },
  }
  const message = IterableInAppMessage.fromDict(messageDict)
  MockRNIterableAPI.showMessage = jest.fn((message, consume) => {
    return new Promise<void>(res => {
      res()
    })
  })

  return Iterable.inAppManager.showMessage(message, true).then(_ => {
    expect(MockRNIterableAPI.showMessage).toBeCalledWith(message.messageId, true)
  })
})

test("in-app remove message is called", () => {
  const messageDict = {
    "messageId": "message1",
    "campaignId": 1234,
    "trigger": { "type": IterableInAppTriggerType.immediate },
  }
  const message = IterableInAppMessage.fromDict(messageDict)

  Iterable.inAppManager.removeMessage(message, IterableInAppLocation.inApp, IterableInAppDeleteSource.deleteButton)
  expect(MockRNIterableAPI.removeMessage).toBeCalledWith(message.messageId, IterableInAppLocation.inApp, IterableInAppDeleteSource.deleteButton)
})

test("in-app set read for message is called", () => {
  const messageDict = {
    "messageId": "message1",
    "campaignId": 1234,
    "trigger": { "type": IterableInAppTriggerType.immediate },
  }
  const message = IterableInAppMessage.fromDict(messageDict)

  Iterable.inAppManager.setReadForMessage(message, true)
  expect(MockRNIterableAPI.setReadForMessage).toBeCalledWith(message.messageId, true)
})

test("in-app auto display paused", () => {
  Iterable.inAppManager.setAutoDisplayPaused(true)
  expect(MockRNIterableAPI.setAutoDisplayPaused).toBeCalledWith(true)
})
