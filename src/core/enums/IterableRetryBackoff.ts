/**
 * The type of backoff to use when retrying a request.
 */
export enum IterableRetryBackoff {
  LINEAR = 'LINEAR',
  EXPONENTIAL = 'EXPONENTIAL',
}
