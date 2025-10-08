export interface IterableEmbeddedMessageElementsTextDict {
  /** The ID. */
  id: string;
  /** The text. */
  text?: string | null;
  /** The label. */
  label?: string | null;
}

export interface IterableEmbeddedMessageElementsText {
  /** The ID. */
  id: string;
  /** The text. */
  text?: string | null;
  /** The label. */
  label?: string | null;
}

// export class IterableEmbeddedMessageElementsText {
//   public id: string;
//   public text?: string | null;
//   public label?: string | null;

//   constructor(options: Partial<IterableEmbeddedMessageElementsTextDict> = {}) {
//     const { id = '', text = null, label = null } = options;
//     this.id = id;
//     this.text = text;
//     this.label = label;
//   }

//   toDict(): IterableEmbeddedMessageElementsTextDict {
//     return {
//       id: this.id,
//       text: this.text,
//       label: this.label,
//     };
//   }

//   static fromDict(
//     jsonObject: IterableEmbeddedMessageElementsTextDict
//   ): IterableEmbeddedMessageElementsText {
//     return new IterableEmbeddedMessageElementsText({
//       id: jsonObject.id,
//       text: jsonObject.text,
//       label: jsonObject.label,
//     });
//   }
// }
