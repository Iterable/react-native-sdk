import type { IterableEmbeddedMessage } from '../../classes/IterableEmbeddedMessage';
import { IterableEmbeddedViewType } from '../../enums/IterableEmbeddedViewType';

export const getMedia = (
  viewType: IterableEmbeddedViewType,
  message: IterableEmbeddedMessage
) => {
  const url = message.elements?.mediaUrl ?? null;
  const caption = message.elements?.mediaUrlCaption ?? null;
  const shouldShow =
    !!url &&
    url.length > 0 &&
    viewType !== IterableEmbeddedViewType.Notification;
  return { url, caption, shouldShow };
};
