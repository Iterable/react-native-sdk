import { IterableRetryBackoffType } from '../enums/IterableRetryBackoffType';

/**
 * Configuration class for JWT refresh retry behavior.
 * Maps to the native RetryPolicy class in Android/iOS SDKs.
 */
export interface IterableRetryPolicy {
  /** Number of consecutive JWT refresh retries the SDK should attempt */
  maxRetry: number;
  /**
   * Duration between JWT refresh retries in seconds 
   * (starting point for retry backoff)
   */
  retryInterval: number;
  /** The backoff pattern to apply between retry attempts */
  retryBackoff: IterableRetryBackoffType;
}