import { Text, View, type ViewStyle } from 'react-native';
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
      style={[
        styles.container,
        {
          backgroundColor: parsedStyles.backgroundColor,
          borderColor: parsedStyles.borderColor,
          borderRadius: parsedStyles.borderCornerRadius,
          borderWidth: parsedStyles.borderWidth,
        } as ViewStyle,
      ]}
    >
      <Text>IterableEmbeddedCard</Text>
    </View>
  );
};
