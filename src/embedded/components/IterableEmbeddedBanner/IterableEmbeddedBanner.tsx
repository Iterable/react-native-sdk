import { Text, View } from 'react-native';
import { useMemo } from 'react';

import type { IterableEmbeddedComponentProps } from '../IterableEmbeddedViewProps';
import { IterableEmbeddedViewType } from '../../enums';
import { getStyles } from '../utils/getStyles';
import { getMedia } from '../utils/getMedia';
import { styles } from './IterableEmbeddedBanner.styles';

export const IterableEmbeddedBanner = ({
  config,
  message,
}: IterableEmbeddedComponentProps) => {
  const parsedStyles = useMemo(() => {
    return getStyles(IterableEmbeddedViewType.Banner, config);
  }, [config]);
  console.log(`🚀 > IterableEmbeddedView > parsedStyles:`, parsedStyles);
  const media = useMemo(() => {
    return getMedia(IterableEmbeddedViewType.Banner, message);
  }, [message]);
  console.log(`🚀 > IterableEmbeddedView > media:`, media);

  return (
    <View
      style={styles.container}
    >
      <Text>IterableEmbeddedBanner</Text>
    </View>
  );
};
