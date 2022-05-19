import { Iterable } from "./Iterable"

class IterableLogger {
    log(message: String) {
        var loggingEnabled = Iterable.savedConfig?.logReactNativeSdkCalls ?? true

        if (loggingEnabled) {
            console.log(message)
        }
    }
}

export { IterableLogger }