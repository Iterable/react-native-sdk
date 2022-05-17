// move IterableLogLevel to here?
// rename to differentiate native and RN SDK logging levels?

class IterableLogger {
    // RN level logging

    log(message: String) {
        console.log(message)
    }
}

export { IterableLogger }