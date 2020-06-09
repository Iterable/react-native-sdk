jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js')

import * as ReactNative from 'react-native'

import { IterableAttributionInfo } from '../Iterable'
import { IterableInAppMessage, IterableInAppLocation, IterableInAppDeleteSource } from '../IterableInAppClasses'

class MockRNIterableAPI {
  static email?: string
  static userId?: string
  static lastPushPayload?: any
  static attributionInfo?: IterableAttributionInfo

  static getEmail(): Promise<string> {
    return new Promise((resolve, _) => {
      resolve(MockRNIterableAPI.email)
    })
  }

  static setEmail(email?: string) {
    MockRNIterableAPI.email = email
  }

  static getUserId(): Promise<string> {
    return new Promise((resolve, _) => {
      resolve(MockRNIterableAPI.userId)
    })
  }

  static setUserId(userId?: string) {
    MockRNIterableAPI.userId = userId
  }

  static disableDeviceForCurrentUser = jest.fn()

  static disableDeviceForAllUsers = jest.fn()

  static trackPushOpenWithCampaignId = jest.fn()

  static trackPurchase = jest.fn()

  static trackInAppOpen = jest.fn()

  static trackInAppClick = jest.fn()

  static trackInAppClose = jest.fn()

  static trackEvent = jest.fn()

  static getLastPushPayload(): Promise<any | undefined> {
    return new Promise((resolve, _) => {
      resolve(MockRNIterableAPI.lastPushPayload)
    })
  }

  static getAttributionInfo(): Promise<IterableAttributionInfo | undefined> {
    return new Promise((resolve, _) => {
      resolve(MockRNIterableAPI.attributionInfo)
    })
  }

  static setAttributionInfo(attributionInfo?: IterableAttributionInfo) {
    MockRNIterableAPI.attributionInfo = attributionInfo
  }

  static initializeWithApiKey = jest.fn()

  static setInAppShowResponse = jest.fn()

  static getInAppMessages = jest.fn()

  static showMessage = jest.fn()

  static removeMessage = jest.fn()

  static setReadForMessage = jest.fn()

  static inAppConsume = jest.fn()

  static updateUser = jest.fn()

  static updateEmail = jest.fn()

  static handleUniversalLink = jest.fn()

  static updateSubscriptions = jest.fn()
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
  MockRNIterableAPI,
  MockLinking,
  TestHelper
}