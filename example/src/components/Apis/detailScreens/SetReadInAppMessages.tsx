import { useMemo, useState } from 'react';
import { Alert, Pressable, Switch, Text } from 'react-native';

import { Iterable, IterableInAppMessage } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';

export const SetReadInAppMessages = () => {
  const [read, setRead] = useState<boolean>(false);
  const codeString = useMemo(
    () => `
Iterable.inAppManager.getMessages().then((messages) => {
  if (messages.length > 0) {
    const message = messages[
      messages.length - 1
    ] as IterableInAppMessage;

    Iterable.inAppManager.setReadForMessage(
      message,
      ${read},
    );
  }
});
  `,
    [read]
  );

  return (
    <>
      <Text style={formStyles.label}>Read?</Text>
      <Switch style={formStyles.switch} value={read} onValueChange={setRead} />
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} blockHeight={250} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.inAppManager.getMessages().then((messages) => {
            if (messages.length > 0) {
              const message = messages[
                messages.length - 1
              ] as IterableInAppMessage;

              Iterable.inAppManager.setReadForMessage(message, read);

              Alert.alert(
                'Set Read For Message',
                `Message: ${message.messageId}`
              );
              console.log(`
Set Read For Message called with the following parameters:
message: ${message}
read: ${read}
                `);
            }
          });
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
