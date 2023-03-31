import IterableConfig from './IterableConfig'

class IterableLogger {
  readonly config: IterableConfig

  constructor (config: IterableConfig) {
    this.config = config
  }

  log (message: String): void {
    // default to `true` in the case of unit testing where `Iterable` is not initialized
    // which is most likely in a debug environment anyways
    const loggingEnabled = this.config.logReactNativeSdkCalls ?? true

    if (loggingEnabled) {
      console.log(message)
    }
  }
}

export { IterableLogger }
