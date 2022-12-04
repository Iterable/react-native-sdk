import { MockRNIterableAPI } from '../__mocks__/MockRNIterableAPI'
import { MockLinking } from '../__mocks__/MockLinking'
import { TestHelper } from './TestHelper'
import { NativeEventEmitter } from 'react-native'


// import from the same location that consumers import from
import {
  Iterable,
  IterableConfig,
  IterableLogLevel
} from '../index'

import {
  IterableAttributionInfo,
  IterableCommerceItem,
  IterableActionContext,
  EventName,
  IterableAction,
  IterableActionSource
} from '../Iterable'
import { IterableLogger } from '../IterableLogger'

beforeEach(() => {
  jest.clearAllMocks()
  Iterable.logger = new IterableLogger(new IterableConfig())
})

it("setEmail/getEmail_email_returnsEmail", () => {
  Iterable.logger.log("setEmail/getEmail_email_returnsEmail")
  const result = "user@example.com"
  
  // GIVEN an email
  const email = "user@example.com"
  
  // WHEN Iterable.setEmail is called with the given email
  Iterable.setEmail(email)
  
  // THEN Iterable.getEmail returns the given email
  return Iterable.getEmail().then(email => {
    expect(email).toBe(result)
  })
})
  
test("setUserId/getUserId_userId_returnsUserId", () => {
  Iterable.logger.log("setUserId/getUserId_userId_returnsUserId")
  const result = "user1"
  
  // GIVEN an userId
  const userId = "user1"
  
  // WHEN Iterable.setUserId is called with the given userId
  Iterable.setUserId("user1")
  
  // THEN Iterable.getUserId returns the given userId
  return Iterable.getUserId().then(userId => {
    expect(userId).toBe(result)
  })
})

test("disableDeviceForCurrentUser_noParams_methodCalled", () => {
  Iterable.logger.log("disableDeviceForCurrentUser_noParams_methodCalled")

  // GIVEN no parameters

  // WHEN Iterable.disableDeviceForCurrentUser is called
  Iterable.disableDeviceForCurrentUser()

  // THEN corresponding method is called on RNITerableAPI
  expect(MockRNIterableAPI.disableDeviceForCurrentUser).toBeCalled()
})

test("getLastPushPayload_noParams_returnLastPushPayload", () => {
  Iterable.logger.log("getLastPushPayload_noParams_returnLastPushPayload")
  const result = { "var1": "val1", "var2": true }

  // GIVEN no parameters

  // WHEN the lastPushPayload is set
  MockRNIterableAPI.lastPushPayload = { "var1": "val1", "var2": true }

  // THEN the lastPushPayload is returned when getLastPushPayload is called
  return Iterable.getLastPushPayload().then(payload => {
    expect(payload).toEqual(result)
  })
})

test("trackPushOpenWithCampaignId_pushParams_methodCalled", () => {
  Iterable.logger.log("getLastPushPayload_noParams_returnLastPushPayload")

  // GIVEN the following parameters
  const campaignId = 123
  const templateId = 234
  const messageId = "someMessageId"
  const appAlreadyRunning = false
  const dataFields = { "dataFieldKey": "dataFieldValue" }

  // WHEN Iterable.trackPushOpenWithCampaignId is called
  Iterable.trackPushOpenWithCampaignId(campaignId, templateId, messageId, appAlreadyRunning, dataFields)

  // THEN corresponding function is called on RNIterableAPI
  expect(MockRNIterableAPI.trackPushOpenWithCampaignId).toBeCalledWith(campaignId, templateId, messageId, appAlreadyRunning, dataFields)
})

test("updateCart_items_methodCalled", () => {
  Iterable.logger.log("updateCart_items_methodCalled")

  // GIVEN list of items
  const items = [new IterableCommerceItem("id1", "Boba Tea", 18, 26)]
  
  // WHEN Iterable.updateCart is called
  Iterable.updateCart(items)

  // THEN corresponding function is called on RNIterableAPI
  expect(MockRNIterableAPI.updateCart).toBeCalledWith(items)
})

test("trackPurchase_params_methodCalled", () => {
  Iterable.logger.log("trackPurchase_params_methodCalled")

  // GIVEN the following parameters
  const total = 10
  const items = [new IterableCommerceItem("id1", "Boba Tea", 18, 26)]
  const dataFields = { "dataFieldKey": "dataFieldValue" }

  // WHEN Iterable.trackPurchase is called
  Iterable.trackPurchase(total, items, dataFields)

  // THEN corresponding function is called on RNIterableAPI
  expect(MockRNIterableAPI.trackPurchase).toBeCalledWith(total, items, dataFields)
})

test("trackPurchase_paramsWithOptionalFields_methodCalled", () => {
  Iterable.logger.log("trackPurchase_paramsWithOptionalFields_methodCalled")

  // GIVEN the following parameters
  const total = 5
  const items = [new IterableCommerceItem("id", "swordfish", 64, 1, "SKU", "description", "url", "imageUrl", ["sword", "shield"])]
  const dataFields = {"key": "value"}

  // WHEN Iterable.trackPurchase is called
  Iterable.trackPurchase(total, items, dataFields)

  // THEN corresponding function is called on RNIterableAPI
  expect(MockRNIterableAPI.trackPurchase).toBeCalledWith(total, items, dataFields)
})

test("trackEvent_params_methodCalled", () => {
  Iterable.logger.log("trackPurchase_paramsWithOptionalFields_methodCalled")

  // GIVEN the following parameters
  const name = "EventName"
  const dataFields = { "DatafieldKey": "DatafieldValue" }

  // WHEN Iterable.trackEvent is called
  Iterable.trackEvent(name, dataFields)

  // THEN corresponding function is called on RNIterableAPI
  expect(MockRNIterableAPI.trackEvent).toBeCalledWith(name, dataFields)
})

