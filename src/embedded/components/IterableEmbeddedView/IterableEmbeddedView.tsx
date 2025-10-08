import { useMemo } from 'react';

import { IterableEmbeddedViewType } from '../../enums';

import { IterableEmbeddedBanner } from '../IterableEmbeddedBanner';
import { IterableEmbeddedCard } from '../IterableEmbeddedCard';
import { IterableEmbeddedNotification } from '../IterableEmbeddedNotification';
import type { IterableEmbeddedComponentProps } from '../IterableEmbeddedViewProps';

interface IterableEmbeddedViewProps extends IterableEmbeddedComponentProps {
  viewType: IterableEmbeddedViewType;
}

export const IterableEmbeddedView = ({
  viewType,
  message,
  config,
}: IterableEmbeddedViewProps) => {
  console.log(`🚀 > IterableEmbeddedView > config:`, config);
  console.log(`🚀 > IterableEmbeddedView > message:`, message);
  console.log(`🚀 > IterableEmbeddedView > viewType:`, viewType);

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

  return Cmp ? <Cmp config={config} message={message} /> : null;
};
