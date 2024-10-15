import { useMemo, useState } from 'react';
import { Alert, Pressable, Text, TextInput } from 'react-native';

import { Iterable } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';

export const HandleAppLink = () => {
  const [link, setLink] = useState<string>('');
  const codeString = useMemo(
    () => `Iterable.handleAppLink("${link}");`,
    [link]
  );

  return (
    <>
      <Text style={formStyles.label}>Link</Text>
      <TextInput
        style={formStyles.input}
        onChangeText={setLink}
        value={link}
        placeholder="eg: https://example.com"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="url"
      />
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.handleAppLink(link);
          Alert.alert('`Iterable.handleAppLink` called', `link: ${link}`);
          console.log('`Iterable.handleAppLink` called with:', link);
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
