import { Iterable, IterableAttributionInfo, IterableConfig, PushServicePlatform, IterableCommerceItem, IterableActionContext, EventName, IterableAction, IterableActionSource } from '../Iterable'
import { RNIterableAPIMock, MockLinking, TestHelper } from '../__mocks__/jest.setup'
import { IterableInAppMessage, IterableInAppLocation, IterableInAppTrigger, IterableInAppTriggerType, IterableInboxMetadata, IterableInAppCloseSource, IterableInAppShowResponse, IterableInAppDeleteSource } from '../IterableInAppClasses'
import { NativeEventEmitter } from 'react-native'

beforeEach(() => {
  jest.clearAllMocks()
})

import { Iterable, IterableAttributionInfo, IterableConfig, PushServicePlatform } from '../Iterable'
import { IterableInAppMessage, IterableInAppTrigger, IterableInAppLocation, IterableInAppDeleteSource, IterableInAppTriggerType } from '../IterableInAppClasses'

test("set/get email", () => {
  Iterable.setEmail("user@example.com")
  return Iterable.getEmail().then(email => {
    expect(email).toBe("user@example.com")
  })
})

test("set/get userId", () => {
  Iterable.setUserId("user1")
  return Iterable.getUserId().then(userId => {
    expect(userId).toBe("user1")
  })
})

test("disable device for current user", () => {
  Iterable.disableDeviceForCurrentUser()
  expect(RNIterableAPIMock.disableDeviceForCurrentUser).toBeCalled()
})

test("disable device for all users", () => {
  Iterable.disableDeviceForAllUsers()
  expect(RNIterableAPIMock.disableDeviceForAllUsers).toBeCalled()
})

test("getLastPushPayload", () => {
  RNIterableAPIMock.lastPushPayload = { "var1": "val1", "var2": true }

  return Iterable.getLastPushPayload().then(payload => {
    expect(payload).toEqual({ "var1": "val1", "var2": true })
  })
})

test("trackPushOpenWithCampaignId", () => {
  Iterable.trackPushOpenWithCampaignId(123, 234, "someMessageId", false, { "dataFieldKey": "dataFieldValue" })

  expect(RNIterableAPIMock.trackPushOpenWithCampaignId).toBeCalledWith(
    123,
    234,
    "someMessageId",
    false,
    { "dataFieldKey": "dataFieldValue" }
  )
})

test("trackPurchase", () => {
  Iterable.trackPurchase(
    10,
    [new IterableCommerceItem("id1", "Boba Tea", 18, 26)],
    { "dataFieldKey": "dataFieldValue" }
  )

  expect(RNIterableAPIMock.trackPurchase).toBeCalledWith(
    10,
    [new IterableCommerceItem("id1", "Boba Tea", 18, 26)],
    { "dataFieldKey": "dataFieldValue" }
  )
})

test("trackInAppOpen", () => {
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), { "CustomPayloadKey": "CustomPayloadValue" }, false);
  Iterable.trackInAppOpen(
    msg,
    IterableInAppLocation.inApp
  )

  expect(RNIterableAPIMock.trackInAppOpen).toBeCalledWith(
    "someMessageId",
    0
  )
})

test("trackInAppClick", () => {
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), { "CustomPayloadKey": "CustomPayloadValue" }, false);
  Iterable.trackInAppClick(
    msg,
    IterableInAppLocation.inApp,
    "URLClicked"
  )

  expect(RNIterableAPIMock.trackInAppClick).toBeCalledWith(
    "someMessageId",
    0,
    "URLClicked"
  )
})

test("trackInAppClose", () => {
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), { "CustomPayloadKey": "CustomPayloadValue" }, false);
  Iterable.trackInAppClose(
    msg,
    IterableInAppLocation.inbox,
    IterableInAppCloseSource.link,
    "ClickedURL"
  )

  expect(RNIterableAPIMock.trackInAppClose).toBeCalledWith(
    "someMessageId",
    1,
    1,
    "ClickedURL"
  )
})

