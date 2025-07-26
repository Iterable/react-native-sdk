// class EventDispatcherAnother {
//     private var legacyEmitter: EventEmitterHostLegacy?
//     private var bridgelessEmitter: EventEmitterHostNew?

//     init(bridge: RCTBridge) {
//         NSLog("*** LEGACY EventDispatcher init ***")
//         self.legacyEmitter = bridge.module(for: EventEmitterHostLegacy.self) as? EventEmitterHostLegacy
//     }

//     init(appContext: RCTAppContext) {
//         NSLog("*** BRIDGELESS EventDispatcher init ***")
//         self.bridgelessEmitter = EventEmitterHostNew(appContext: appContext)
//     }

//     func send(name: String, body: Any?) {
//         if let emitter = legacyEmitter {
//             emitter.send(name: name, body: body)
//         } else if let emitter = bridgelessEmitter {
//             emitter.send(name: name, body: body)
//         } else {
//             NSLog("⚠️ No emitter available to send event: \(name)")
//         }
//     }

//     func getShouldEmit() -> Bool {
//         return legacyEmitter?.getShouldEmit() ?? bridgelessEmitter?.getShouldEmit() ?? false
//     }
// }
