import type { IterableEdgeInsetDetails } from '../types';

/**
 * Space around the html content
 */
export class IterableEdgeInsets implements IterableEdgeInsetDetails {
  top: number;
  left: number;
  bottom: number;
  right: number;

  /**
   * Creates an instance of IterableEdgeInsets.
   *
   * @param top - The top edge inset.
   * @param left - The left edge inset.
   * @param bottom - The bottom edge inset.
   * @param right - The right edge inset.
   */
  constructor(top: number, left: number, bottom: number, right: number) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  /**
   * Creates an instance of `IterableEdgeInsets` from a dictionary object.
   *
   * @param dict - An object containing the edge inset details with properties:
   *   - `top`: The top edge inset.
   *   - `left`: The left edge inset.
   *   - `bottom`: The bottom edge inset.
   *   - `right`: The right edge inset.
   * @returns A new instance of `IterableEdgeInsets` initialized with the provided edge inset values.
   */
  static fromDict(dict: IterableEdgeInsetDetails): IterableEdgeInsets {
    return new IterableEdgeInsets(dict.top, dict.left, dict.bottom, dict.right);
  }
}