test("trackEvent", () => {
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), { "CustomPayloadKey": "CustomPayloadValue" }, false);
  Iterable.trackEvent(
    "EventName",
    { "DatafieldKey": "DatafieldValue" }
  )

  expect(RNIterableAPIMock.trackEvent).toBeCalledWith(
    "EventName",
    { "DatafieldKey": "DatafieldValue" }
  )
})

test("set/get attribution info", () => {
  let campaignId = 1234
  let templateId = 5678
  let messageId = "qwer"

  Iterable.setAttributionInfo(new IterableAttributionInfo(campaignId, templateId, messageId))

  return Iterable.getAttributionInfo().then(attributionInfo => {
    expect(attributionInfo?.campaignId).toBe(campaignId)
    expect(attributionInfo?.templateId).toBe(templateId)
    expect(attributionInfo?.messageId).toBe(messageId)
  })
})

test("in-app consume", () => {
  let message = new IterableInAppMessage("asdf", 1234, new IterableInAppTrigger(IterableInAppTriggerType.never), undefined, undefined, false, undefined, undefined, false)

  Iterable.inAppConsume(message, IterableInAppLocation.inApp, IterableInAppDeleteSource.unknown)

  expect(RNIterableAPIMock.inAppConsume).toBeCalled()
})

test("update user", () => {

})

test("update email", () => {

})

test("default config values", () => {
  var config = new IterableConfig()

  expect(config.pushIntegrationName).toBe(undefined)
  expect(config.sandboxPushIntegrationName).toBe(undefined)
  expect(config.pushPlatform).toBe(PushServicePlatform.auto)
  expect(config.autoPushRegistration).toBe(true)
  expect(config.checkForDeferredDeeplink).toBe(false)
  expect(config.inAppDisplayInterval).toBe(30.0)
  expect(config.urlDelegate).toBe(undefined)
  expect(config.customActionDelegate).toBe(undefined)
  expect(config.inAppDelegate).toBe(undefined)
})

test("default config dictionary values", () => {
  var configDict = (new IterableConfig()).toDict()

  expect(configDict["pushIntegrationName"]).toBe(undefined)
  expect(configDict["sandboxPushIntegrationName"]).toBe(undefined)
  expect(configDict["pushPlatform"]).toBe(PushServicePlatform.auto)
  expect(configDict["autoPushRegistration"]).toBe(true)
  expect(configDict["checkForDeferredDeeplink"]).toBe(false)
  expect(configDict["inAppDisplayInterval"]).toBe(30.0)
  expect(configDict["urlDelegatePresent"]).toBe(false)
  expect(configDict["customActionDelegatePresent"]).toBe(false)
  expect(configDict["inAppDelegatePresent"]).toBe(false)
})

test("open url when url delegate returns false", () => {
  MockLinking.canOpenURL = jest.fn(() => {
    return new Promise(res => { res(true) })
  })
  MockLinking.openURL.mockReset()

  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleUrlCalled)

  const expectedUrl = "https://somewhere.com"
  const config = new IterableConfig()
  config.urlDelegate = jest.fn((url: string, _: IterableActionContext) => {
    return false
  })

  Iterable.initialize("apiKey", config)
  const actionDict = { "type": "openUrl" }
  nativeEmitter.emit(EventName.handleUrlCalled, { "url": expectedUrl, "context": { "action": actionDict, "source": "inApp" } });

  return TestHelper.delayed(0, () => {
    expect(config.urlDelegate).toBeCalledWith(expectedUrl, expect.any(Object))
    expect(MockLinking.openURL).toBeCalledWith(expectedUrl)
  })
})

test("do not open url when url delegate returns false and canOpen is false", () => {
  MockLinking.canOpenURL = jest.fn(() => {
    return new Promise(res => { res(false) })
  })
  MockLinking.openURL.mockReset()

  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleUrlCalled)

  const expectedUrl = "https://somewhere.com"
  const config = new IterableConfig()
  config.urlDelegate = jest.fn((url: string, _: IterableActionContext) => {
    return false
  })

  Iterable.initialize("apiKey", config)
  const actionDict = { "type": "openUrl" }
  nativeEmitter.emit(EventName.handleUrlCalled, { "url": expectedUrl, "context": { "action": actionDict, "source": "inApp" } });

  return TestHelper.delayed(0, () => {
    expect(config.urlDelegate).toBeCalledWith(expectedUrl, expect.any(Object))
    expect(MockLinking.openURL).not.toBeCalled()
  })
})

