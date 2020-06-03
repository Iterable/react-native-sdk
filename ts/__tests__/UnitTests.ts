import { Iterable, IterableConfig, IterableActionContext, EventName } from '../Iterable'
import { RNIterableAPIMock, MockLinking } from '../__mocks__/jest.setup'
import { NativeEventEmitter } from 'react-native'

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

test("open url when url delegate returns false", async () => {
  MockLinking.clear()
  MockLinking.canOpen = true
  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleUrlCalled)

  const expectedUrl = "https://somewhere.com"
  const config = new IterableConfig()
  config.urlDelegate = (url: string, context: IterableActionContext) => {
    expect(url).toBe(expectedUrl)
    return false
  }

  Iterable.initialize("apiKey", config)
  const actionDict = { "type": "openUrl" }
  nativeEmitter.emit(EventName.handleUrlCalled, { "url": expectedUrl, "context": { "action": actionDict, "source": "inApp" } });

  await new Promise(res => setTimeout(() => {
    expect(MockLinking.urlToOpen).toBe(expectedUrl)
    res()
  }, 100))
})

test("do not open url when url delegate returns false and canOpen is false", async () => {
  MockLinking.clear()
  MockLinking.canOpen = false
  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleUrlCalled)

  const expectedUrl = "https://somewhere.com"
  const config = new IterableConfig()
  config.urlDelegate = (url: string, context: IterableActionContext) => {
    expect(url).toBe(expectedUrl)
    return false
  }

  Iterable.initialize("apiKey", config)
  const actionDict = { "type": "openUrl" }
  nativeEmitter.emit(EventName.handleUrlCalled, { "url": expectedUrl, "context": { "action": actionDict, "source": "inApp" } });

  await new Promise(res => setTimeout(() => {
    expect(MockLinking.urlToOpen).not.toBe(expectedUrl)
    res()
  }, 100))
})

test("do not open url when url delegate returns true", async () => {
  MockLinking.clear()
  MockLinking.canOpen = true
  const nativeEmitter = new NativeEventEmitter();
  nativeEmitter.removeAllListeners(EventName.handleUrlCalled)

  const expectedUrl = "https://somewhere.com"
  const config = new IterableConfig()
  config.urlDelegate = (url: string, context: IterableActionContext) => {
    expect(url).toBe(expectedUrl)
    return true
  }

  Iterable.initialize("apiKey", config)
  const actionDict = { "type": "openUrl" }
  nativeEmitter.emit(EventName.handleUrlCalled, { "url": expectedUrl, "context": { "action": actionDict, "source": "inApp" } });

  await new Promise(res => setTimeout(() => {
    expect(MockLinking.urlToOpen).not.toBe(expectedUrl)
    res()
  }, 100))
})
