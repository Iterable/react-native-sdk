export interface IterableEmbeddedUpdateHandler {
  onMessagesUpdated: () => void;
  onEmbeddedMessagingDisabled: () => void;
}
