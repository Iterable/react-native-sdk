// move IterableLogLevel to here?
// rename to differentiate native and RN SDK logging levels?

class IterableLogger {
    // RN level logging here
    // RN logging on/off here

    log(message: String) {
        console.log(message)
    }
}

export { IterableLogger }