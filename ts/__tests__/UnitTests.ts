import { Iterable, IterableConfig, IterableActionContext, EventName, IterableAction, IterableActionSource } from '../Iterable'
import { RNIterableAPIMock, MockLinking, TestHelper } from '../__mocks__/jest.setup'
import { NativeEventEmitter } from 'react-native'
import { IterableInAppTriggerType, IterableInAppMessage, IterableInAppShowResponse, IterableInAppTrigger } from '../IterableInAppClasses'

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
    let expectedAction = new IterableAction(actionName, actionData)
    let expectedContext = new IterableActionContext(expectedAction, IterableActionSource.inApp)
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
    let expectedMessage = new IterableInAppMessage("message1", 1234, new IterableInAppTrigger(IterableInAppTriggerType.immediate), undefined, undefined, false, undefined, undefined, false)
    expect(config.inAppDelegate).toBeCalledWith(expectedMessage)
    expect(RNIterableAPIMock.setInAppShowResponse).toBeCalledWith(IterableInAppShowResponse.show)
  })
})
