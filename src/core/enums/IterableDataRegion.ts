/**
 * The data region on which your Iterable project is hosted.
 */
export enum IterableDataRegion {
  /** Iterable projects hosted in the US. */
  US = 0,
  /**
   * Iterable projects hosted in the EU.
   *
   * This configures the SDK to interact with Iterable's EDC-based endpoints.
   */
  EU = 1,
}
