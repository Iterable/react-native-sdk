/**
 * Iterable embedded placement
 * Contains placement id and the associated embedded messages
 */
export class IterableEmbeddedPlacement {
  readonly placementId: number;

  constructor(placementId: number) {
    this.placementId = placementId;
  }
}
