//
//  Created by Tapash Majumder on 6/17/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

import Foundation

@testable import IterableSDK

@objc(ReactE2E)
class ReactE2E: RCTEventEmitter {
    @objc(setApiKey:)
    func setApiKey(apiKey: String) {
        ITBInfo("setApiKey")
        self.apiKey = apiKey
    }
    
    @objc(sendCommand:params:)
    func sendCommand(command: String, params: [AnyHashable: Any]) {
        ITBInfo("sendCommand: \(command)")
        execute(command: Command.parse(str: command), params: params)
    }
    
    @objc(clearAllInAppMessages:rejecter:)
    func clearAllInAppMessages(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        ITBInfo()
        
        IterableAPISupport.clearAllInAppMessages(apiKey: apiKey, email: email)
        resolver(true)
    }
    
    override var methodQueue: DispatchQueue! {
        _methodQueue
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        false
    }

    enum EventName: String, CaseIterable {
        case handleUrlCalled
        case handleCustomActionCalled
        case handleInAppCalled
    }

    override func supportedEvents() -> [String]! {
        var result = [String]()
        EventName.allCases.forEach {
            result.append($0.rawValue)
        }
        return result
    }
    
    override func startObserving() {
        ITBInfo()
        shouldEmit = true
    }
    
    override func stopObserving() {
        ITBInfo()
        shouldEmit = false
    }
    
    enum Command: String {
        case initialize
        case sendInApp = "send-in-app"
        case unknown
        
        static func parse(str: String) -> Command {
            return Command(rawValue: str.lowercased()) ?? .unknown
        }
    }

    // MARK: Private
    private var apiKey: String!
    private var email = "user@example.com"
    private var shouldEmit = false
    private let _methodQueue = DispatchQueue(label: String(describing: ReactE2E.self))
    
    private func execute(command: Command, params: [AnyHashable: Any]) {
        switch command {
        case .initialize:
            break
        case .sendInApp:
            let campaignId = params["campaignId"] as! Int
            _ = IterableAPISupport.sendInApp(apiKey: apiKey, to: email, withCampaignId: campaignId)
            DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
                _ = IterableAPI.internalImplementation?.inAppManager.scheduleSync()
            }
            break
        default:
            ITBError("unknown command")
        }
    }
}
