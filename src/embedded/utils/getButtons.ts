import type { IterableEmbeddedMessage } from '../classes/IterableEmbeddedMessage';
import type { IterableEmbeddedMessageElementsButton } from '../classes/IterableEmbeddedMessageElementsButton';
import type { IterableEmbeddedViewButtonInfo } from '../types/IterableEmbeddedViewButtonInfo';

export const getButtons = (message: IterableEmbeddedMessage) => {
  const buttons = message.elements?.buttons ?? null;
  if (!buttons || buttons.length === 0) return [];

  const mapOne = (
    b?: IterableEmbeddedMessageElementsButton | null
  ): IterableEmbeddedViewButtonInfo => {
    if (!b) return { id: null, title: null, clickedUrl: null };
    const clickedUrl =
      (b.action?.data && b.action?.data?.length > 0
        ? b.action.data
        : b.action?.type) ?? null;
    return { id: b.id ?? null, title: b.title ?? null, clickedUrl };
  };

  const first = mapOne(buttons[0] ?? null);
  const second = mapOne(buttons.length > 1 ? buttons[1] : null);

  return [first, second].filter((bi) => bi.title && bi.title.length > 0);
};
