import { useCallback, useEffect, useMemo, useState } from 'react';
import { Iterable } from '../../core/classes/Iterable';
import { useAppStateListener } from '../../core/hooks/useAppStateListener';
import { useComponentVisibility } from '../../core/hooks/useComponentVisibility';
import { IterableEmbeddedViewType } from '../enums';
import type { IterableEmbeddedMessageElementsButton } from '../types/IterableEmbeddedMessageElementsButton';
import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedViewProps';
import { getMedia } from '../utils/getMedia';
import { getStyles } from '../utils/getStyles';
import { getUrlFromButton } from '../utils/getUrlFromButton';

export const useEmbeddedView = (
  viewType: IterableEmbeddedViewType,
  { message, config, onButtonClick = () => {} }: IterableEmbeddedComponentProps
) => {
  const appVisibility = useAppStateListener();
  const { isVisible, componentRef, handleLayout } = useComponentVisibility({
    threshold: 0.1, // Component is considered visible if 10% is on screen
    checkOnAppState: true, // Consider app state (active/background)
    enablePeriodicCheck: true, // Enable periodic checking for navigation changes
    checkInterval: 500, // Check every 500ms for navigation changes
  });

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
    if (appVisibility !== lastState) {
      setLastState(appVisibility);
      if (appVisibility === 'active') {
        // App is active, start the session
        // TODO: figure out how to only do this once, even if there are multiple embedded views
        Iterable.embeddedManager.startSession();
      } else if (
        appVisibility === 'background' ||
        appVisibility === 'inactive'
      ) {
        // App is background or inactive, end the session
        // TODO: figure out how to only do this once, even if there are multiple embedded views
        Iterable.embeddedManager.endSession();
      }
    }
  }, [appVisibility, lastState]);

  useEffect(() => {
    console.log('Card visibility changed:', isVisible);
    if (isVisible) {
      // TODO: Start impression here
    } else {
      // TODO: Pause impression here
    }
  }, [isVisible]);

  return {
    parsedStyles,
    media,
    handleButtonClick,
    componentRef,
    handleLayout,
  };
};
