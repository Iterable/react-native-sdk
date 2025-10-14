import RNIterableAPI from '../../api';
import { IterableAuthResponse } from './IterableAuthResponse';

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
    return RNIterableAPI.pauseAuthRetries(pauseRetry);
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
    return RNIterableAPI.passAlongAuthToken(authToken);
  }
}
