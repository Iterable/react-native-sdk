import { IterableAuthResponse } from './IterableAuthResponse';
import { IterableApi } from './IterableApi';

/**
 * Manages the authentication for the Iterable SDK.
 *
 * @example
 * ```typescript
 * const authManager = new IterableAuthManager();
 * ```
 */
export class IterableAuthManager {
  /**
   * Pause the authentication retry mechanism.
   *
   * @param pauseRetry - Whether to pause the authentication retry mechanism
   *
   * @example
   * ```typescript
   * const authManager = new IterableAuthManager();
   * authManager.pauseAuthRetries(true);
   * ```
   */
  pauseAuthRetries(pauseRetry: boolean) {
    return IterableApi.pauseAuthRetries(pauseRetry);
  }

  /**
   * Get the JWT currently held by the native SDK for the signed-in user.
   *
   * @returns The current auth token, or `null` when no token is stored
   *
   * @example
   * ```typescript
   * const token = await Iterable.authManager.getAuthToken();
   * ```
   */
  getAuthToken(): Promise<string | null> {
    return IterableApi.getAuthToken();
  }

  /**
   * Pass along an auth token to the SDK.
   *
   * @param authToken - The auth token to pass along
   *
   * @example
   * ```typescript
   * const authManager = new IterableAuthManager();
   * authManager.passAlongAuthToken(MY_AUTH_TOKEN);
   * ```
   */
  passAlongAuthToken(
    authToken: string | null | undefined
  ): Promise<IterableAuthResponse | string | undefined> {
    return IterableApi.passAlongAuthToken(authToken);
  }
}
