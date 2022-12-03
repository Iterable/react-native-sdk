import { IterableAttributionInfo } from '../Iterable'

export class MockRNIterableAPI {
  static email?: string
  static userId?: string
  static token?: string
  static lastPushPayload?: any
  static attributionInfo?: IterableAttributionInfo

  static getEmail(): Promise<string> {
    return new Promise((resolve, _) => {
      resolve(MockRNIterableAPI.email)
    })
  }

  static setEmail(email: string, authToken?: string | undefined) {
    MockRNIterableAPI.email = email
    MockRNIterableAPI.token = authToken
  }

  static getUserId(): Promise<string> {
    return new Promise((resolve, _) => {
      resolve(MockRNIterableAPI.userId)
    })
  }

  static setUserId(userId: string, authToken?: string | undefined) {
    MockRNIterableAPI.userId = userId
    MockRNIterableAPI.token = authToken
  }

  static disableDeviceForCurrentUser = jest.fn()

  static trackPushOpenWithCampaignId = jest.fn()

  static updateCart = jest.fn()

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

  static setAutoDisplayPaused = jest.fn()

  static showMessage = jest.fn()

  static removeMessage = jest.fn()

  static setReadForMessage = jest.fn()

  static inAppConsume = jest.fn()

  static updateUser = jest.fn()

  static updateEmail = jest.fn()

  static handleAppLink = jest.fn()

  static updateSubscriptions = jest.fn()
}

