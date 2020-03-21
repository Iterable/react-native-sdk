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
    
    @objc let methodQueue = DispatchQueue.main
    
    @objc var bridge: RCTBridge!
    
    @objc(initializeWithApiKey:)
    func initializeWithApiKey(apiKey: String) {
        ITBInfo()
        IterableAPI.initialize(apiKey: apiKey)
    }

    @objc(setEmail:)
    func set(email: String) {
        ITBInfo()
        IterableAPI.email = email
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
}
