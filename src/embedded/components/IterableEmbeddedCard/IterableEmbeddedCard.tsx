import { Text, View } from 'react-native';
import { useMemo } from 'react';

import type { IterableEmbeddedComponentProps } from '../IterableEmbeddedViewProps';
import { IterableEmbeddedViewType } from '../../enums';
import { getStyles } from '../utils/getStyles';
import { getMedia } from '../utils/getMedia';
import { styles } from './IterableEmbeddedCard.styles';

export const IterableEmbeddedCard = ({
  config,
  message,
}: IterableEmbeddedComponentProps) => {
  const parsedStyles = useMemo(() => {
    return getStyles(IterableEmbeddedViewType.Card, config);
  }, [config]);
  console.log(`🚀 > IterableEmbeddedView > parsedStyles:`, parsedStyles);
  const media = useMemo(() => {
    return getMedia(IterableEmbeddedViewType.Card, message);
  }, [message]);
  console.log(`🚀 > IterableEmbeddedView > media:`, media);

  return (
    <View
      style={styles.container}
    >
      <Text>IterableEmbeddedCard</Text>
    </View>
  );
};
