import type { IterableEmbeddedMessageElementsButtonAction } from './IterableEmbeddedMessageElementsButtonAction';

export interface IterableEmbeddedMessageElementsButton {
  /** The ID. */
  id: string;
  /** The title. */
  title?: string | null;
  /** The action. */
  action?: IterableEmbeddedMessageElementsButtonAction | null;
}
