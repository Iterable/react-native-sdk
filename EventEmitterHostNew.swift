// import Foundation
// import React

// @objc(EventEmitterHostNew)
// class EventEmitterHostNew: NSObject {
//     private let appContext: RCTAppContext

//     init(appContext: RCTAppContext) {
//         self.appContext = appContext
//         super.init()
//         NSLog("*** EventEmitterHostNew initialized ***")
//     }

//     func send(name: String, body: Any?) {
//         appContext.emit(eventName: name, payload: body)
//     }

//     func getShouldEmit() -> Bool {
//         // Optional logic if you want to control flow
//         return true
//     }
// }




// // class EventEmitterHostNew {
// //   private var legacyEmitter: LegacyEventEmitter?
// //   private var bridgelessEmitter: BridgelessEventEmitter?

// //   init(bridge: RCTBridge) {
// //     NSLog("*** LEGACY EventDispatcher init ***")
// //     self.legacyEmitter = bridge.module(for: LegacyEventEmitter.self) as? LegacyEventEmitter
// //   }

// //   init(appContext: RCTAppContext) {
// //     NSLog("*** BRIDGELESS EventDispatcher init ***")
// //     self.bridgelessEmitter = BridgelessEventEmitter(appContext: appContext)
// //   }

// //   func send(name: String, body: Any?) {
// //     if let emitter = legacyEmitter {
// //       emitter.send(name, body: body)
// //     } else if let emitter = bridgelessEmitter {
// //       emitter.send(name, body: body)
// //     } else {
// //       NSLog("⚠️ No event emitter available to send event: \(name)")
// //     }
// //   }
// // }
