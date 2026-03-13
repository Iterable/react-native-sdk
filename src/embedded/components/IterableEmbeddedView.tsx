import { useMemo } from 'react';

import { IterableEmbeddedViewType } from '../enums/IterableEmbeddedViewType';
import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedComponentProps';
import { IterableEmbeddedBanner } from './IterableEmbeddedBanner';
import { IterableEmbeddedCard } from './IterableEmbeddedCard';
import { IterableEmbeddedNotification } from './IterableEmbeddedNotification';

/**
 * The props for the IterableEmbeddedView component.
 */
interface IterableEmbeddedViewProps extends IterableEmbeddedComponentProps {
  /** The type of view to render. */
  viewType: IterableEmbeddedViewType;
}

/**
 *
 * @param viewType - The type of view to render.
 * @param message - The message to render.
 * @param config - The config for the IterableEmbeddedView component, most likely used to style the view.
 * @param onButtonClick - The function to call when a button is clicked.
 * @returns The IterableEmbeddedView component.
 *
 * This component is used to render pre-created, customizable message displays
 * included with Iterables RN SDK: cards, banners, and notifications.
 */
export const IterableEmbeddedView = ({
  viewType,
  ...props
}: IterableEmbeddedViewProps) => {
  const Cmp = useMemo(() => {
    switch (viewType) {
      case IterableEmbeddedViewType.Card:
        return IterableEmbeddedCard;
      case IterableEmbeddedViewType.Notification:
        return IterableEmbeddedNotification;
      case IterableEmbeddedViewType.Banner:
        return IterableEmbeddedBanner;
      default:
        return null;
    }
  }, [viewType]);

  return Cmp ? <Cmp {...props} /> : null;
};
