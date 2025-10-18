// REVIEW: This seems to currently be used as a type instead of a class, so it
// might be better to make it a type
/**
 * The result of an authentication request to Iterable.
 */
export class IterableAuthResponse {
  /** JWT Token */
  authToken?: string | null = '';
  /**
   * Callback when the authentication to Iterable succeeds.
   * This function is called when the authentication request completes successfully.
   */
  successCallback?: () => void;
  /**
   * Callback when the authentication to Iterable fails.
   * This function is called when the authentication request fails.
   */
  failureCallback?: () => void;
}
