import { useCallback, useMemo } from 'react';
import { Iterable } from '../../core/classes/Iterable';
import type { IterableEmbeddedMessageElementsButton } from '../classes/IterableEmbeddedMessageElementsButton';
import { IterableEmbeddedViewType } from '../enums';
import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedViewProps';
import { getMedia } from '../utils/getMedia';
import { getStyles } from '../utils/getStyles';
import { getUrlFromButton } from '../utils/getUrlFromButton';

export const useEmbeddedView = (
  viewType: IterableEmbeddedViewType,
  { message, config, onButtonClick = () => {} }: IterableEmbeddedComponentProps
) => {
  const parsedStyles = useMemo(() => {
    return getStyles(viewType, config);
  }, [viewType, config]);

  const media = useMemo(() => {
    return getMedia(viewType, message);
  }, [viewType, message]);

  const handleButtonClick = useCallback(
    (button: IterableEmbeddedMessageElementsButton) => {
      onButtonClick(button);
      Iterable.embeddedManager.handleClick(
        message,
        button.id,
        getUrlFromButton(button) ?? null
      );
    },
    [onButtonClick, message]
  );

  return {
    parsedStyles,
    media,
    handleButtonClick,
  };
};
