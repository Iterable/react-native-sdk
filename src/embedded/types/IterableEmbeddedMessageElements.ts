import type { IterableEmbeddedMessageElementsButton } from './IterableEmbeddedMessageElementsButton';
import type { IterableEmbeddedMessageElementsDefaultAction } from './IterableEmbeddedMessageElementsDefaultAction';
import type { IterableEmbeddedMessageElementsText } from './IterableEmbeddedMessageElementsText';

export interface IterableEmbeddedMessageElements {
  title?: string | null;
  body?: string | null;
  mediaUrl?: string | null;
  mediaUrlCaption?: string | null;
  defaultAction?: IterableEmbeddedMessageElementsDefaultAction | null;
  buttons?: IterableEmbeddedMessageElementsButton[] | null;
  text?: IterableEmbeddedMessageElementsText[] | null;
}
