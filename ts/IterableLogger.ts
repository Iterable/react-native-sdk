import { Iterable } from "./Iterable"

class IterableLogger {
    log(message: String) {
        if (Iterable.savedConfig.logReactNativeSdkCalls) {
            console.log(message)
        }
    }
}

export { IterableLogger }