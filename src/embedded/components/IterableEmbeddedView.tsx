import { useMemo } from 'react';
import { View, Text, Image } from 'react-native';

import { IterableEmbeddedViewType } from '../enums/IterableEmbeddedViewType';

import { IterableEmbeddedBanner } from './IterableEmbeddedBanner';
import { IterableEmbeddedCard } from './IterableEmbeddedCard';
import { IterableEmbeddedNotification } from './IterableEmbeddedNotification';
import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedComponentProps';
import { useEmbeddedView } from '../hooks/useEmbeddedView/useEmbeddedView';

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

  const { media } = useEmbeddedView(viewType, props);

  return Cmp ? (
    <View>
      <Text>media.url: {media.url}</Text>
      <Text>media.caption: {media.caption}</Text>
      <Text>media.shouldShow: {media.shouldShow ? 'true' : 'false'}</Text>
      {media.url ? <Image source={{ uri: media.url }} width={100} height={100} /> : null}
      <Cmp {...props} />
    </View>
  ) : null;
};
