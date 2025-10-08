import type { IterableEmbeddedMessageElementsDict } from './IterableEmbeddedMessageElements';
import type { IterableEmbeddedMessageMetadataDict } from './IterableEmbeddedMessageMetadata';

export interface IterableEmbeddedMessageDict {
  metadata: IterableEmbeddedMessageMetadataDict;
  elements?: IterableEmbeddedMessageElementsDict | null;
  payload?: Record<string, unknown> | null;
}

export interface IterableEmbeddedMessage {
  metadata: IterableEmbeddedMessageMetadataDict;
  elements?: IterableEmbeddedMessageElementsDict | null;
  payload?: Record<string, unknown> | null;
}

// export class IterableEmbeddedMessage {
//   public metadata: IterableEmbeddedMessageMetadata;
//   public elements?: IterableEmbeddedMessageElements | null = null;
//   public payload?: Record<string, unknown> | null = null;

//   constructor(
//     metadata: IterableEmbeddedMessageMetadata,
//     options: {
//       elements?: IterableEmbeddedMessageElements | null;
//       payload?: Record<string, unknown> | null;
//     } = {}
//   ) {
//     const { elements = null, payload = null } = options;
//     this.metadata = metadata;
//     this.elements = elements;
//     this.payload = payload;
//   }

//   toDict(): IterableEmbeddedMessageDict {
//     return {
//       metadata: this.metadata.toDict(),
//       elements: this.elements ? this.elements.toDict() : null,
//       payload: this.payload ?? null,
//     };
//   }

//   static fromDict(
//     jsonObject: IterableEmbeddedMessageDict
//   ): IterableEmbeddedMessage {
//     const metadata = IterableEmbeddedMessageMetadata.fromDict(
//       jsonObject.metadata
//     );
//     const elements = IterableEmbeddedMessageElements.fromDict(
//       jsonObject.elements ?? null
//     );
//     const payload = jsonObject.payload ?? null;

//     return new IterableEmbeddedMessage(metadata, { elements, payload });
//   }
// }
