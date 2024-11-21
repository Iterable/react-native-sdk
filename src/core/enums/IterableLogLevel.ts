/**
 * Enum representing the level of logs will Android and iOS projects be using.
 *
 * @see [Android Log Levels](https://source.android.com/docs/core/tests/debug/understanding-logging)
 * @see [iOS Log Levels](https://apple.github.io/swift-log/docs/current/Logging/Structs/Logger/Level.html#/s:7Logging6LoggerV5LevelO4infoyA2EmF)
 */
export enum IterableLogLevel {
  /** Appropriate for messages that contain information normally of use only when debugging a program. */
  debug = 1,
  /** Appropriate for informational messages. */
  info = 2,
  /** Appropriate for error conditions. */
  error = 3,
}
