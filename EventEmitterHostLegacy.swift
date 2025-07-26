// // EventEmitterHost.swift
// import Foundation
// import React

// @objc class EventEmitterHostLegacy: RCTEventEmitter {
//     static let shared = EventEmitterHost()

//     private var shouldEmit = false

//     override init() {
//         super.init()
//         NSLog("*** EventEmitterHost initialized ***")
//     }

//     override class func moduleName() -> String! {
//         return "EventEmitterHost"
//     }

//     override func supportedEvents() -> [String] {
//         return ReactIterableAPI.EventName.allCases.map(\.rawValue)
//     }

//     override class func requiresMainQueueSetup() -> Bool {
//         return false
//     }

//     override func startObserving() {
//         ITBInfo()
//         shouldEmit = true
//     }

//     override func stopObserving() {
//         ITBInfo()
//         shouldEmit = false
//     }

//     func send(name: String, body: Any?) {
//         guard shouldEmit else {
//             NSLog("[EventEmitterHost] Skipping emit: \(name), no listeners")
//             return
//         }
//         sendEvent(withName: name, body: body)
//     }

//     func getShouldEmit() -> Bool {
//         return shouldEmit
//     }
// }
