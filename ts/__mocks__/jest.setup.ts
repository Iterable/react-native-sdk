jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js')

import * as ReactNative from 'react-native'

import { IterableAttributionInfo } from '../Iterable'
import { IterableInAppMessage, IterableInAppLocation, IterableInAppDeleteSource } from '../IterableInAppClasses'

class RNIterableAPIMock {
  static email?: string
  static userId?: string
  static lastPushPayload?: any
  static attributionInfo?: IterableAttributionInfo

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

  static trackPushOpenWithCampaignId = jest.fn()

  static trackPurchase = jest.fn()

  static trackInAppOpen = jest.fn()

  static trackInAppClick = jest.fn()

  static trackInAppClose = jest.fn()

  static trackEvent = jest.fn()

  static getLastPushPayload(): Promise<any | undefined> {
    return new Promise((resolve, _) => {
      resolve(RNIterableAPIMock.lastPushPayload)
    })
  }

  static getAttributionInfo(): Promise<IterableAttributionInfo | undefined> {
    return new Promise((resolve, _) => {
      resolve(RNIterableAPIMock.attributionInfo)
    })
  }

  static setAttributionInfo(attributionInfo?: IterableAttributionInfo) {
    RNIterableAPIMock.attributionInfo = attributionInfo
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



export { RNIterableAPIMock, MockLinking, TestHelper }