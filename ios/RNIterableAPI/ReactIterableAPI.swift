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
    
    @objc(initializeWithApiKey:config:)
    func initialize(apiKey: String, config: [AnyHashable: Any]?) {
        ITBInfo()
        let launchOptions = createLaunchOptions()
        let config = ReactIterableAPI.createIterableConfig(from: config)
        
        DispatchQueue.main.async {
            IterableAPI.initialize(apiKey: apiKey, launchOptions: launchOptions, config: config)
        }
    }

    @objc(setEmail:)
    func set(email: String) {
        ITBInfo()
        IterableAPI.email = email
    }
    
    @objc(getEmail:rejecter:)
    func getEmail(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        ITBInfo()
        resolver(IterableAPI.email)
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
