import type { IterableEmbeddedMessage } from '../classes/IterableEmbeddedMessage';
import type { IterableEmbeddedMessageElementsButton } from '../classes/IterableEmbeddedMessageElementsButton';
import type { IterableEmbeddedViewConfig } from '../classes/IterableEmbeddedViewConfig';

export interface IterableEmbeddedComponentProps {
  message: IterableEmbeddedMessage;
  config?: IterableEmbeddedViewConfig | null;
  onButtonClick?: (button: IterableEmbeddedMessageElementsButton) => void;
}
