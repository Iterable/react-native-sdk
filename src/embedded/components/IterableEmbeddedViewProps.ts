import type { IterableEmbeddedMessage } from '../classes/IterableEmbeddedMessage';
import type { IterableEmbeddedViewConfig } from '../classes/IterableEmbeddedViewConfig';

export interface IterableEmbeddedComponentProps {
  message: IterableEmbeddedMessage;
  config?: IterableEmbeddedViewConfig | null;
}
