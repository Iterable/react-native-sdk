import { MockRNIterableAPI } from './MockRNIterableAPI'
import { MockLinking } from './MockLinking'
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js')

import * as ReactNative from 'react-native'

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
