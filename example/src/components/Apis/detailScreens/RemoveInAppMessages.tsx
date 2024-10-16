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

    Iterable.inAppManager.removeMessage(
      message,
      IterableInAppLocation.inbox,
      IterableInAppDeleteSource.deleteButton
    );
  }
});
`;

export const RemoveInAppMessages = () => {
  return (
    <>
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} height={270} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.inAppManager.getMessages().then((messages) => {
            if (messages.length > 0) {
              const message = messages[
                messages.length - 1
              ] as IterableInAppMessage;

              Iterable.inAppManager.removeMessage(
                message,
                IterableInAppLocation.inbox,
                IterableInAppDeleteSource.deleteButton
              );
              Alert.alert(
                'Remove InApp Message Called',
                `Message: ${message.messageId}`
              );
              console.log('Remove InApp Message Called', message);
            }
          });
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
