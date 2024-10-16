import { Alert, Pressable, Text, Switch } from 'react-native';
import { useMemo, useState } from 'react';

import { Iterable, IterableInAppMessage } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';
import Banner, { BannerVariant } from '../../Banner';

export const ShowInAppMessages = () => {
  const [consume, setConsume] = useState<boolean>(false);

  const codeString = useMemo(
    () => `
Iterable.inAppManager.getMessages().then((messages) => {
  if (messages.length > 0) {
    const message = messages[
      messages.length - 1
    ] as IterableInAppMessage;

    Iterable.inAppManager
      .showMessage(message, ${consume})
      .then((url) => {
        console.log('url: ' + url);
      });
  }
});
`,
    [consume]
  );

  return (
    <>
      <Banner variant={BannerVariant.Info}>
        This renders an in-app message and consumes it from the users message
        queue if necessary.
      </Banner>
      <Text style={formStyles.label}>Consume?</Text>
      <Switch
        style={formStyles.switch}
        value={consume}
        onValueChange={setConsume}
      />
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} height={270} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.inAppManager.getMessages().then((messages) => {
            console.log('total messages: ' + messages.length);
            if (messages.length > 0) {
              const message = messages[
                messages.length - 1
              ] as IterableInAppMessage;

              Iterable.inAppManager
                .showMessage(message, consume)
                .then((url) => {
                  console.log('url: ' + url);
                  Alert.alert('Message shown', `url: ${url}`);
                  console.log('Message shown', url);
                });
            }
          });
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
