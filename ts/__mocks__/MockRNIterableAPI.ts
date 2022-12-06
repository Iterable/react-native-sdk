import { IterableAttributionInfo } from '../Iterable'
import IterableInAppMessage from '../IterableInAppMessage'

export class MockRNIterableAPI {
  static email?: string
  static userId?: string
  static token?: string
  static lastPushPayload?: any
  static attributionInfo?: IterableAttributionInfo
  static messages?: IterableInAppMessage[]
  static clickedUrl?: string

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

  static getInAppMessages(): Promise<IterableInAppMessage[] | undefined> {
    return new Promise((resolve, _) => {
      resolve(MockRNIterableAPI.messages)
    })
  }

  static setAutoDisplayPaused = jest.fn()

  static showMessage(message: IterableInAppMessage, consume: boolean): Promise<string | undefined> {
    return new Promise((resolve, _) => {
      resolve(MockRNIterableAPI.clickedUrl)
    })
  }

  static removeMessage = jest.fn()

  static setReadForMessage = jest.fn()

  static inAppConsume = jest.fn()

  static updateUser = jest.fn()

  static updateEmail = jest.fn()

  static handleAppLink = jest.fn()

  static updateSubscriptions = jest.fn()

  // set messages function is to set the messages static property
  // this is for testing purposes only
  static setMessages(messages: IterableInAppMessage[]) {
    MockRNIterableAPI.messages = messages
  
  // setClickedUrl function is to set the messages static property
  // this is for testing purposes only
  static setClickedUrl(clickedUrl: string) {
    MockRNIterableAPI.clickedUrl = clickedUrl
  }
}

