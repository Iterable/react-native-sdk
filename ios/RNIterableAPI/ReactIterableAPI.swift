import Foundation
import IterableSDK
import React

@objc public protocol ReactIterableAPIDelegate {
  func sendEvent(withName: String, body: Any?)
}

@objc public class ReactIterableAPI: RCTEventEmitter {
  deinit {
    NotificationCenter.default.removeObserver(self)
  }

  @objc public weak var delegate: ReactIterableAPIDelegate? = nil

  @objc override public class func moduleName() -> String! {
    return "RNIterableAPI"
  }

  override open var methodQueue: DispatchQueue! {
    _methodQueue
  }

  @objc override static public func requiresMainQueueSetup() -> Bool {
    false
  }

  enum EventName: String, CaseIterable {
    case handleUrlCalled
    case handleCustomActionCalled
    case handleInAppCalled
    case handleAuthCalled
    case receivedIterableInboxChanged
    case handleAuthSuccessCalled
    case handleAuthFailureCalled
  }

  @objc public static var supportedEvents: [String] {
    return EventName.allCases.map(\.rawValue)
  }

  override public func startObserving() {
    ITBInfo()

    shouldEmit = true
  }

  override public func stopObserving() {
    ITBInfo()

    shouldEmit = false
  }

  // MARK: - Native SDK Functions

  @objc(initializeWithApiKey:config:version:resolver:rejecter:)
  public func initializeWithApiKey(
    apiKey: String,
    config configDict: NSDictionary,
    version: String,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    ITBInfo()

    initialize(
      withApiKey: apiKey,
      config: configDict,
      version: version,
      resolver: resolver,
      rejecter: rejecter)
  }

  @objc(initialize2WithApiKey:config:version:apiEndPointOverride:resolver:rejecter:)
  public func initialize2WithApiKey(
    apiKey: String,
    config configDict: NSDictionary,
    version: String,
    apiEndPointOverride: String,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    ITBInfo()

    initialize(
      withApiKey: apiKey,
      config: configDict,
      version: version,
      apiEndPointOverride: apiEndPointOverride,
      resolver: resolver,
      rejecter: rejecter)
  }

  @objc(setEmail:)
  public func setEmail(email: String?) {
    ITBInfo()
    IterableAPI.email = email
  }

  @objc(setEmail:authToken:)
  public func setEmail(email: String?, authToken: String?) {
    ITBInfo()
    IterableAPI.setEmail(email, authToken)
  }

  @objc(getEmail:rejecter:)
  public func getEmail(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
    ITBInfo()
    resolver(IterableAPI.email)
  }

  @objc(setUserId:)
  public func setUserId(userId: String?) {
    ITBInfo()
    IterableAPI.userId = userId
  }

  @objc(setUserId:authToken:)
  public func setUserId(userId: String?, authToken: String?) {
    ITBInfo()
    IterableAPI.setUserId(userId, authToken)
  }

  @objc(getUserId:rejecter:)
  public func getUserId(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
    ITBInfo()
    resolver(IterableAPI.userId)
  }

  // MARK: - Iterable API Request Functions

  @objc(setInAppShowResponse:)
  public func setInAppShowResponse(inAppShowResponse number: Double) {
    ITBInfo()
    self.inAppShowResponse = InAppShowResponse.from(number: number as NSNumber)
    inAppHandlerSemaphore.signal()
  }

  @objc(disableDeviceForCurrentUser)
  public func disableDeviceForCurrentUser() {
    ITBInfo()
    IterableAPI.disableDeviceForCurrentUser()
  }

  @objc(getLastPushPayload:rejecter:)
  public func getLastPushPayload(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock)
  {
    ITBInfo()
    resolver(IterableAPI.lastPushPayload)
  }

  @objc(getAttributionInfo:rejecter:)
  public func getAttributionInfo(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock)
  {
    ITBInfo()
    resolver(IterableAPI.attributionInfo.map(SerializationUtil.encodableToDictionary))
  }

