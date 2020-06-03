jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js')

import * as ReactNative from 'react-native';

class RNIterableAPIMock {
  static email?: string
  static userId?: string
  static lastPushPayload?: any

  static getEmail(): Promise<string> {
    return new Promise((resolve, _) => {
      resolve(RNIterableAPIMock.email)
    })
  }

  static setEmail(email?: string) {
    RNIterableAPIMock.email = email
  }

  static getUserId(): Promise<string> {
    return new Promise((resolve, _) => {
      resolve(RNIterableAPIMock.userId)
    })
  }

  static setUserId(userId?: string) {
    RNIterableAPIMock.userId = userId
  }

  static disableDeviceForCurrentUser = jest.fn()

  static disableDeviceForAllUsers = jest.fn()

  static getLastPushPayload(): Promise<any | undefined> {
    return new Promise((resolve, _) => {
      resolve(RNIterableAPIMock.lastPushPayload)
    })
  }

  static initializeWithApiKey = jest.fn()
}

class MockLinking {
  static canOpenURL = jest.fn()
  static openURL = jest.fn()

  static addEventListener = jest.fn()
  static removeEventListener = jest.fn()
}

jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      // Mock RNIterableAPI
      NativeModules: {
        ...ReactNative.NativeModules,
        RNIterableAPI: RNIterableAPIMock,
      },
      Linking: MockLinking,
    },
    ReactNative,
  );
});

class TestHelper {
  static delayed(delay: number, fn: () => void): Promise<any> {
    return new Promise(res => setTimeout(() => {
      fn()
      res()
    }, delay))
  }
}



export { RNIterableAPIMock, MockLinking, TestHelper }