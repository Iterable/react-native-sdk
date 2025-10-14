import { useMemo } from 'react';

import { IterableEmbeddedViewType } from '../enums/IterableEmbeddedViewType';

import { IterableEmbeddedBanner } from './IterableEmbeddedBanner';
import { IterableEmbeddedCard } from './IterableEmbeddedCard';
import { IterableEmbeddedNotification } from './IterableEmbeddedNotification/IterableEmbeddedNotification';
import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedComponentProps';

/**
 * The props for the IterableEmbeddedView component.
 */
interface IterableEmbeddedViewProps extends IterableEmbeddedComponentProps {
  /** The type of view to render. */
  viewType: IterableEmbeddedViewType;
}

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
