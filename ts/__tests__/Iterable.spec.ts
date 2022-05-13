import { MockRNIterableAPI } from '../__mocks__/MockRNIterableAPI'
import { MockLinking } from '../__mocks__/MockLinking'
import { TestHelper } from './TestHelper'
import { NativeEventEmitter } from 'react-native'

// import from the same location that consumers import from
import {
  Iterable,
  IterableConfig
} from '../index'

import {
  IterableAttributionInfo,
  IterableCommerceItem,
  IterableActionContext,
  EventName,
  IterableAction,
  IterableActionSource
} from '../Iterable'

beforeEach(() => {
  jest.clearAllMocks()
})

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
  expect(MockRNIterableAPI.disableDeviceForCurrentUser).toBeCalled()
})

test("getLastPushPayload", () => {
  MockRNIterableAPI.lastPushPayload = { "var1": "val1", "var2": true }

  return Iterable.getLastPushPayload().then(payload => {
    expect(payload).toEqual({ "var1": "val1", "var2": true })
  })
})

test("trackPushOpenWithCampaignId", () => {
  Iterable.trackPushOpenWithCampaignId(123, 234, "someMessageId", false, { "dataFieldKey": "dataFieldValue" })

  expect(MockRNIterableAPI.trackPushOpenWithCampaignId).toBeCalledWith(
    123,
    234,
    "someMessageId",
    false,
    { "dataFieldKey": "dataFieldValue" }
  )
})

test("updateCart", () => {
  Iterable.updateCart([new IterableCommerceItem("id1", "Boba Tea", 18, 26)])

  expect(MockRNIterableAPI.updateCart).toBeCalledWith(
    [new IterableCommerceItem("id1", "Boba Tea", 18, 26)]
  )
})

test("trackPurchase", () => {
  Iterable.trackPurchase(
    10,
    [new IterableCommerceItem("id1", "Boba Tea", 18, 26)],
    { "dataFieldKey": "dataFieldValue" }
  )

  expect(MockRNIterableAPI.trackPurchase).toBeCalledWith(
    10,
    [new IterableCommerceItem("id1", "Boba Tea", 18, 26)],
    { "dataFieldKey": "dataFieldValue" }
  )
})

test("trackPurchase with optional fields", () => {
  Iterable.trackPurchase(
    5,
    [new IterableCommerceItem("id", "swordfish", 64, 1, "SKU", "description", "url", "imageUrl", ["sword", "shield"])],
    {"key": "value"}
  )

  expect(MockRNIterableAPI.trackPurchase).toBeCalledWith(
    5,
    [new IterableCommerceItem("id", "swordfish", 64, 1, "SKU", "description", "url", "imageUrl", ["sword", "shield"])],
    {"key": "value"}
  )
})