  @objc(setAttributionInfo:)
  public func setAttributionInfo(attributionInfo dict: NSDictionary?) {
    ITBInfo()
    guard let swiftDict = dict as? [AnyHashable: Any] else {
      IterableAPI.attributionInfo = nil
      return
    }
    IterableAPI.attributionInfo = SerializationUtil.dictionaryToDecodable(
      dict: swiftDict)
  }

  @objc(trackPushOpenWithCampaignId:templateId:messageId:appAlreadyRunning:dataFields:)
  public func trackPushOpenWithCampaignId(
    campaignId: Double,
    templateId: NSNumber?,
    messageId: String,
    appAlreadyRunning: Bool,
    dataFields: NSDictionary?
  ) {
    ITBInfo()
    let swiftDict = dataFields as? [AnyHashable: Any]

    IterableAPI.track(
      pushOpen: campaignId as NSNumber,
      templateId: templateId,
      messageId: messageId,
      appAlreadyRunning: appAlreadyRunning,
      dataFields: swiftDict)
  }

  @objc(updateCart:)
  public func updateCart(items: [[AnyHashable: Any]]) {
    ITBInfo()
    IterableAPI.updateCart(items: items.compactMap(CommerceItem.from(dict:)))
  }

  @objc(trackPurchase:items:dataFields:)
  public func trackPurchase(
    total: Double,
    items: [[AnyHashable: Any]],
    dataFields: [AnyHashable: Any]?
  ) {
    ITBInfo()
    IterableAPI.track(
      purchase: total as NSNumber,
      items: items.compactMap(CommerceItem.from(dict:)),
      dataFields: dataFields)
  }

  @objc(trackInAppOpen:location:)
  public func trackInAppOpen(
    messageId: String,
    location locationNumber: Double
  ) {
    ITBInfo()
    guard let message = IterableAPI.inAppManager.getMessage(withId: messageId) else {
      ITBError("Could not find message with id: \(messageId)")
      return
    }
    IterableAPI.track(
      inAppOpen: message, location: InAppLocation.from(number: locationNumber as NSNumber))
  }

  @objc(trackInAppClick:location:clickedUrl:)
  public func trackInAppClick(
    messageId: String,
    location locationNumber: Double,
    clickedUrl: String
  ) {
    ITBInfo()
    guard let message = IterableAPI.inAppManager.getMessage(withId: messageId) else {
      ITBError("Could not find message with id: \(messageId)")
      return
    }
    IterableAPI.track(
      inAppClick: message, location: InAppLocation.from(number: locationNumber as NSNumber),
      clickedUrl: clickedUrl)
  }

  @objc(trackInAppClose:location:source:clickedUrl:)
  public func trackInAppClose(
    messageId: String,
    location locationNumber: Double,
    source sourceNumber: Double,
    clickedUrl: String?
  ) {
    ITBInfo()
    guard let message = IterableAPI.inAppManager.getMessage(withId: messageId) else {
      ITBError("Could not find message with id: \(messageId)")
      return
    }
    if let inAppCloseSource = InAppCloseSource.from(number: sourceNumber as NSNumber) {
      IterableAPI.track(
        inAppClose: message,
        location: InAppLocation.from(number: locationNumber as NSNumber),
        source: inAppCloseSource,
        clickedUrl: clickedUrl)
    } else {
      IterableAPI.track(
        inAppClose: message,
        location: InAppLocation.from(number: locationNumber as NSNumber),
        clickedUrl: clickedUrl)
    }
  }

  @objc(inAppConsume:location:source:)
  public func inAppConsume(
    messageId: String,
    location locationNumber: Double,
    source sourceNumber: Double
  ) {
    ITBInfo()
    guard let message = IterableAPI.inAppManager.getMessage(withId: messageId) else {
      ITBError("Could not find message with id: \(messageId)")
      return
    }
    if let inAppDeleteSource = InAppDeleteSource.from(number: sourceNumber as NSNumber) {
      IterableAPI.inAppConsume(
        message: message,
        location: InAppLocation.from(number: locationNumber as NSNumber),
        source: inAppDeleteSource)
    } else {
      IterableAPI.inAppConsume(
        message: message,
        location: InAppLocation.from(number: locationNumber as NSNumber))
    }
  }

