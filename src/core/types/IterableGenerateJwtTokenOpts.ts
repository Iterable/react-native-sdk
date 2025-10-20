/**
 * Options for generating a JWT token.
 */
export interface IterableGenerateJwtTokenOpts {
  /**
   * The JWT secret.
   *
   * This was generated when you created the **JWT enabled API key**.
   *
   * To create a JWT enabled API key:
   * 1. Go to Iterable's [**API key page**](https://app.iterable.com/settings/apiKeys)
   * 2. Click **+ New API key** in the top right corner
   * 3. Fill in the following fields:
   *    - **Name**: A descriptive name for the API key
   *    - **Type**: _Mobile_ (IMPORTANT: This must set to _Mobile_ for the RN SDK)
   *    - **JWT authentication**: Check to enable JWT authentication.
   * 4. Click **Create API Key**
   * 5. The generated **API key** will be used in `Iterable.initialize`, and the
   *    **JWT secret** will be used in `IterableApi.generateJwtToken`.
   */
  secret: string;
  /** The duration of the JWT token in milliseconds. */
  duration: number;
  /**
   * The **Iterable user ID** which was used in **`Iterable.initialize`**.
   *
   * NOTE: Either `userId` or `email` must be provided.
   */
  userId: string | null;
  /**
   * The **email** which was used in **`Iterable.initialize`**.
   *
   * NOTE: Either `userId` or `email` must be provided.
   */
  email: string | null;
}
