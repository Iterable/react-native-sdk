export class IterableEmbeddedMessageDefaultAction {
  readonly type: string;
  readonly data?: string;

  constructor(type: string, data?: string) {
    this.type = type;
    this.data = data;
  }

  static fromDict(
    dict: Partial<EmbeddedMessageDefaultActionDict>
  ): IterableEmbeddedMessageDefaultAction {
    if (!dict.type) {
      throw new Error('type is required');
    }
    return new IterableEmbeddedMessageDefaultAction(dict.type, dict.data);
  }
}

export interface EmbeddedMessageDefaultActionDict {
  type: string;
  data?: string;
}