  @objc(getHtmlInAppContentForMessage:resolver:rejecter:)
  public func getHtmlInAppContent(
    messageId: String, resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock
  ) {
    ITBInfo()
    guard let message = IterableAPI.inAppManager.getMessage(withId: messageId) else {
      ITBError("Could not find message with id: \(messageId)")
      rejecter(
        "", "Could not find message with id: \(messageId)",
        NSError(domain: "", code: 0, userInfo: nil))
      return
    }
    guard let content = message.content as? IterableHtmlInAppContent else {
      ITBError("Could not parse message content as HTML")
      rejecter(
        "", "Could not parse message content as HTML", NSError(domain: "", code: 0, userInfo: nil))
      return
    }
    resolver(content.toDict())
  }

  @objc(trackEvent:dataFields:)
  public func trackEvent(name: String, dataFields: NSDictionary?) {
    ITBInfo()

    IterableAPI.track(event: name, dataFields: dataFields as? [AnyHashable: Any])
  }

  @objc(updateUser:mergeNestedObjects:)
  public func updateUser(dataFields: NSDictionary, mergeNestedObjects: Bool) {
    ITBInfo()
    guard let fields = dataFields as? [AnyHashable: Any] else {
      ITBError("Could not cast dataFields to [AnyHashable: Any]")
      return
    }
    IterableAPI.updateUser(fields, mergeNestedObjects: mergeNestedObjects)
  }

  @objc(updateEmail:authToken:)
  public func updateEmail(email: String, with authToken: String?) {
    ITBInfo()
    if let authToken = authToken {
      IterableAPI.updateEmail(email, withToken: authToken, onSuccess: nil, onFailure: nil)
    } else {
      IterableAPI.updateEmail(email, onSuccess: nil, onFailure: nil)
    }
  }

  @objc(handleAppLink:resolver:rejecter:)
  public func handle(
    appLink: String, resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock
  ) {
    ITBInfo()
    if let url = URL(string: appLink) {
      resolver(IterableAPI.handle(universalLink: url))
    } else {
      rejecter("", "invalid URL", NSError(domain: "", code: 0, userInfo: nil))
    }
  }

  // MARK: - SDK In-App Manager Functions

  @objc(getInAppMessages:rejecter:)
  public func getInAppMessages(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
    ITBInfo()
    resolver(IterableAPI.inAppManager.getMessages().map { $0.toDict() })
  }

  @objc(getInboxMessages:rejecter:)
  public func getInboxMessages(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
    ITBInfo()
    resolver(IterableAPI.inAppManager.getInboxMessages().map { $0.toDict() })
  }

  @objc(getUnreadInboxMessagesCount:rejecter:)
  public func getUnreadInboxMessagesCount(
    resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock
  ) {
    ITBInfo()
    resolver(IterableAPI.inAppManager.getUnreadInboxMessagesCount())
  }

  @objc(showMessage:consume:resolver:rejecter:)
  public func showMessage(
    messageId: String, consume: Bool, resolver: @escaping RCTPromiseResolveBlock,
    rejecter: RCTPromiseRejectBlock
  ) {
    ITBInfo()
    guard let message = IterableAPI.inAppManager.getMessage(withId: messageId) else {
      ITBError("Could not find message with id: \(messageId)")
      return
    }
    DispatchQueue.main.async {
      IterableAPI.inAppManager.show(message: message, consume: consume) { (url) in
        resolver(url.map({ $0.absoluteString }))
      }
    }
  }

