import { IterableInbox, type IterableInboxProps } from '@iterable/react-native-sdk';
import { View } from 'react-native';
import useIterableApp from '../hooks/useIterableApp';

export default function DefaultInbox(props: IterableInboxProps) {
  const { returnToInboxTrigger } = useIterableApp();
  return (
    <View>
      <IterableInbox returnToInboxTrigger={returnToInboxTrigger} {...props} />
    </View>
  );
}
