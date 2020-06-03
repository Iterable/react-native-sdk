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
  static canOpen = false
  static urlToOpen?: string

  static clear() {
    this.canOpen = false
    this.urlToOpen = undefined
  }

  static addEventListener = jest.fn()

  static removeEventListener = jest.fn()

  static canOpenURL(url: string): Promise<boolean> {
    return new Promise((resolve, _) => {
      resolve(this.canOpen)
    })
  }

  static openURL(url: string): Promise<any> {
    return new Promise((resolve, _) => {
      this.urlToOpen = url
      resolve(undefined)
    })
  }
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

export { RNIterableAPIMock, MockLinking }