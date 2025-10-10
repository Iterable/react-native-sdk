import { IterableApi } from './IterableApi';

/**
 * Manages the authentication for the Iterable SDK.
 *
 * @example
 * ```typescript
 * const config = new IterableConfig();
 * const logger = new IterableLogger(config);
 * const authManager = new IterableAuthManager(logger);
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
   * Pass along an auth token to the SDK.
   *
   * @param authToken - The auth token to pass along
   */
  passAlongAuthToken(authToken: string | null | undefined) {
    return IterableApi.passAlongAuthToken(authToken);
  }
}
