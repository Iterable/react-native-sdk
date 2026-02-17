import { View, Text } from 'react-native';
import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedComponentProps';

export const IterableEmbeddedCard = ({
  config,
  message,
  onButtonClick = () => {},
}: IterableEmbeddedComponentProps) => {
  console.log(`🚀 > IterableEmbeddedCard > config:`, config);
  console.log(`🚀 > IterableEmbeddedCard > message:`, message);
  console.log(`🚀 > IterableEmbeddedCard > onButtonClick:`, onButtonClick);

  return (
    <View>
      <Text>IterableEmbeddedCard</Text>
    </View>
  );
};