  @objc(removeMessage:location:source:)
  public func removeMessage(
    messageId: String, location locationNumber: Double, source sourceNumber: Double
  ) {
    ITBInfo()
    guard let message = IterableAPI.inAppManager.getMessage(withId: messageId) else {
      ITBError("Could not find message with id: \(messageId)")
      return
    }
    if let inAppDeleteSource = InAppDeleteSource.from(number: sourceNumber as NSNumber) {
      IterableAPI.inAppManager.remove(
        message: message,
        location: InAppLocation.from(number: locationNumber as NSNumber),
        source: inAppDeleteSource)
    } else {
      IterableAPI.inAppManager.remove(
        message: message,
        location: InAppLocation.from(number: locationNumber as NSNumber))
    }
  }

  @objc(
    updateSubscriptions:unsubscribedChannelIds:unsubscribedMessageTypeIds:subscribedMessageTypeIds:
    campaignId:templateId:
  )
  public func updateSubscriptions(
    emailListIds: [NSNumber]?,
    unsubscribedChannelIds: [NSNumber]?,
    unsubscribedMessageTypeIds: [NSNumber]?,
    subscribedMessageTypeIds: [NSNumber]?,
    campaignId: Double,
    templateId: Double
  ) {
    ITBInfo()
    let finalCampaignId: NSNumber? =
      (campaignId as NSNumber).intValue <= 0 ? nil : campaignId as NSNumber
    let finalTemplateId: NSNumber? =
      (templateId as NSNumber).intValue <= 0 ? nil : templateId as NSNumber
    IterableAPI.updateSubscriptions(
      emailListIds,
      unsubscribedChannelIds: unsubscribedChannelIds,
      unsubscribedMessageTypeIds: unsubscribedMessageTypeIds,
      subscribedMessageTypeIds: subscribedMessageTypeIds,
      campaignId: finalCampaignId,
      templateId: finalTemplateId)
  }

  @objc(setReadForMessage:read:)
  public func setReadForMessage(for messageId: String, read: Bool) {
    ITBInfo()
    guard let message = IterableAPI.inAppManager.getMessage(withId: messageId) else {
      ITBError("Could not find message with id: \(messageId)")
      return
    }
    IterableAPI.inAppManager.set(read: read, forMessage: message)
  }

  @objc(setAutoDisplayPaused:)
  public func setAutoDisplayPaused(autoDisplayPaused: Bool) {
    ITBInfo()
    DispatchQueue.main.async {
      IterableAPI.inAppManager.isAutoDisplayPaused = autoDisplayPaused
    }
  }

  // MARK: - SDK Inbox Session Tracking Functions

  @objc(startSession:)
  public func startSession(visibleRows: [[AnyHashable: Any]]) {
    let serializedRows = InboxImpressionTracker.RowInfo.rowInfos(from: visibleRows)
    inboxSessionManager.startSession(visibleRows: serializedRows)
  }

  @objc(endSession)
  public func endSession() {
    guard let sessionInfo = inboxSessionManager.endSession() else {
      ITBError("Could not find session info")
      return
    }
    let inboxSession = IterableInboxSession(
      id: sessionInfo.startInfo.id,
      sessionStartTime: sessionInfo.startInfo.startTime,
      sessionEndTime: Date(),
      startTotalMessageCount: sessionInfo.startInfo.totalMessageCount,
      startUnreadMessageCount: sessionInfo.startInfo.unreadMessageCount,
      endTotalMessageCount: IterableAPI.inAppManager.getInboxMessages().count,
      endUnreadMessageCount: IterableAPI.inAppManager.getUnreadInboxMessagesCount(),
      impressions: sessionInfo.impressions.map { $0.toIterableInboxImpression() })
    IterableAPI.track(inboxSession: inboxSession)
  }

  @objc(updateVisibleRows:)
  public func updateVisibleRows(visibleRows: [[AnyHashable: Any]]) {
    let serializedRows = InboxImpressionTracker.RowInfo.rowInfos(from: visibleRows)
    inboxSessionManager.updateVisibleRows(visibleRows: serializedRows)
  }

  // MARK: - SDK Auth Manager Functions

  @objc(passAlongAuthToken:)
  public func passAlongAuthToken(authToken: String?) {
    ITBInfo()
    self.passedAuthToken = authToken
    authHandlerSemaphore.signal()
  }

