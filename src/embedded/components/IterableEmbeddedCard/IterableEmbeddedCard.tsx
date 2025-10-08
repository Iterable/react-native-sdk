import { Text, View } from 'react-native';

import type { IterableEmbeddedComponentProps } from '../IterableEmbeddedViewProps';

export const IterableEmbeddedCard = (props: IterableEmbeddedComponentProps) => {
  console.log(`🚀 > IterableEmbeddedCard > props:`, props);
  return (
    <View>
      <Text>IterableEmbeddedCard</Text>
    </View>
  );
};
