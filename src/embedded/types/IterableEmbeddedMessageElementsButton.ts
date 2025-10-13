import type { IterableAction } from '../../core/classes/IterableAction';

export interface IterableEmbeddedMessageElementsButton {
  /** The ID. */
  id: string;
  /** The title. */
  title?: string | null;
  /** The action. */
  action?: IterableAction | null;
}
