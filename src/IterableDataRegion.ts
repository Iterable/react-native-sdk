/**
 * The data region where Iterable data is stored.
 *
 * If your Iterable project is hosted on Iterable's European data center (EDC),
 * set this value to `IterableDataRegion.EU`.  This configures the SDK to
 * interact with Iterable's EDC-based endpoints.
 */
export enum IterableDataRegion {
  /** Iterable project is hosted in the USA */
  US = 0,
  /** Iterable project is hosted in the [EU](https://support.iterable.com/hc/articles/17572750887444) */
  EU = 1,
}

export default IterableDataRegion;
