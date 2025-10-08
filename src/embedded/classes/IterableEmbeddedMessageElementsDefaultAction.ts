export interface IterableEmbeddedMessageElementsDefaultActionDict {
  /** The type. */
  type: string;
  /** The data. */
  data?: string;
}

export interface IterableEmbeddedMessageElementsDefaultAction {
  /** The type. */
  type: string;
  /** The data. */
  data?: string;
}

// export class IterableEmbeddedMessageElementsDefaultAction {
//   public type: string;
//   public data?: string;

//   constructor(
//     options: Partial<IterableEmbeddedMessageElementsDefaultActionDict> = {}
//   ) {
//     const { type = '', data = '' } = options;
//     this.type = type;
//     this.data = data;
//   }

//   toDict(): IterableEmbeddedMessageElementsDefaultActionDict {
//     return {
//       type: this.type,
//       data: this.data,
//     };
//   }

//   static fromDict(
//     jsonObject: IterableEmbeddedMessageElementsDefaultActionDict
//   ): IterableEmbeddedMessageElementsDefaultAction {
//     return new IterableEmbeddedMessageElementsDefaultAction({
//       type: jsonObject.type,
//       data: jsonObject.data,
//     });
//   }
// }
