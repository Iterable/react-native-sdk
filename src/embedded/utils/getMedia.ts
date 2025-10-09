import type { IterableEmbeddedMessage } from '../types/IterableEmbeddedMessage';
import { IterableEmbeddedViewType } from '../enums';

export const getMedia = (
  viewType: IterableEmbeddedViewType,
  message: IterableEmbeddedMessage
) => {
  if (viewType === IterableEmbeddedViewType.Notification) {
    return { url: null, caption: null, shouldShow: false };
  }
  const url = message.elements?.mediaUrl ?? null;
  const caption = message.elements?.mediaUrlCaption ?? null;
  const shouldShow = !!url && url.length > 0;
  return { url, caption, shouldShow };
};