  @objc(pauseAuthRetries:)
  public func pauseAuthRetries(pauseRetry: Bool) {
    ITBInfo()
    IterableAPI.pauseAuthRetries(pauseRetry)
  }

  // MARK: Private
  private var shouldEmit = false
  private let _methodQueue = DispatchQueue(label: String(describing: ReactIterableAPI.self))

  // Handling in-app delegate
  private var inAppShowResponse = InAppShowResponse.show
  private var inAppHandlerSemaphore = DispatchSemaphore(value: 0)

  private var passedAuthToken: String?
  private var authHandlerSemaphore = DispatchSemaphore(value: 0)

  private let inboxSessionManager = InboxSessionManager()

  @objc func initialize(
    withApiKey apiKey: String,
    config configDict: NSDictionary,
    version: String,
    apiEndPointOverride: String? = nil,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    ITBInfo()
    let launchOptions = createLaunchOptions()
    guard let configDictTyped = configDict as? [AnyHashable: Any] else {
      rejecter("E_INVALID_CONFIG", "configDict could not be cast to [AnyHashable: Any]", nil)
      return
    }
    let iterableConfig = IterableConfig.from(
      dict: configDictTyped
    )

    if let urlHandlerPresent = configDict["urlHandlerPresent"] as? Bool, urlHandlerPresent == true {
      iterableConfig.urlDelegate = self
    }

    if let customActionHandlerPresent = configDict["customActionHandlerPresent"] as? Bool,
      customActionHandlerPresent == true
    {
      iterableConfig.customActionDelegate = self
    }

    if let inAppHandlerPresent = configDict["inAppHandlerPresent"] as? Bool,
      inAppHandlerPresent == true
    {
      iterableConfig.inAppDelegate = self
    }

    if let authHandlerPresent = configDict["authHandlerPresent"] as? Bool,
      authHandlerPresent == true
    {
      iterableConfig.authDelegate = self
    }

    // connect new inbox in-app payloads to the RN SDK
    NotificationCenter.default.addObserver(
      self, selector: #selector(receivedIterableInboxChanged),
      name: Notification.Name.iterableInboxChanged, object: nil)

    DispatchQueue.main.async {
      IterableAPI.initialize2(
        apiKey: apiKey,
        launchOptions: launchOptions,
        config: iterableConfig,
        apiEndPointOverride: apiEndPointOverride
      ) { result in
        resolver(result)
      }

      IterableAPI.setDeviceAttribute(name: "reactNativeSDKVersion", value: version)
    }
  }

  @objc(receivedIterableInboxChanged)
  func receivedIterableInboxChanged() {
    guard shouldEmit else {
      return
    }
    delegate?.sendEvent(
      withName: EventName.receivedIterableInboxChanged.rawValue, body: nil as Any?)
  }

  private func createLaunchOptions() -> [UIApplication.LaunchOptionsKey: Any]? {
    guard let bridge = self.bridge else {
      return nil
    }
    return ReactIterableAPI.createLaunchOptions(bridgeLaunchOptions: bridge.launchOptions)
  }

  private static func createLaunchOptions(bridgeLaunchOptions: [AnyHashable: Any]?)
    -> [UIApplication.LaunchOptionsKey: Any]?
  {
    guard let bridgeLaunchOptions = bridgeLaunchOptions,
      let remoteNotification = bridgeLaunchOptions[
        UIApplication.LaunchOptionsKey.remoteNotification.rawValue]
    else {
      return nil
    }
    var result = [UIApplication.LaunchOptionsKey: Any]()
    result[UIApplication.LaunchOptionsKey.remoteNotification] = remoteNotification
    return result
  }
}

extension ReactIterableAPI: IterableURLDelegate {
  public func handle(iterableURL url: URL, inContext context: IterableActionContext) -> Bool {
    ITBInfo()
    guard shouldEmit else {
      return false
    }
    let contextDict = ReactIterableAPI.contextToDictionary(context: context)
    delegate?.sendEvent(
      withName: EventName.handleUrlCalled.rawValue,
      body: [
        "url": url.absoluteString,
        "context": contextDict,
      ] as [String: Any])
    return true
  }

