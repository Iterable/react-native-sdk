import { Alert, Pressable, Text } from 'react-native';

import {
  Iterable,
  IterableInAppDeleteSource,
  IterableInAppLocation,
  IterableInAppMessage,
} from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';

const codeString = `
Iterable.inAppManager.getMessages().then((messages) => {
  if (messages.length > 0) {
    const message = messages[
      messages.length - 1
    ] as IterableInAppMessage;

    Iterable.inAppConsume(
      message,
      IterableInAppLocation.inbox,
      IterableInAppDeleteSource.deleteButton
    );
  }
});
`;

export const InAppConsume = () => {
  return (
    <>
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} style={{ height: 280 }} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.inAppManager.getMessages().then((messages) => {
            if (messages.length > 0) {
              const message = messages[
                messages.length - 1
              ] as IterableInAppMessage;

              Iterable.inAppConsume(
                message,
                IterableInAppLocation.inbox,
                IterableInAppDeleteSource.deleteButton
              );
              Alert.alert(
                'In-App Consume Called',
                `Message: ${message.messageId}`
              );
              console.log('In-App Consume Called', message);
            }
          });
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
