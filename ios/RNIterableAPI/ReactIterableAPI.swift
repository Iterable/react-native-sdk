//
//  Created by Tapash Majumder on 3/19/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

import Foundation

import IterableSDK;

@objc(ReactIterableAPI)
class ReactIterableAPI: NSObject, RCTBridgeModule {
    @objc static func moduleName() -> String! {
        return "RNIterableAPI"
    }
    
    @objc var bridge: RCTBridge!
    
    @objc let methodQueue = DispatchQueue(label: String(describing: ReactIterableAPI.self))
    
    @objc static func requiresMainQueueSetup() -> Bool {
        false
    }

    @objc(initializeWithApiKeyAndConfig:config:)
    func initialize(apiKey: String, config: [AnyHashable: Any]?) {
        ITBInfo()
        initialize(apiKey: apiKey, config: config, urlCallback: nil)
    }

    @objc(initializeWithApiKeyAndConfigAndUrlCallback:config:urlCallback:)
    func initialize(apiKey: String, config: [AnyHashable: Any]?, urlCallback: RCTResponseSenderBlock?) {
        ITBInfo()
        let launchOptions = createLaunchOptions()
        let iterableConfig = ReactIterableAPI.createIterableConfig(from: config)
        if let urlCallback = urlCallback {
            self.urlCallback = urlCallback
            iterableConfig.urlDelegate = self
        }
        
        DispatchQueue.main.async {
            IterableAPI.initialize(apiKey: apiKey, launchOptions: launchOptions, config: iterableConfig)
        }
        
        //TODO:tqm remove
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
            ITBInfo("sending url delegate")
            let url = URL(string: "https://somewhere.com")!
            let action = IterableAction.action(fromDictionary: ["type" : "openUrl", "data": url.absoluteString])!
            _ = iterableConfig.urlDelegate?.handle(iterableURL: url,
                                               inContext: IterableActionContext(action: action,
                                                                                source: .push))
        }
    }

    @objc(setEmail:)
    func set(email: String?) {
        ITBInfo()
        IterableAPI.email = email
    }
    
    @objc(getEmail:rejecter:)
    func getEmail(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        ITBInfo()
        resolver(IterableAPI.email)
    }

    @objc(setUserId:)
    func set(userId: String?) {
        ITBInfo()
        IterableAPI.userId = userId
    }
    
    @objc(getUserId:rejecter:)
    func getUserId(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        ITBInfo()
        resolver(IterableAPI.userId)
    }
    
    @objc(setUrlHandled:)
    func set(urlHandled: Bool) {
        self.urlHandled = urlHandled
        urlDelegateSemaphore.signal()
    }

    @objc(disableDeviceForCurrentUser)
    func disableDeviceForCurrentUser() {
        ITBInfo()
        IterableAPI.disableDeviceForCurrentUser()
    }
    
    @objc(disableDeviceForAllUsers)
    func disableDeviceForAllUsers() {
        ITBInfo()
        IterableAPI.disableDeviceForAllUsers()
    }

    @objc(getInAppMessages:rejecter:)
    func getInAppMessages(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        ITBInfo()
        resolver(IterableAPI.inAppManager.getMessages())
    }
    
    @objc(trackEvent:)
    func track(event: String) {
        ITBInfo()
        IterableAPI.track(event: event)
    }
    
    // Handling url delegate
    private var urlCallback: RCTResponseSenderBlock?
    private var urlHandled = false
    private var urlDelegateSemaphore = DispatchSemaphore(value: 0)

    private func createLaunchOptions() -> [UIApplication.LaunchOptionsKey: Any]? {
        guard let bridge = bridge else {
            return nil
        }

        return ReactIterableAPI.createLaunchOptions(bridgeLaunchOptions: bridge.launchOptions)
    }
    
    private static func createLaunchOptions(bridgeLaunchOptions: [AnyHashable: Any]?) -> [UIApplication.LaunchOptionsKey: Any]? {
        guard let bridgeLaunchOptions = bridgeLaunchOptions,
            let remoteNotification = bridgeLaunchOptions[UIApplication.LaunchOptionsKey.remoteNotification.rawValue] else {
            return nil
        }
        
        var result = [UIApplication.LaunchOptionsKey: Any]()
        result[UIApplication.LaunchOptionsKey.remoteNotification] = remoteNotification
        return result
    }
    
    private static func createIterableConfig(from dict: [AnyHashable: Any]?) -> IterableConfig {
        let config = IterableConfig()
        guard let dict = dict else {
            return config
        }
        
        if let pushIntegrationName = dict["pushIntegrationName"] as? String {
            config.pushIntegrationName = pushIntegrationName
        }
        if let sandboxPushIntegrationName = dict["sandboxPushIntegrationName"] as? String {
            config.sandboxPushIntegrationName = sandboxPushIntegrationName
        }
        if let intValue = dict["pushPlatform"] as? Int, let pushPlatform = PushServicePlatform(rawValue: intValue) {
            config.pushPlatform = pushPlatform
        }
        if let autoPushRegistration = dict["autoPushRegistration"] as? Bool {
            config.autoPushRegistration = autoPushRegistration
        }
        if let checkForDeferredDeeplink = dict["checkForDeferredDeeplink"] as? Bool {
            config.checkForDeferredDeeplink = checkForDeferredDeeplink
        }

        return config
    }
}

extension ReactIterableAPI: IterableURLDelegate {
    func handle(iterableURL url: URL, inContext context: IterableActionContext) -> Bool {
        ITBInfo()
        urlCallback?([NSNull(), url.absoluteString, ReactIterableAPI.contextToDictionary(context: context)])
        let timeoutResult = urlDelegateSemaphore.wait(timeout: .now() + 2.0)
        if timeoutResult == .success {
            ITBInfo("urlHandled: \(urlHandled)")
            return urlHandled
        } else {
            ITBInfo("timed out")
            return false
        }
    }
    
    private static func contextToDictionary(context: IterableActionContext) -> [AnyHashable: Any] {
        var result = [AnyHashable: Any]()
        var actionDict = [AnyHashable: Any]()
        actionDict["type"] = context.action.type
        if let data = context.action.data {
            actionDict["data"] = data
        }
        if let userInput = context.action.userInput {
            actionDict["userInput"] = userInput
        }
        
        result["action"] = actionDict
        result["source"] = context.source.rawValue
        return result
    }
}