  private static func contextToDictionary(context: IterableActionContext) -> [AnyHashable: Any] {
    var result = [AnyHashable: Any]()
    let actionDict = actionToDictionary(action: context.action)
    result["action"] = actionDict
    result["source"] = context.source.rawValue
    return result
  }

  private static func actionToDictionary(action: IterableAction) -> [AnyHashable: Any] {
    var actionDict = [AnyHashable: Any]()
    actionDict["type"] = action.type
    if let data = action.data {
      actionDict["data"] = data
    }
    if let userInput = action.userInput {
      actionDict["userInput"] = userInput
    }
    return actionDict
  }
}

extension ReactIterableAPI: IterableCustomActionDelegate {
  public func handle(
    iterableCustomAction action: IterableAction, inContext context: IterableActionContext
  )
    -> Bool
  {
    ITBInfo()
    let actionDict = ReactIterableAPI.actionToDictionary(action: action)
    let contextDict = ReactIterableAPI.contextToDictionary(context: context)
    delegate?.sendEvent(
      withName: EventName.handleCustomActionCalled.rawValue,
      body: [
        "action": actionDict,
        "context": contextDict,
      ])
    return true
  }
}

extension ReactIterableAPI: IterableInAppDelegate {
  public func onNew(message: IterableInAppMessage) -> InAppShowResponse {
    ITBInfo()
    guard shouldEmit else {
      return .show
    }
    delegate?.sendEvent(
      withName: EventName.handleInAppCalled.rawValue,
      body: message.toDict())
    let timeoutResult = inAppHandlerSemaphore.wait(timeout: .now() + 2.0)
    if timeoutResult == .success {
      ITBInfo("inAppShowResponse: \(inAppShowResponse == .show)")
      return inAppShowResponse
    } else {
      ITBInfo("timed out")
      return .show
    }
  }
}

extension ReactIterableAPI: IterableAuthDelegate {
  public func onAuthFailure(_ authFailure: IterableSDK.AuthFailure) {
    ITBInfo()

    var failureDict: [String: Any] = [:]
    failureDict["userKey"] = authFailure.userKey
    failureDict["failedAuthToken"] = authFailure.failedAuthToken
    failureDict["failedRequestTime"] = authFailure.failedRequestTime
    failureDict["failureReason"] = authFailure.failureReason.rawValue

    delegate?.sendEvent(
      withName: EventName.handleAuthFailureCalled.rawValue,
      body: failureDict)
  }

  public func onAuthTokenRequested(completion: @escaping AuthTokenRetrievalHandler) {
    ITBInfo()
    DispatchQueue.global(qos: .userInitiated).async {
      self.delegate?.sendEvent(
        withName: EventName.handleAuthCalled.rawValue,
        body: nil as Any?)
      let authTokenRetrievalResult = self.authHandlerSemaphore.wait(timeout: .now() + 30.0)
      if authTokenRetrievalResult == .success {
        ITBInfo("authTokenRetrieval successful")
        DispatchQueue.main.async {
          completion(self.passedAuthToken)
        }
        self.delegate?.sendEvent(
          withName: EventName.handleAuthSuccessCalled.rawValue,
          body: nil as Any?)
      } else {
        ITBInfo("authTokenRetrieval timed out")
        DispatchQueue.main.async {
          completion(nil)
        }
        // TODO: RN should be able to handle nil case as well. Or we can wrap this up under one of the existing AuthFailure. But again, its not a authFailure in this one. Its a timeout error.
        // TODO: Create a Dictionary representing AuthFailure object due to `null` auth token and pass it in body instead of passing `nil`
        self.delegate?.sendEvent(
          withName: EventName.handleAuthFailureCalled.rawValue,
          body: nil as Any?)
      }
    }
  }

  public func onTokenRegistrationFailed(_ reason: String?) {
  }
}
