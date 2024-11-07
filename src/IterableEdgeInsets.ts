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

  static fromDict(dict: any): IterableEdgeInsets {
    return new IterableEdgeInsets(
      dict.top as number,
      dict.left as number,
      dict.bottom as number,
      dict.right as number
    );
  }
}

export default IterableEdgeInsets;
