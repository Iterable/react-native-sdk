interface IterableGenerateJwtTokenArgsBase {
  /* The secret key for generating the JWT token. */
  secret: string;
  /* The duration of the JWT token in milliseconds. */
  duration: number;
}

/**
 * Arguments for generating a JWT token
 * Must specify either email OR userId, but not both
 */
export type IterableGenerateJwtTokenArgs =
  | (IterableGenerateJwtTokenArgsBase & {
      /**
       * The **email** which was used in **`Iterable.initialize`**.
       *
       * NOTE: Either `userId` or `email` must be provided.
       */
      email: string;
    })
  | (IterableGenerateJwtTokenArgsBase & {
      /**
       * The **Iterable user ID** which was used in **`Iterable.initialize`**.
       *
       * NOTE: Either `userId` or `email` must be provided.
       */
      userId: string;
    });
