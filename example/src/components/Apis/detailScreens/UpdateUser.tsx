import { useMemo, useState } from 'react';
import { Alert, Pressable, Switch, Text } from 'react-native';

import { Iterable } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import JSONInput from '../../JSONInput';
import { formStyles } from '../Apis.styles';

export const UpdateUser = () => {
  const [mergeDataFields, setMergeDataFields] = useState(false);
  const [dataFields, setDataFields] = useState<
    Record<string, unknown> | undefined
  >({});

  const codeString = useMemo(() => {
    return `
Iterable.updateUser(
  ${JSON.stringify(dataFields)},
  ${mergeDataFields},
);
    `;
  }, [dataFields, mergeDataFields]);

  return (
    <>
      <Text style={formStyles.label}>Data Fields</Text>
      <JSONInput value={dataFields} onChangeJSON={setDataFields} />
      <Text style={formStyles.label}>Merge Data Fields?</Text>
      <Switch value={mergeDataFields} onValueChange={setMergeDataFields} />
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.updateUser(dataFields, mergeDataFields);
          Alert.alert('User Updated:', JSON.stringify(dataFields));
          console.log(`
User Updated with the following data:
Data fields: ${JSON.stringify(dataFields)}
Merge data fields?: ${mergeDataFields}
            `);
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
