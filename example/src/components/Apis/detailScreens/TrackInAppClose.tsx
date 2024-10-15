import { Alert, Pressable, Text } from 'react-native';

import {
  Iterable,
  IterableInAppCloseSource,
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

    Iterable.trackInAppClose(
      message,
      IterableInAppLocation.inbox,
      IterableInAppCloseSource.back,
      'https://somewhere.com'
    );
  }
});
`;

export const TrackInAppClose = () => {
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

              Iterable.trackInAppClose(
                message,
                IterableInAppLocation.inbox,
                IterableInAppCloseSource.back,
                'https://somewhere.com'
              );
              Alert.alert(
                'Track InApp Close Called',
                `Message: ${message.messageId}`
              );
              console.log('Track InApp Close Called', message);
            }
          });
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};