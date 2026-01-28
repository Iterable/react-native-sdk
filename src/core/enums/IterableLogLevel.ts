/**
 * Level of logs for iOS, Android and React Native.
 *
 * These levels will control when logs are shown.
 *
 * @see [Android Log Levels](https://source.android.com/docs/core/tests/debug/understanding-logging)
 * @see [iOS Log Levels](https://apple.github.io/swift-log/docs/current/Logging/Structs/Logger/Level.html#/s:7Logging6LoggerV5LevelO4infoyA2EmF)
 */
export enum IterableLogLevel {
  /** Show logs only for errors. */
  error = 3,
  /**
   * Show logs for messages that contain information normally of use only when debugging a program.
   * Also includes {@link IterableLogLevel.error} messages.
   */
  debug = 1,
  /**
   * Show logs which include general information about app flow — e.g., lifecycle events
   * or major state changes. This is the most verbose logging level.
   *  Also includes {@link IterableLogLevel.error} and {@link IterableLogLevel.debug} messages.
   */
  info = 2,
}
