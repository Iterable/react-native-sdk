import { View, Text } from 'react-native';

import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedComponentProps';

export const IterableEmbeddedNotification = ({
  config,
  message,
  onButtonClick = () => {},
}: IterableEmbeddedComponentProps) => {
  console.log(`🚀 > IterableEmbeddedNotification > config:`, config);
  console.log(`🚀 > IterableEmbeddedNotification > message:`, message);
  console.log(
    `🚀 > IterableEmbeddedNotification > onButtonClick:`,
    onButtonClick
  );

  return (
    <View>
      <Text>IterableEmbeddedNotification</Text>
    </View>
  );
};
