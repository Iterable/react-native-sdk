import type { IterableEdgeInsetDetails } from '../types';

// TODO: Add description
export class IterableEdgeInsets {
  top: number;
  left: number;
  bottom: number;
  right: number;

  constructor(top: number, left: number, bottom: number, right: number) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  static fromDict(dict: IterableEdgeInsetDetails): IterableEdgeInsets {
    return new IterableEdgeInsets(dict.top, dict.left, dict.bottom, dict.right);
  }
}

export default IterableEdgeInsets;
