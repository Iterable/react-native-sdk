import { Alert, Pressable, Text } from 'react-native';

import {
  Iterable,
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

    Iterable.trackInAppOpen(message, IterableInAppLocation.inbox);
  }
});
`;

export const TrackInAppOpen = () => {
  return (
    <>
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.inAppManager.getMessages().then((messages) => {
            if (messages.length > 0) {
              const message = messages[
                messages.length - 1
              ] as IterableInAppMessage;
              Iterable.trackInAppOpen(message, IterableInAppLocation.inbox);
              Alert.alert(
                'Track InApp Open Called',
                `Message: ${message.messageId}`
              );
              console.log('Track InApp Open Called', message);
            }
          });
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
