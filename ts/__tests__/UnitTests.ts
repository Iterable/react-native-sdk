import { Iterable, IterableConfig, PushServicePlatform } from '../Iterable'

test("set/get email", () => {
  Iterable.setEmail("user@example.com")
  return Iterable.getEmail().then(email => {
    expect(email).toBe("user@example.com")
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