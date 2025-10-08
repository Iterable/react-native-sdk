import { Text, View } from 'react-native';

import type { IterableEmbeddedComponentProps } from '../IterableEmbeddedViewProps';

export const IterableEmbeddedNotification = (
  props: IterableEmbeddedComponentProps
) => {
  console.log(`🚀 > IterableEmbeddedNotification > props:`, props);
  return (
    <View>
      <Text>IterableEmbeddedNotification</Text>
    </View>
  );
};
