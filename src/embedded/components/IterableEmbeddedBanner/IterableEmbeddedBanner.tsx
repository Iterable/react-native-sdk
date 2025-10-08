import { Text, View } from 'react-native';

import type { IterableEmbeddedComponentProps } from '../IterableEmbeddedViewProps';

export const IterableEmbeddedBanner = (
  props: IterableEmbeddedComponentProps
) => {
  console.log(`🚀 > IterableEmbeddedBanner > props:`, props);
  return (
    <View>
      <Text>IterableEmbeddedBanner</Text>
    </View>
  );
};
