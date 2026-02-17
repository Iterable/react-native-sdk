import { View, Text } from 'react-native';

import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedComponentProps';

export const IterableEmbeddedBanner = ({
  config,
  message,
  onButtonClick = () => {},
}: IterableEmbeddedComponentProps) => {
  console.log(`🚀 > IterableEmbeddedBanner > config:`, config);
  console.log(`🚀 > IterableEmbeddedBanner > message:`, message);
  console.log(`🚀 > IterableEmbeddedBanner > onButtonClick:`, onButtonClick);

  return (
    <View>
      <Text>IterableEmbeddedBanner</Text>
    </View>
  );
};
