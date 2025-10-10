/**
 * The reason for the failure of an authentication attempt.
 *
 * This is generally related to JWT token validation.
 */
export enum IterableAuthFailureReason {
  /**
   * An auth token's expiration must be less than one year from its issued-at
   * time.
   */
  AUTH_TOKEN_EXPIRATION_INVALID,
  /** The token has expired. */
  AUTH_TOKEN_EXPIRED,
  /** Token has an invalid format (failed a regular expression check). */
  AUTH_TOKEN_FORMAT_INVALID,
  /** `onAuthTokenRequested` threw an exception. */
  AUTH_TOKEN_GENERATION_ERROR,
  /** Any other error not captured by another constant. */
  AUTH_TOKEN_GENERIC_ERROR,
  /** Iterable has invalidated this token and it cannot be used. */
  AUTH_TOKEN_INVALIDATED,
  /** The request to Iterable's API did not include a JWT authorization header. */
  AUTH_TOKEN_MISSING,
  /** `onAuthTokenRequested` returned a null JWT token. */
  AUTH_TOKEN_NULL,
  /**
   * Iterable could not decode the token's payload (`iat`, `exp`, `email`,
   * or `userId`).
   */
  AUTH_TOKEN_PAYLOAD_INVALID,
  /** Iterable could not validate the token's authenticity. */
  AUTH_TOKEN_SIGNATURE_INVALID,
  /**
   * The token doesn't include an `email` or a `userId`. Or, one of these
   * values is included, but it references a user that isn't in the Iterable
   * project.
   */
  AUTH_TOKEN_USER_KEY_INVALID,
}
