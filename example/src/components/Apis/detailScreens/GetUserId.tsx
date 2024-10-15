import { useState } from 'react';
import { Pressable, Text } from 'react-native';

import { Iterable } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';

const codeString = `
Iterable.getUserId().then((userId) => {
  console.log('UserId:', userId);
});
`;

export const GetUserId = () => {
  const [hasRun, setHasRun] = useState(false);
  const [payload, setPayload] = useState<any>('');

  return (
    <>
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.getUserId().then((userId) => {
            console.log('UserId:', userId);
            setPayload(userId ?? 'undefined');
            setHasRun(true);
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
