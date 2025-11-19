/**
 * The type of backoff to use when retrying a request.
 */
export enum IterableRetryBackoff {
  /**
   * Linear backoff (each retry will wait for a fixed interval)
   *
   * EG: 2 seconds, 4 seconds, 6 seconds, 8 seconds, etc.
   */
  linear = 'LINEAR',
  /**
   * Exponential backoff (each retry will wait for an interval that increases exponentially)
   *
   * EG: 2 seconds, 4 seconds, 8 seconds, 16 seconds, etc.
   */
  exponential = 'EXPONENTIAL',
}
