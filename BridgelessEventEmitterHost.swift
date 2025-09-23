import Foundation
import React

@objc(BridgelessEventEmitterHost)
class BridgelessEventEmitterHost: NSObject {
    private let appContext: RCTAppContext

    init(appContext: RCTAppContext) {
        self.appContext = appContext
        super.init()
        NSLog("*** BridgelessEventEmitterHost initialized ***")
    }

    func send(name: String, body: Any?) {
        appContext.emit(eventName: name, payload: body)
    }

    func getShouldEmit() -> Bool {
        // Optional logic if you want to control flow
        return true
    }
}
