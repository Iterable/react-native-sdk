import { MockRNIterableAPI } from './MockRNIterableAPI'
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js')

import * as ReactNative from 'react-native'

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
        RNIterableAPI: MockRNIterableAPI,
      },
      Linking: MockLinking,
    },
    ReactNative,
  )
})

class TestHelper {
  static delayed(delay: number, fn: () => void): Promise<any> {
    return new Promise(res => setTimeout(() => {
      fn()
      res()
    }, delay))
  }
}

export {
  MockLinking,
  TestHelper
}