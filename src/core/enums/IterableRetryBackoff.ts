/* eslint-disable tsdoc/syntax */

/**
 * The type of backoff to use when retrying a request.
 */
export enum IterableRetryBackoff {
  /**
   * Linear backoff (each retry will wait for a fixed interval)
   * TODO: check with @Ayyanchira if this is correct
   */
  LINEAR = 'LINEAR',
  /**
   * Exponential backoff (each retry will wait for an interval that increases exponentially)
   * TODO: check with @Ayyanchira if this is correct
   */
  EXPONENTIAL = 'EXPONENTIAL',
}
