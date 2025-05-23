/**
 * Iterable embedded placement
 * Contains placement id and the associated embedded messages
 */
export class IterableEmbeddedPlacement {
  readonly placementId: string;

  constructor(placementId: string) {
    this.placementId = placementId;
  }
}
