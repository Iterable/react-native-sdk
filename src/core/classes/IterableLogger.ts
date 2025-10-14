import { IterableLogLevel } from '../enums/IterableLogLevel';

const DEFAULT_LOG_LEVEL = IterableLogLevel.info;
const DEFAULT_LOGGING_ENABLED = true;

/**
 * A logger class for the Iterable SDK.
 *
 * This class is responsible for logging messages based on the configuration provided.
 *
 * TODO: add a logLevel property to the IterableLogger class to control the level of logging.
 *
 * @remarks
 * The logging behavior is controlled by the `logReactNativeSdkCalls` property
 * in {@link IterableConfig}.
 * If this property is not set, logging defaults to `true`, which is useful in unit testing or debug environments.
 *
 * @example
 * ```typescript
 * IterableLogger.logLevel = IterableLogLevel.debug;
 * IterableLogger.loggingEnabled = true;
 *
 * // This log will show in the developer console
 * IterableLogger.log('I will be shown.');
 *
 * Iterable.loggingEnabled = false;
 *
 * // This log will show in the developer console
 * IterableLogger.log('I will NOT be shown.');
 *
 * ```
 */
export class IterableLogger {
  /**
   * Whether logs should show in the developer console.
   */
  static loggingEnabled = DEFAULT_LOGGING_ENABLED;

  /**
   * The level of logging.
   *
   * This controls which logs will show when using the {@link IterableLogger.error}, {@link IterableLogger.debug}, and {@link IterableLogger.info} methods.
   */
  static logLevel = DEFAULT_LOG_LEVEL;

  /**
   * Sets whether logs should show in the developer console.
   *
   * @param loggingEnabled - Whether logs should show in the developer console.
   */
  static setLoggingEnabled(loggingEnabled?: boolean) {
    IterableLogger.loggingEnabled =
      typeof loggingEnabled === 'boolean'
        ? loggingEnabled
        : DEFAULT_LOGGING_ENABLED;
  }

  /**
   * Sets the level of logging to show in the developer console.
   *
   * @param logLevel - The level of logging to show in the developer console.
   */
  static setLogLevel(logLevel?: IterableLogLevel) {
    IterableLogger.logLevel =
      typeof logLevel === 'undefined' ? DEFAULT_LOG_LEVEL : logLevel;
  }

  /**
   * Logs a message to the console if logging is enabled.
   *
   * @param message - The message to be logged.
   *
   * @example
   * ```typescript
   * IterableLogger.log('I will show if logging is enabled');
   * ```
   */
  static log(message?: unknown, ...optionalParams: unknown[]) {
    if (!IterableLogger.loggingEnabled) return;

    console.log(message, ...optionalParams);
  }

  /**
   * Logs a message to the console if the log level is {@link IterableLogLevel.error}.
   *
   * @param message - The message to be logged.
   *
   * @example
   * ```typescript
   * IterableLogger.error('I will only show if the log level is error and logging is enabled');
   * ```
   */
  static error(message?: unknown, ...optionalParams: unknown[]) {
    if (!IterableLogger.loggingEnabled) return;
    if (IterableLogger.logLevel !== IterableLogLevel.error) return;

    console.log(`ERROR:`, message, ...optionalParams);
  }

  /**
   * Logs a message to the console if the log level is {@link IterableLogLevel.debug} or lower.
   *
   * @param message - The message to be logged.
   *
   * @example
   * ```typescript
   * IterableLogger.debug('I will show if the log level is debug and logging is enabled');
   * IterableLogger.debug('I will also show if the log level is error and logging is enabled');
   * ```
   */
  static debug(message?: unknown, ...optionalParams: unknown[]) {
    if (!IterableLogger.loggingEnabled) return;

    const shouldLog = [IterableLogLevel.error, IterableLogLevel.debug].includes(
      IterableLogger.logLevel
    );

    if (!shouldLog) return;

    console.log(`DEBUG:`, message, ...optionalParams);
  }

  /**
   * Logs a message to the console if the log level is {@link IterableLogLevel.info} or lower.
   *
   * @param message - The message to be logged.
   *
   * @example
   * ```typescript
   * IterableLogger.info('I will show if the log level is info and logging is enabled');
   * IterableLogger.info('I will also show if the log level is debug and logging is enabled');
   * IterableLogger.info('I will also show if the log level is error and logging is enabled');
   * ```
   */
  static info(message?: unknown, ...optionalParams: unknown[]) {
    if (!IterableLogger.loggingEnabled) return;

    console.log(`INFO:`, message, ...optionalParams);
  }
}
