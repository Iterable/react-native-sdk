import { useState } from 'react';
import { Pressable, Text } from 'react-native';

import { Iterable } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';

const codeString = `
Iterable.getEmail().then((email) => {
  console.log('Email:', email);
});
`;

export const GetEmail = () => {
  const [hasRun, setHasRun] = useState(false);
  const [payload, setPayload] = useState<any>('');

  return (
    <>
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.getEmail().then((email) => {
            console.log('Email:', email);
            setPayload(email ?? 'undefined');
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
