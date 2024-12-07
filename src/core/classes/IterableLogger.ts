import { IterableConfig } from './IterableConfig';

/**
 * A logger class for the Iterable SDK.
 *
 * This class is responsible for logging messages based on the configuration provided.
 *
 * @remarks
 * The logging behavior is controlled by the `logReactNativeSdkCalls` property
 * in {@link IterableConfig}.
 * If this property is not set, logging defaults to `true`, which is useful in unit testing or debug environments.
 *
 * @example
 * ```typescript
 * const config = new IterableConfig();
 * config.logReactNativeSdkCalls = true;
 * const logger = new IterableLogger(config);
 * logger.log('This is a log message.');
 * ```
 */
export class IterableLogger {
  /**
   * The configuration settings for the Iterable SDK.
   * This property is read-only and is initialized with an instance of `IterableConfig`.
   */
  readonly config: IterableConfig;

  /**
   * Creates an instance of IterableLogger.
   *
   * @param config - The configuration object for IterableLogger.
   */
  constructor(config: IterableConfig) {
    this.config = config;
  }

  /**
   * Logs a message to the console if logging is enabled.
   *
   * @param message - The message to be logged.
   */
  log(message: string) {
    // default to `true` in the case of unit testing where `Iterable` is not initialized
    // which is most likely in a debug environment anyways
    const loggingEnabled = this.config.logReactNativeSdkCalls ?? true;

    if (loggingEnabled) {
      console.log(message);
    }
  }
}
