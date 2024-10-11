import { Iterable } from '@iterable/react-native-sdk';
import { useMemo, useState } from 'react';
import { Alert, Pressable, Text, TextInput } from 'react-native';

import Banner, { BannerVariant } from '../../Banner';
import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';
import { useIterableApp } from '../../../hooks';

export const SetUserId = () => {
  const [id, setId] = useState('');
  const { setUserId } = useIterableApp();
  const codeString = useMemo(() => `Iterable.setUserId("${id}");`, [id]);

  return (
    <>
      <Banner variant={BannerVariant.Warning}>
        Specify a user by either setting the email or the userId, but NOT both.
        If an email is set, nullify it before setting the userId.
      </Banner>
      <Text style={formStyles.label}>User Id</Text>
      <TextInput
        style={formStyles.input}
        onChangeText={setId}
        value={id}
        placeholder="eg: 12345678"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.setUserId(id);
          setUserId(id);
          Alert.alert('User ID set:', id);
          console.log('User ID set:', id);
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
