//
//  Created by Tapash Majumder on 3/19/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

import Foundation

import IterableSDK;

@objc(ReactIterableAPI)
class ReactIterableAPI: NSObject {
    @objc
    func initializeWithApiKey(_ apiKey: String) {
        ITBInfo()
        IterableAPI.initialize(apiKey: apiKey)
    }

    @objc
    func setEmail(_ email: String) {
        ITBInfo()
        IterableAPI.email = email
    }
    
    @objc(getInAppMessages:rejecter:)
    func getInAppMessages(_ resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        ITBInfo()
        resolver(IterableAPI.inAppManager.getMessages())
    }
    
    @objc
    func track(_ event: String) {
        ITBInfo()
        IterableAPI.track(event: event)
    }
}
