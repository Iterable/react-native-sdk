import type { IterableAuthFailure } from '../types/IterableAuthFailure';

// REVIEW: This seems to currently be used as a type instead of a class, so it
// might be better to make it a type
/**
 * The result of an authentication request to Iterable.
 */
export class IterableAuthResponse {
  /** JWT Token */
  authToken?: string = '';
  /** Callback when the authentication to Iterable succeeds */
  successCallback?: () => void;
  /** Callback when the authentication to Iterable fails */
  failureCallback?: (authFailure: IterableAuthFailure) => void;
}
