import { Iterable, IterableCommerceItem } from '../Iterable'
import { RNIterableAPIMock } from '../__mocks__/jest.setup'
import { IterableInAppMessage, IterableInAppLocation, IterableInAppTrigger, IterableInAppTriggerType, IterableInboxMetadata } from '../IterableInAppClasses'

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
  Iterable.trackPushOpenWithCampaignId(123,234,"SOMEMESSAEGID",false,{"dataFieldKey":"dataFieldValue"})

  expect(RNIterableAPIMock.trackPushOpenWithCampaignId).toBeCalledWith(
    expect.any(Number),
    expect.any(Number),
    expect.any(String),
    expect.any(Boolean),
    expect.any(Object)
  )
})

test("trackPurchase", () => {

  Iterable.trackPurchase(
    10,
    [new IterableCommerceItem("id1","Boba Tea", 18, 26)],
    {"dataFieldKey":"dataFieldValue"}
  )

  expect(RNIterableAPIMock.trackPurchase).toBeCalledWith(
    expect.any(Number),
    expect.any(Object),
    expect.any(Object)
  )

})
