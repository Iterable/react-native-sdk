import type { IterableEmbeddedMessageElementsButton } from './IterableEmbeddedMessageElementsButton';
import type { IterableEmbeddedMessageElementsDefaultAction } from './IterableEmbeddedMessageElementsDefaultAction';
import type { IterableEmbeddedMessageElementsText } from './IterableEmbeddedMessageElementsText';

export interface IterableEmbeddedMessageElementsDict {
  title?: string | null;
  body?: string | null;
  mediaUrl?: string | null;
  mediaUrlCaption?: string | null;
  defaultAction?: IterableEmbeddedMessageElementsDefaultAction | null;
  buttons?: IterableEmbeddedMessageElementsButton[] | null;
  text?: IterableEmbeddedMessageElementsText[] | null;
}

export interface IterableEmbeddedMessageElements {
  title?: string | null;
  body?: string | null;
  mediaUrl?: string | null;
  mediaUrlCaption?: string | null;
  defaultAction?: IterableEmbeddedMessageElementsDefaultAction | null;
  buttons?: IterableEmbeddedMessageElementsButton[] | null;
  text?: IterableEmbeddedMessageElementsText[] | null;
}

// export class IterableEmbeddedMessageElements {
//   public title?: IterableEmbeddedMessageElementsDict['title'] = null;
//   public body?: IterableEmbeddedMessageElementsDict['body'] = null;
//   public mediaURL?: IterableEmbeddedMessageElementsDict['mediaURL'] = null;
//   public mediaUrlCaption?: IterableEmbeddedMessageElementsDict['mediaUrlCaption'] =
//     null;
//   public defaultAction?: IterableEmbeddedMessageElementsDict['defaultAction'] =
//     null;
//   public buttons?: IterableEmbeddedMessageElementsDict['buttons'] = null;
//   public text?: IterableEmbeddedMessageElementsDict['text'] = null;

//   constructor(options: Partial<IterableEmbeddedMessageElementsDict> = {}) {
//     const {
//       title = null,
//       body = null,
//       mediaURL = null,
//       mediaUrlCaption = null,
//       defaultAction = null,
//       buttons = null,
//       text = null,
//     } = options;

//     this.title = title;
//     this.body = body;
//     this.mediaURL = mediaURL;
//     this.mediaUrlCaption = mediaUrlCaption;
//     this.defaultAction = defaultAction;
//     this.buttons = buttons;
//     this.text = text;
//   }

//   toDict(): IterableEmbeddedMessageElementsDict {
//     return {
//       title: this.title,
//       body: this.body,
//       mediaURL: this.mediaURL,
//       mediaUrlCaption: this.mediaUrlCaption,
//       defaultAction: this.defaultAction,
//       buttons: this.buttons,
//       text: this.text,
//     };
//   }

//   static fromDict(
//     jsonObject?: IterableEmbeddedMessageElementsDict | null
//   ): IterableEmbeddedMessageElements | null {
//     if (!jsonObject) return null;

//     return new IterableEmbeddedMessageElements({
//       title: jsonObject.title ?? null,
//       body: jsonObject.body ?? null,
//       mediaURL: jsonObject.mediaURL ?? null,
//       mediaUrlCaption: jsonObject.mediaUrlCaption ?? null,
//       defaultAction: jsonObject.defaultAction ?? null,
//       buttons: jsonObject.buttons ?? null,
//       text: jsonObject.text ?? null,
//     });
//   }
// }
