import { useMemo, useState } from 'react';
import { Alert, Pressable, Text, TextInput } from 'react-native';

import { Iterable } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';

export const UpdateEmail = () => {
  const [email, setEmail] = useState('');

  const codeString = useMemo(() => {
    return `Iterable.updateEmail("${email}");`;
  }, [email]);

  return (
    <>
      <Text style={formStyles.label}>Email address</Text>
      <TextInput
        style={formStyles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="eg: my.name@gmail.com"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
      />
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.updateEmail(email);
          Alert.alert('Email Updated:', email);
          console.log('Email Updated:', email);
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
