import { useCallback, useMemo } from 'react';
import { Iterable } from '../../../core/classes/Iterable';
import { IterableEmbeddedViewType } from '../../enums';
import type { IterableEmbeddedComponentProps } from '../../types/IterableEmbeddedComponentProps';
import type { IterableEmbeddedMessageElementsButton } from '../../types/IterableEmbeddedMessageElementsButton';
import { getMedia } from './getMedia';
import { getStyles } from './getStyles';

const noop = () => {};

/**
 * This hook is used to manage the lifecycle of an embedded view.
 *
 * @param viewType - The type of view to render.
 * @param props - The props for the embedded view.
 * @returns The embedded view.
 *
 * @example
 * ```tsx
 * const { handleButtonClick, handleMessageClick, media, parsedStyles } = useEmbeddedView(IterableEmbeddedViewType.Notification, {
 *   message,
 *   config,
 *   onButtonClick,
 *   onMessageClick,
 * });
 *
 * return (
 *   <View>
 *     <Text>{media.url}</Text>
 *     <Text>{media.caption}</Text>
 *     <Text>{parsedStyles.backgroundColor}</Text>
 *   </View>
 * );
 * ```
 */
export const useEmbeddedView = (
  /** The type of view to render. */
  viewType: IterableEmbeddedViewType,
  /** The props for the embedded view. */
  {
    message,
    config,
    onButtonClick = noop,
    onMessageClick = noop,
  }: IterableEmbeddedComponentProps
) => {
  const parsedStyles = useMemo(() => {
    return getStyles(viewType, config);
  }, [viewType, config]);
  const media = useMemo(() => {
    return getMedia(viewType, message);
  }, [viewType, message]);

  const handleButtonClick = useCallback(
    (button: IterableEmbeddedMessageElementsButton) => {
      onButtonClick(button, message);
      Iterable.embeddedManager.handleClick(message, button.id, button.action);
    },
    [onButtonClick, message]
  );

  const handleMessageClick = useCallback(() => {
    onMessageClick();
    Iterable.embeddedManager.handleClick(
      message,
      null,
      message.elements?.defaultAction
    );
  }, [message, onMessageClick]);

  return {
    handleButtonClick,
    handleMessageClick,
    media,
    parsedStyles,
  };
};
