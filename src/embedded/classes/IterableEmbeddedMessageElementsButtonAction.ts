export interface IterableEmbeddedMessageElementsButtonActionDict {
  /** The type. */
  type: string;
  /** The data. */
  data?: string;
}

export class IterableEmbeddedMessageElementsButtonAction {
  public type: string;
  public data?: string;

  constructor(
    options: Partial<IterableEmbeddedMessageElementsButtonActionDict> = {}
  ) {
    const { type = '', data = '' } = options;
    this.type = type;
    this.data = data;
  }

  toDict(): IterableEmbeddedMessageElementsButtonActionDict {
    return {
      type: this.type,
      data: this.data,
    };
  }

  static fromDict(
    jsonObject: IterableEmbeddedMessageElementsButtonActionDict
  ): IterableEmbeddedMessageElementsButtonAction {
    return new IterableEmbeddedMessageElementsButtonAction({
      type: jsonObject.type,
      data: jsonObject.data,
    });
  }
}
