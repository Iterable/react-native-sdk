import type { IterableAuthFailureReason } from "../enums/IterableAuthFailureReason";

/**
 * Represents an auth failure object.
 */
export interface IterableAuthFailure {
  /** userId or email of the signed-in user */
  userKey: string;

  /** the authToken which caused the failure */
  failedAuthToken: string;

  /** the timestamp of the failed request */
  failedRequestTime: number;

  /** indicates a reason for failure */
  failureReason: IterableAuthFailureReason;
} 