test("setAttributionInfo/getAttributionInfo_attributionInfo_returnsAttributionInfo", () => {
  Iterable.logger.log("setAttributionInfo/getAttributionInfo_attributionInfo_returnsAttributionInfo")

  // GIVEN attribution info
  let campaignId = 1234
  let templateId = 5678
  let messageId = "qwer"

  // WHEN Iterable.setAttributionInfo is called with the given attribution info
  Iterable.setAttributionInfo(new IterableAttributionInfo(campaignId, templateId, messageId))

  // THEN Iterable.getAttrbutionInfo returns the given attribution info
  return Iterable.getAttributionInfo().then(attributionInfo => {
    expect(attributionInfo?.campaignId).toBe(campaignId)
    expect(attributionInfo?.templateId).toBe(templateId)
    expect(attributionInfo?.messageId).toBe(messageId)
  })
})

test("updateUser_params_methodCalled", () => {
  Iterable.logger.log("updateUser_params_methodCalled")

  // GIVEN the following parameters
  const dataFields = { "field": "value1" }

  // WHEN Iterable.updateUser is called
  Iterable.updateUser(dataFields, false)

  // THEN corresponding function is called on RNIterableAPI  
  expect(MockRNIterableAPI.updateUser).toBeCalledWith(dataFields, false)
})

test("updateEmail_email_methodCalled", () => {
  Iterable.logger.log("updateEmail_email_methodCalled")

  // GIVEN the new email
  const newEmail = "woo@newemail.com"

  // WHEN Iterable.updateEmail is called
  Iterable.updateEmail(newEmail)

  // THEN corresponding function is called on RNIterableAPI
  expect(MockRNIterableAPI.updateEmail).toBeCalledWith(newEmail, undefined)
})

test("updateEmail_emailAndToken_methodCalled", () => {
  Iterable.logger.log("updateEmail_emailAndToken_methodCalled")

  // GIVEN the new email and a token
  const newEmail = "woo@newemail.com"
  const newToken = "token2"

  // WHEN Iterable.updateEmail is called
  Iterable.updateEmail(newEmail, newToken)

  // THEN corresponding function is called on RNITerableAPI
  expect(MockRNIterableAPI.updateEmail).toBeCalledWith(newEmail, newToken)
})

test("iterableConfig_noParams_defaultValues", () => {
  // GIVEN no parameters
  // WHEN config is initialized 
  var config = new IterableConfig()

  // THEN config has default values
  expect(config.pushIntegrationName).toBe(undefined)
  expect(config.autoPushRegistration).toBe(true)
  expect(config.checkForDeferredDeeplink).toBe(false)
  expect(config.inAppDisplayInterval).toBe(30.0)
  expect(config.urlHandler).toBe(undefined)
  expect(config.customActionHandler).toBe(undefined)
  expect(config.inAppHandler).toBe(undefined)
  expect(config.authHandler).toBe(undefined)
  expect(config.logLevel).toBe(IterableLogLevel.info)
  expect(config.logReactNativeSdkCalls).toBe(true)
  expect(config.expiringAuthTokenRefreshPeriod).toBe(60.0)
  expect(config.allowedProtocols).toEqual([])
  expect(config.androidSdkUseInMemoryStorageForInApps).toBe(false)
  expect(config.useInMemoryStorageForInApps).toBe(false)
})

test("iterableConfig_noParams_defaultDictValues", () => {
  // GIVEN no parameters

  // WHEN config is initialized and converted to a dictionary
  var configDict = (new IterableConfig()).toDict()

  // THEN config has default dictionary values
  expect(configDict["pushIntegrationName"]).toBe(undefined)
  expect(configDict["autoPushRegistration"]).toBe(true)
  expect(configDict["inAppDisplayInterval"]).toBe(30.0)
  expect(configDict["urlHandlerPresent"]).toBe(false)
  expect(configDict["customActionHandlerPresent"]).toBe(false)
  expect(configDict["inAppHandlerPresent"]).toBe(false)
  expect(configDict["authHandlerPresent"]).toBe(false)
  expect(configDict["logLevel"]).toBe(IterableLogLevel.info)
  expect(configDict["expiringAuthTokenRefreshPeriod"]).toBe(60.0)
  expect(configDict["allowedProtocols"]).toEqual([])
  expect(configDict["androidSdkUseInMemoryStorageForInApps"]).toBe(false)
  expect(configDict["useInMemoryStorageForInApps"]).toBe(false)
})

test.skip("open url when url handler returns false", () => {
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

test.skip("do not open url when url handler returns false and canOpen is false", () => {
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

test.skip("do not open url when url handler returns true", () => {
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

test.skip("custom action handler is called", () => {
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
  nativeEmitter.emit(EventName.handleCustomActionCalled, { "action": actionDict, "context": { "action": actionDict, "source": IterableActionSource.inApp } });

  return TestHelper.delayed(0, () => {
    const expectedAction = new IterableAction(actionName, actionData)
    const expectedContext = new IterableActionContext(expectedAction, IterableActionSource.inApp)
    expect(config.customActionHandler).toBeCalledWith(expectedAction, expectedContext)
  })
})

test.skip("handle app link is called", () => {
  const link = "https://somewhere.com/link/something"
  Iterable.handleAppLink(link)
  expect(MockRNIterableAPI.handleAppLink).toBeCalledWith(link)
})

test.skip("update subscriptions is called", () => {
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

