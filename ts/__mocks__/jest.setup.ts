jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js')

import * as ReactNative from 'react-native';

class IterableAttributionInfo {
  campaignId: number
  templateId: number
  messageId: string

  constructor(campaignId: number, templateId: number, messageId: string) {
    this.campaignId = campaignId
    this.templateId = templateId
    this.messageId = messageId
  }
}

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
    },
    ReactNative,
  );
});

export { RNIterableAPIMock }