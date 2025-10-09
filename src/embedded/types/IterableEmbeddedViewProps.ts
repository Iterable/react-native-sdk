import type { IterableEmbeddedMessage } from './IterableEmbeddedMessage';
import type { IterableEmbeddedMessageElementsButton } from './IterableEmbeddedMessageElementsButton';
import type { IterableEmbeddedViewConfig } from './IterableEmbeddedViewConfig';

export interface IterableEmbeddedComponentProps {
  message: IterableEmbeddedMessage;
  config?: IterableEmbeddedViewConfig | null;
  onButtonClick?: (button: IterableEmbeddedMessageElementsButton) => void;
}
