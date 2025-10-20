import { IterableAuthResponse } from './IterableAuthResponse';
import { IterableApi } from './IterableApi';

/**
 * Manages the authentication for the Iterable SDK.
 *
 * @since Introduced in
 * [2.2.0](https://www.npmjs.com/package/@iterable/react-native-sdk/v/2.2.0)
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
   * @since Introduced in
   * [2.2.0](https://www.npmjs.com/package/@iterable/react-native-sdk/v/2.2.0)
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
   * @since Introduced in
   * [2.2.0](https://www.npmjs.com/package/@iterable/react-native-sdk/v/2.2.0)
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

  /**
   * Generate a JWT token for the current user.
   *
   * This only needs to be used if JWT was enabled when [creating your API key](https://app.iterable.com/settings/apiKeys).
   *
   * To create a JWT enabled API key:
   * 1. Go to Iterable's [**API key page**](https://app.iterable.com/settings/apiKeys)
   * 2. Click **+ New API key** in the top right corner
   * 3. Fill in the following fields:
   *    - **Name**: A descriptive name for the API key
   *    - **Type**: _Mobile_ (<span style="color: red;">IMPORTANT:</span> This must be _Mobile_ for the RN SDK)
   *    - **JWT authentication**: Check to enable JWT authentication.
   * 4. Click **Create API Key**
   * 5. The generated **API key** will be used in `Iterable.initialize`, and the
   *    **JWT secret** will be used in `IterableApi.generateJwtToken`.
   *
   * @since Introduced in
   * [2.2.0](https://www.npmjs.com/package/@iterable/react-native-sdk/v/2.2.0)
   *
   *  @param opts - Options for generating the JWT token.
   *
   *  @example
   * ```typescript
   * const jwtToken = await IterableApi.generateJwtToken({
   *   secret: 'your-jwt-secret',
   *   duration: 1000 * 60 * 60 * 24, // 1 day
   *   userId: 'your-iterable-user-id',
   *   email: 'me@gmail.com',
   * });
   * ```
   */
  generateJwtToken(opts: {
    /** The JWT secret generated when you created the **JWT enabled [API key](https://app.iterable.com/settings/apiKeys)** */
    secret: string;
    /** The duration of the JWT token in milliseconds. */
    duration: number;
    /**
     * The **Iterable user ID** which was used in **`Iterable.initialize`**.
     *
     * NOTE: Either `userId` or `email` must be provided.
     */
    userId: string;
    /**
     * The **email** which was used in **`Iterable.initialize`**.
     *
     * NOTE: Either `userId` or `email` must be provided.
     */
    email: string;
  }): Promise<string> {
    return IterableApi.generateJwtToken(opts);
  }
}
