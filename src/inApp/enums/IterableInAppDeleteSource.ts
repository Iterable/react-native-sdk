/**
 * Ways in which an in-app message might have been deleted.
 */
export enum IterableInAppDeleteSource {
  /** Deleted by swiping in the inbox. */
  inboxSwipe = 0,
  /** Deleted by clicking the delete button. */
  deleteButton = 1,
  /** Deleted in an unknown way. */
  unknown = 100,
}
