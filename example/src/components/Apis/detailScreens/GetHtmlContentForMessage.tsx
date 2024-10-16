import { useState } from 'react';
import { Alert, Pressable, Text } from 'react-native';

import {
  Iterable,
  IterableHtmlInAppContent,
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

    Iterable.inAppManager
      .getHtmlContentForMessage(message)
      .then((content) => console.log(content))
      .catch((error) => console.log(error));
  }
});
`;

const formatResponse = (
  response?: Record<string, unknown> | IterableHtmlInAppContent
) => {
  return response ? JSON.stringify(response, null, 2) : 'undefined';
};

export const GetHtmlContentForMessage = () => {
  const [hasRun, setHasRun] = useState(false);
  const [payload, setPayload] = useState<string>('');

  return (
    <>
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} height={250} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.inAppManager.getMessages().then((messages) => {
            if (messages.length > 0) {
              const message = messages[
                messages.length - 1
              ] as IterableInAppMessage;

              console.log(
                '`Iterable.inAppManager.getHtmlContentForMessage` called with: ' +
                  message
              );

              Iterable.inAppManager
                .getHtmlContentForMessage(message)
                .then((content) => {
                  console.log(
                    '`Iterable.inAppManager.getHtmlContentForMessage` returns: ' +
                      content
                  );
                  setPayload(formatResponse(content));
                })
                .catch((error) => {
                  console.log(
                    '`Iterable.inAppManager.getHtmlContentForMessage` failed with error: ' +
                      error
                  );
                  setPayload(formatResponse(error));
                })
                .finally(() => {
                  Alert.alert(
                    '`Iterable.inAppManager.getHtmlContentForMessage` called',
                    'Check console for result'
                  );
                  setHasRun(true);
                });
            }
          });
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
      {hasRun && (
        <>
          <Text style={formStyles.label}>Result:</Text>
          <CodeBlock codeString={payload} />
        </>
      )}
    </>
  );
};
