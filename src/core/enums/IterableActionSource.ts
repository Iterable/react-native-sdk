/**
 * Enum representing the source of IterableAction.
 */
export enum IterableActionSource {
  /** The action source was a push message */
  push = 0,
  /** The action source was a link in the app */
  appLink = 1,
  /** The action source was an in-app message */
  inApp = 2,
  /** The action source was an embedded message */
  embedded = 3,
}
