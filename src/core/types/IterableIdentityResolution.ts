/**
 * Controls how the SDK resolves anonymous (visitor / unknown-user) data when a
 * user is identified with `setEmail` or `setUserId`.
 *
 * Values set on `IterableConfig.identityResolution` are defaults; native
 * `setEmail` / `setUserId` can override them per call (not exposed in RN yet).
 */
export interface IterableIdentityResolution {
  /**
   * When `true`, locally stored visitor events are replayed to the known user
   * profile on identification.
   */
  replayOnVisitorToKnown?: boolean;

  /**
   * When `true`, the generated unknown-user profile is merged into the known
   * user profile on identification.
   */
  mergeOnUnknownToKnown?: boolean;
}
