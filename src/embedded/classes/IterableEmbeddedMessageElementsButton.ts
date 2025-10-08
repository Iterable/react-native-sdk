import type { IterableEmbeddedMessageElementsButtonAction } from './IterableEmbeddedMessageElementsButtonAction';

export interface IterableEmbeddedMessageElementsButtonDict {
  /** The ID. */
  id: string;
  /** The title. */
  title?: string | null;
  /** The action. */
  action?: IterableEmbeddedMessageElementsButtonAction | null;
}

export interface IterableEmbeddedMessageElementsButton {
  /** The ID. */
  id: string;
  /** The title. */
  title?: string | null;
  /** The action. */
  action?: IterableEmbeddedMessageElementsButtonAction | null;
}

// export class IterableEmbeddedMessageElementsButton {
//   public id: string;
//   public title?: string | null;
//   public action?: IterableEmbeddedMessageElementsButtonAction | null;

//   constructor(
//     options: Partial<IterableEmbeddedMessageElementsButtonDict> = {}
//   ) {
//     const { id = '', title = null, action = null } = options;
//     this.id = id;
//     this.title = title;
//     this.action = action;
//   }

//   toDict(): IterableEmbeddedMessageElementsButtonDict {
//     return {
//       id: this.id,
//       title: this.title ?? null,
//       action: this.action ?? null,
//     };
//   }

//   static fromDict(
//     jsonObject: IterableEmbeddedMessageElementsButtonDict
//   ): IterableEmbeddedMessageElementsButton {
//     if (!jsonObject?.id) {
//       throw new Error(
//         'id is required when calling IterableEmbeddedMessageElementsButton.fromDict'
//       );
//     }

//     return new IterableEmbeddedMessageElementsButton({
//       id: jsonObject.id,
//       title: jsonObject.title ?? null,
//       action: jsonObject.action
//         ? IterableEmbeddedMessageElementsButtonAction.fromDict(
//             jsonObject.action
//           )
//         : null,
//     });
//   }
// }
