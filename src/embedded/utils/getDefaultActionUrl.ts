import type { IterableEmbeddedMessage } from '../types/IterableEmbeddedMessage';

export const getDefaultActionUrl = (message: IterableEmbeddedMessage) => {
  const defaultAction = message.elements?.defaultAction ?? null;
  if (!defaultAction) return null;
  return defaultAction.data ?? defaultAction.type;
};
