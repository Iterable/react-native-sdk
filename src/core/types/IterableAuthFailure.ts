import type { IterableAuthFailureReason } from "../enums/IterableAuthFailureReason";

/**
 * The details of an auth failure.
 */
export interface IterableAuthFailure {
  /** `userId` or `email` of the signed-in user */
  userKey: string;

  /** The `authToken` which caused the failure */
  failedAuthToken: string;

  /** The timestamp of the failed request */
  failedRequestTime: number;

  /** Indicates a reason for failure */
  failureReason: IterableAuthFailureReason;
}
