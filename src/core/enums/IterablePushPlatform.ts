/**
 * The push platform to use for push notifications.
 */
export enum IterablePushPlatform {
  /** Use sandbox. */
  sandbox = 0,
  /** Use production. */
  production = 1,
  /** Automatically determine the push platform to use. */
  auto = 2,
}
