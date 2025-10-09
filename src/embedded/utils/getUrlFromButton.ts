import type { IterableEmbeddedMessageElementsButton } from '../classes/IterableEmbeddedMessageElementsButton';

export const getUrlFromButton = (
  button: IterableEmbeddedMessageElementsButton
) => {
  const { data, type: actionType } = button.action ?? {};
  return data && data?.length > 0 ? data : actionType;
};
