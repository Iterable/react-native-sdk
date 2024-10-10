import { useState } from 'react';
import { Pressable, Text } from 'react-native';

import { Iterable } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';

const codeString = `
Iterable.getLastPushPayload().then(payload => {
  console.log("pushPayload: " + JSON.stringify(payload))
});
`;

export const GetLastPushPayload = () => {
  const [hasRun, setHasRun] = useState(false);
  const [pushPayload, setPushPayload] = useState<any>('');

  return (
    <>
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.getLastPushPayload().then((payload) => {
            console.log(`🚀 > Iterable.getLastPushPayload > payload:`, payload);
            console.log('pushPayload: ' + JSON.stringify(payload));
            setPushPayload(JSON.stringify(payload ?? ''));
            setHasRun(true);
          });
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
      {hasRun && (
        <>
          <Text style={formStyles.label}>Result:</Text>
          <CodeBlock codeString={pushPayload} />
        </>
      )}
    </>
  );
};
