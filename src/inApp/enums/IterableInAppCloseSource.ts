/**
 * The ways in which an in-app message might have been closed.
 */
export enum IterableInAppCloseSource {
  /** Closed by clicking the back button. */
  back = 0,
  /** Closed by clicking a link. */
  link = 1,
  /** Closed in an unknown way. */
  unknown = 100,
}
