import type { IterableEmbeddedMessage } from '../../types/IterableEmbeddedMessage';
import { IterableEmbeddedViewType } from '../../enums';

/**
 * This function is used to get the media to render for a given embedded view
 * type and message.
 *
 * @param viewType - The type of view to render.
 * @param message - The message to render.
 * @returns The media to render.
 *
 * @example
 * const media = getMedia(IterableEmbeddedViewType.Notification, message);
 * console.log(media.url);
 * console.log(media.caption);
 * console.log(media.shouldShow ? 'true' : 'false');
 */
export const getMedia = (
  /** The type of view to render. */
  viewType: IterableEmbeddedViewType,
  /** The message to render. */
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
