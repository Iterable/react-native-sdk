import type { IterableEmbeddedMessage } from './IterableEmbeddedMessage';
import type { IterableEmbeddedMessageElementsButton } from './IterableEmbeddedMessageElementsButton';
import type { IterableEmbeddedViewConfig } from './IterableEmbeddedViewConfig';

export interface IterableEmbeddedComponentProps {
  /** The message to render. */
  message: IterableEmbeddedMessage;
  /** The config for the embedded view. */
  config?: IterableEmbeddedViewConfig | null;
  /** The function to call when a button is clicked. */
  onButtonClick?: (
    button: IterableEmbeddedMessageElementsButton,
    message: IterableEmbeddedMessage
  ) => void;
  /** The function to call when the message is clicked. */
  onMessageClick?: (message: IterableEmbeddedMessage) => void;
}
