import { Iterable, IterableAttributionInfo, IterableConfig, PushServicePlatform, IterableCommerceItem } from '../Iterable'
import { RNIterableAPIMock } from '../__mocks__/jest.setup'
import { IterableInAppMessage, IterableInAppLocation, IterableInAppTrigger, IterableInAppTriggerType, IterableInboxMetadata, IterableInAppCloseSource } from '../IterableInAppClasses'

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
