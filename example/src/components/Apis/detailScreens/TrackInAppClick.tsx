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

    Iterable.trackInAppClick(
      message,
      IterableInAppLocation.inbox,
      'https://somewhere.com'
    );
  }
});
`;

export const TrackInAppClick = () => {
  return (
    <>
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} height={260} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.inAppManager.getMessages().then((messages) => {
            if (messages.length > 0) {
              const message = messages[
                messages.length - 1
              ] as IterableInAppMessage;

              Iterable.trackInAppClick(
                message,
                IterableInAppLocation.inbox,
                'https://somewhere.com'
              );
              Alert.alert(
                'Track InApp Click Called',
                `Message: ${message.messageId}`
              );
              console.log('Track InApp Click Called', message);
            }
          });
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
