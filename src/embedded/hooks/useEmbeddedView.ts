import { useCallback, useEffect, useMemo, useState } from 'react';
import { Iterable } from '../../core/classes/Iterable';
import type { IterableEmbeddedMessageElementsButton } from '../types/IterableEmbeddedMessageElementsButton';
import { IterableEmbeddedViewType } from '../enums';
import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedViewProps';
import { getMedia } from '../utils/getMedia';
import { getStyles } from '../utils/getStyles';
import { getUrlFromButton } from '../utils/getUrlFromButton';
import { useAppStateListener } from '../../core/hooks/useAppStateListener';

export const useEmbeddedView = (
  viewType: IterableEmbeddedViewType,
  { message, config, onButtonClick = () => {} }: IterableEmbeddedComponentProps
) => {
  const appVisibility = useAppStateListener();
  const parsedStyles = useMemo(() => {
    return getStyles(viewType, config);
  }, [viewType, config]);
  const media = useMemo(() => {
    return getMedia(viewType, message);
  }, [viewType, message]);

  const [lastState, setLastState] = useState('initial');

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

  useEffect(() => {
    console.group('useEmbeddedView');
    console.log('appVisibility changed');
    console.log('appVisibility', appVisibility);
    console.log('lastState', lastState);
    if (appVisibility !== lastState) {
      console.log('setting lastState');
      setLastState(appVisibility);
      if (appVisibility === 'active') {
        console.log('appVisibility is active');
        Iterable.embeddedManager.startSession();
      } else if (
        appVisibility === 'background' ||
        appVisibility === 'inactive'
      ) {
        console.log('appVisibility is background or inactive');
        Iterable.embeddedManager.endSession();
      }
    }
    console.groupEnd();
  }, [appVisibility, lastState]);

  return {
    parsedStyles,
    media,
    handleButtonClick,
  };
};
