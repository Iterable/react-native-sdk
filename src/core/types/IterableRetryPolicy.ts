import type { IterableRetryBackoff } from "../enums/IterableRetryBackoff";

/**
 * The policy for retrying an authentication attempt.
 */
export interface IterableRetryPolicy {
  /** Number of consecutive JWT refresh retries the SDK should attempt */
  maxRetry: number;
  /**
   * Duration between JWT refresh retries in seconds
   * (starting point for retry backoff)
   */
  retryInterval: number;
  /** The backoff pattern to apply between retry attempts. */
  retryBackoff: IterableRetryBackoff;
}
