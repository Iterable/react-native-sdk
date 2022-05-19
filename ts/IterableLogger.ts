import { Iterable } from "./Iterable"

class IterableLogger {
    log(message: String) {
        // default to `true` in the case of unit testing where `Iterable` is not initialized
        // which is most likely in a debug environment anyways
        var loggingEnabled = Iterable.savedConfig?.logReactNativeSdkCalls ?? true

        if (loggingEnabled) {
            console.log(message)
        }
    }
}

export { IterableLogger }