test("trackEvent", () => {
  Iterable.trackEvent(
    "EventName",
    { "DatafieldKey": "DatafieldValue" }
  )

  expect(MockRNIterableAPI.trackEvent).toBeCalledWith(
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

test("update user", () => {
  const dataFields = { "field": "value1" }

  Iterable.updateUser(dataFields, false)

  expect(MockRNIterableAPI.updateUser).toBeCalledWith(dataFields, false)
})

test("update email", () => {
  const newEmail = "woo@newemail.com"

  Iterable.updateEmail(newEmail)

  expect(MockRNIterableAPI.updateEmail).toBeCalledWith(newEmail)
})

test("default config values", () => {
  var config = new IterableConfig()

  expect(config.pushIntegrationName).toBe(undefined)
  expect(config.autoPushRegistration).toBe(true)
  expect(config.inAppDisplayInterval).toBe(30.0)
  expect(config.urlHandler).toBe(undefined)
  expect(config.customActionHandler).toBe(undefined)
  expect(config.inAppHandler).toBe(undefined)
})

test("default config dictionary values", () => {
  var configDict = (new IterableConfig()).toDict()

  expect(configDict["pushIntegrationName"]).toBe(undefined)
  expect(configDict["autoPushRegistration"]).toBe(true)
  expect(configDict["inAppDisplayInterval"]).toBe(30.0)
  expect(configDict["urlHandlerPresent"]).toBe(false)
  expect(configDict["customActionHandlerPresent"]).toBe(false)
  expect(configDict["inAppHandlerPresent"]).toBe(false)
})

test("open url when url handler returns false", () => {
  MockLinking.canOpenURL = jest.fn(() => {
    return new Promise(res => { res(true) })
  })
  MockLinking.openURL.mockReset()

  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleUrlCalled)

  const expectedUrl = "https://somewhere.com"
  const config = new IterableConfig()
  config.urlHandler = jest.fn((url: string, _: IterableActionContext) => {
    return false
  })

  Iterable.initialize("apiKey", config)
  const actionDict = { "type": "openUrl" }
  nativeEmitter.emit(EventName.handleUrlCalled, { "url": expectedUrl, "context": { "action": actionDict, "source": "inApp" } });

  return TestHelper.delayed(0, () => {
    expect(config.urlHandler).toBeCalledWith(expectedUrl, expect.any(Object))
    expect(MockLinking.openURL).toBeCalledWith(expectedUrl)
  })
})

test("do not open url when url handler returns false and canOpen is false", () => {
  MockLinking.canOpenURL = jest.fn(() => {
    return new Promise(res => { res(false) })
  })
  MockLinking.openURL.mockReset()

  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleUrlCalled)

  const expectedUrl = "https://somewhere.com"
  const config = new IterableConfig()
  config.urlHandler = jest.fn((url: string, _: IterableActionContext) => {
    return false
  })

  Iterable.initialize("apiKey", config)
  const actionDict = { "type": "openUrl" }
  nativeEmitter.emit(EventName.handleUrlCalled, { "url": expectedUrl, "context": { "action": actionDict, "source": "inApp" } });

  return TestHelper.delayed(0, () => {
    expect(config.urlHandler).toBeCalledWith(expectedUrl, expect.any(Object))
    expect(MockLinking.openURL).not.toBeCalled()
  })
})

test("do not open url when url handler returns true", () => {
  MockLinking.canOpenURL = jest.fn(() => {
    return new Promise(res => { res(true) })
  })
  MockLinking.openURL.mockReset()

  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleUrlCalled)

  const expectedUrl = "https://somewhere.com"
  const config = new IterableConfig()
  config.urlHandler = jest.fn((url: string, _: IterableActionContext) => {
    return true
  })

  Iterable.initialize("apiKey", config)
  const actionDict = { "type": "openUrl" }
  nativeEmitter.emit(EventName.handleUrlCalled, { "url": expectedUrl, "context": { "action": actionDict, "source": "inApp" } });

  return TestHelper.delayed(0, () => {
    expect(MockLinking.openURL).not.toBeCalled()
  })
})

test("custom action handler is called", () => {
  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleCustomActionCalled)

  const actionName = "zeeActionName"
  const actionData = "zeeActionData"
  const config = new IterableConfig()

  config.customActionHandler = jest.fn((action: IterableAction, context: IterableActionContext) => {
    return true
  })

  Iterable.initialize("apiKey", config)
  const actionDict = { "type": actionName, "data": actionData }
  nativeEmitter.emit(EventName.handleCustomActionCalled, { "action": actionDict, "context": { "action": actionDict, "actionSource": IterableActionSource.inApp } });

  return TestHelper.delayed(0, () => {
    const expectedAction = new IterableAction(actionName, actionData)
    const expectedContext = new IterableActionContext(expectedAction, IterableActionSource.inApp)
    expect(config.customActionHandler).toBeCalledWith(expectedAction, expectedContext)
  })
})

test("handle app link is called", () => {
  const link = "https://somewhere.com/link/something"
  Iterable.handleAppLink(link)
  expect(MockRNIterableAPI.handleAppLink).toBeCalledWith(link)
})

test("update subscriptions is called", () => {
  const emailListIds = [1, 2, 3]
  const unsubscribedChannelIds = [4, 5, 6]
  const unsubscribedMessageTypeIds = [7, 8]
  const subscribedMessageTypeIds = [9]
  const campaignId = 10
  const templateId = 11

  Iterable.updateSubscriptions(emailListIds,
    unsubscribedChannelIds,
    unsubscribedMessageTypeIds,
    subscribedMessageTypeIds,
    campaignId,
    templateId
  )

  expect(MockRNIterableAPI.updateSubscriptions).toBeCalledWith(emailListIds, unsubscribedChannelIds, unsubscribedMessageTypeIds, subscribedMessageTypeIds, campaignId, templateId)
})

