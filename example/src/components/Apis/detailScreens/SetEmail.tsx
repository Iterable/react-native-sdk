import { Iterable } from '@iterable/react-native-sdk';
import { useMemo, useState } from 'react';
import { Alert, Pressable, Text, TextInput } from 'react-native';

import { useIterableApp } from '../../../hooks';
import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';
import Banner, { BannerVariant } from '../../Banner';

export const SetEmail = () => {
  const [email, setEmail] = useState('');
  const { setUserId } = useIterableApp();
  const codeString = useMemo(() => `Iterable.setEmail("${email}");`, [email]);

  return (
    <>
      <Banner variant={BannerVariant.Warning}>
        Specify a user by either setting the email or the userId, but NOT both.
        If a userId is set, nullify it before setting the email.
      </Banner>
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
          Iterable.setEmail(email);
          setUserId(email);
          Alert.alert('Email set:', email);
          console.log('Email set:', email);
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
