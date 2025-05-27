export class IterableEmbeddedMessageElementsButtonAction {
  readonly type: string;
  readonly data?: string;

  constructor(type: string, data?: string) {
    this.type = type;
    this.data = data;
  }

  static fromDict(
    dict: Partial<EmbeddedMessageButtonActionDict>
  ): IterableEmbeddedMessageElementsButtonAction {
    if (!dict.type) {
      throw new Error('type is required');
    }
    return new IterableEmbeddedMessageElementsButtonAction(
      dict.type,
      dict.data
    );
  }
}

interface EmbeddedMessageButtonActionDict {
  type: string;
  data?: string;
}
