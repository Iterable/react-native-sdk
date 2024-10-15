import { useState } from 'react';
import { Pressable, Text } from 'react-native';

import { Iterable } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';

const codeString = `
Iterable.getAttributionInfo().then((info) => {
  console.log("Attribution Info: " + JSON.stringify(info))
});
`;

export const GetAttributionInfo = () => {
  const [hasRun, setHasRun] = useState(false);
  const [payload, setPayload] = useState<any>('');

  return (
    <>
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.getAttributionInfo().then((info) => {
            console.log('Attribution Info: ' + JSON.stringify(info));
            setPayload(JSON.stringify(info ?? ''));
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
