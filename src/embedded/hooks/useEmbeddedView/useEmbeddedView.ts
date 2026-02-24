import { useMemo } from 'react';

import { IterableEmbeddedViewType } from '../../enums';
import type { IterableEmbeddedComponentProps } from '../../types/IterableEmbeddedComponentProps';
import { getMedia } from './getMedia';
import { getStyles } from './getStyles';

/**
 * This hook is used to manage the lifecycle of an embedded view.
 *
 * @param viewType - The type of view to render.
 * @param props - The props for the embedded view.
 * @returns The embedded view.
 *
 * @example
 * const \{ media, parsedStyles \} = useEmbeddedView(IterableEmbeddedViewType.Notification, \{
 *   message,
 *   config,
 *   onButtonClick,
 *   onMessageClick,
 * \});
 *
 * return (
 *   <View>
 *     <Text>\{media.url\}</Text>
 *     <Text>\{media.caption\}</Text>
 *     <Text>\{parsedStyles.backgroundColor\}</Text>
 *   </View>
 * );
 */
export const useEmbeddedView = (
  /** The type of view to render. */
  viewType: IterableEmbeddedViewType,
  /** The props for the embedded view. */
  {
    config,
    message,
  }: IterableEmbeddedComponentProps
) => {
  const parsedStyles = useMemo(() => {
    return getStyles(viewType, config);
  }, [viewType, config]);
  const media = useMemo(() => {
    return getMedia(viewType, message);
  }, [viewType, message]);

  return {
    parsedStyles,
    media,
  };
};
