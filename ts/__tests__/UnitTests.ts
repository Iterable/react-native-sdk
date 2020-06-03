import { Iterable, IterableAttributionInfo } from '../Iterable'
import { RNIterableAPIMock } from '../__mocks__/jest.setup'
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

test("set/get attribution info", () => {
  Iterable.getAttributionInfo().then(attributionInfo => {
    expect(attributionInfo?.campaignId).toBe(0)
    expect(attributionInfo?.templateId).toBe(0)
    expect(attributionInfo?.messageId).toBe("")
  })

  let campaignId = 1234
  let templateId = 5678
  let messageId = "qwer"

  Iterable.setAttributionInfo(new IterableAttributionInfo(campaignId, templateId, messageId))

  Iterable.getAttributionInfo().then(attributionInfo => {
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