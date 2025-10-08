import { useMemo } from 'react';
import { Text, View } from 'react-native';

import { IterableEmbeddedViewType } from '../../enums';
import { getMedia } from '../utils/getMedia';
import { getStyles } from '../utils/getStyles';

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

  const parsedStyles = useMemo(() => {
    return getStyles(viewType, config);
  }, [viewType, config]);
  console.log(`🚀 > IterableEmbeddedView > parsedStyles:`, parsedStyles);
  const media = useMemo(() => {
    return getMedia(viewType, message);
  }, [viewType, message]);
  console.log(`🚀 > IterableEmbeddedView > media:`, media);

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

  return (
    <View>
      <Text>EMBEDDED MESSAGE!!!</Text>
      {Cmp && <Cmp message={message} config={config} />}
      <Text>viewType: {viewType}</Text>
      <Text>title: {message.elements?.title}</Text>
      <Text>body: {message.elements?.body}</Text>
      <Text>mediaURL: {message.elements?.mediaURL}</Text>
      <Text>mediaUrlCaption: {message.elements?.mediaUrlCaption}</Text>
      <Text>config: {config?.backgroundColor}</Text>
      <Text>config: {config?.borderColor}</Text>
      <Text>config: {config?.borderWidth}</Text>
      <Text>config: {config?.borderCornerRadius}</Text>
      <Text>config: {config?.primaryBtnBackgroundColor}</Text>
      <Text>config: {config?.primaryBtnTextColor}</Text>
      <Text>config: {config?.secondaryBtnBackgroundColor}</Text>
    </View>
  );
};
