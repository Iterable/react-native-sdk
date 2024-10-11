import { Alert, Pressable, Text, TextInput } from 'react-native';
import { useMemo, useState } from 'react';

import { Iterable } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import JSONInput from '../../JSONInput';
import { formStyles } from '../Apis.styles';

export const TrackEvent = () => {
  const [eventName, setEventName] = useState('');
  const [dataFields, setDataFields] = useState<
    Record<string, unknown> | undefined
  >({});

  const codeString = useMemo(() => {
    return `
Iterable.trackEvent(
  "${eventName}",
  ${JSON.stringify(dataFields)},
);
    `;
  }, [eventName, dataFields]);

  return (
    <>
      <Text style={formStyles.label}>Event name</Text>
      <TextInput
        style={formStyles.input}
        onChangeText={setEventName}
        value={eventName}
        placeholder="eg: custom event"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={formStyles.label}>Data Fields</Text>
      <JSONInput value={dataFields} onChangeJSON={setDataFields} />
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.trackEvent(eventName, dataFields);
          Alert.alert('Event tracked:', eventName);
          console.log(`
Event tracked with the following data:
Event name: ${eventName}
Data fields: ${JSON.stringify(dataFields)}
            `);
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
