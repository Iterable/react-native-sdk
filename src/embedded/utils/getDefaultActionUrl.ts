import type { IterableEmbeddedMessage } from '../classes/IterableEmbeddedMessage';

export const getDefaultActionUrl = (message: IterableEmbeddedMessage) => {
  const defaultAction = message.elements?.defaultAction ?? null;
  if (!defaultAction) return null;
  return defaultAction.data ?? defaultAction.type;
};