test("do not open url when url delegate returns true", () => {
  MockLinking.canOpenURL = jest.fn(() => {
    return new Promise(res => { res(true) })
  })
  MockLinking.openURL.mockReset()

  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleUrlCalled)

  const expectedUrl = "https://somewhere.com"
  const config = new IterableConfig()
  config.urlDelegate = jest.fn((url: string, _: IterableActionContext) => {
    return true
  })

  Iterable.initialize("apiKey", config)
  const actionDict = { "type": "openUrl" }
  nativeEmitter.emit(EventName.handleUrlCalled, { "url": expectedUrl, "context": { "action": actionDict, "source": "inApp" } });

  return TestHelper.delayed(0, () => {
    expect(MockLinking.openURL).not.toBeCalled()
  })
})

test("custom action delegate is called", () => {
  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleCustomActionCalled)

  const actionName = "zeeActionName"
  const actionData = "zeeActionData"
  const config = new IterableConfig()

  config.customActionDelegate = jest.fn((action: IterableAction, context: IterableActionContext) => {
    return true
  })

  Iterable.initialize("apiKey", config)
  const actionDict = { "type": actionName, "data": actionData }
  nativeEmitter.emit(EventName.handleCustomActionCalled, { "action": actionDict, "context": { "action": actionDict, "actionSource": IterableActionSource.inApp } });

  return TestHelper.delayed(0, () => {
    const expectedAction = new IterableAction(actionName, actionData)
    const expectedContext = new IterableActionContext(expectedAction, IterableActionSource.inApp)
    expect(config.customActionDelegate).toBeCalledWith(expectedAction, expectedContext)
  })
})

test("in-app delegate is called", () => {
  RNIterableAPIMock.setInAppShowResponse.mockReset()

  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleInAppCalled)

  const config = new IterableConfig()

  config.inAppDelegate = jest.fn((message: IterableInAppMessage) => {
    return IterableInAppShowResponse.show
  })

  Iterable.initialize("apiKey", config)
  const messageDict = {
    "messageId": "message1",
    "campaignId": 1234,
    "trigger": { "type": IterableInAppTriggerType.immediate },
  }
  nativeEmitter.emit(EventName.handleInAppCalled, messageDict);

  return TestHelper.delayed(0, () => {
    expect(config.inAppDelegate)
    const expectedMessage = new IterableInAppMessage("message1", 1234, new IterableInAppTrigger(IterableInAppTriggerType.immediate), undefined, undefined, false, undefined, undefined, false)
    expect(config.inAppDelegate).toBeCalledWith(expectedMessage)
    expect(RNIterableAPIMock.setInAppShowResponse).toBeCalledWith(IterableInAppShowResponse.show)
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
  RNIterableAPIMock.getInAppMessages = jest.fn(() => {
    return new Promise(res => res(messages))
  })

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
  RNIterableAPIMock.showMessage = jest.fn((message, consume) => {
    return new Promise(res => {
      res()
    })
  })

  return Iterable.inAppManager.showMessage(message, true).then(_ => {
    expect(RNIterableAPIMock.showMessage).toBeCalledWith(message.messageId, true)
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
  expect(RNIterableAPIMock.removeMessage).toBeCalledWith(message.messageId, IterableInAppLocation.inApp, IterableInAppDeleteSource.deleteButton)
})

test("in-app set read for message is called", () => {
  const messageDict = {
    "messageId": "message1",
    "campaignId": 1234,
    "trigger": { "type": IterableInAppTriggerType.immediate },
  }
  const message = IterableInAppMessage.fromDict(messageDict)

  Iterable.inAppManager.setReadForMessage(message, true)
  expect(RNIterableAPIMock.setReadForMessage).toBeCalledWith(message.messageId, true)
})
