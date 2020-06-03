import { Iterable, IterableAttributionInfo, IterableConfig, PushServicePlatform } from '../Iterable'
import { RNIterableAPIMock } from '../__mocks__/jest.setup'

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