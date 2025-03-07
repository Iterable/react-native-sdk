/**
 * Enum representing the type of backoff pattern to apply between retry attempts.
 */
export enum IterableRetryBackoffType {
  LINEAR = 'LINEAR',
  EXPONENTIAL = 'EXPONENTIAL',
} 