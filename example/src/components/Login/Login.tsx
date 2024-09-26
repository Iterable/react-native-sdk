import { Pressable, Text, TextInput, View } from 'react-native';

import { useMemo } from 'react';
import useIterableApp from '../../hooks/useIterableApp';
import { styles } from './Login.styles';

export const Login = () => {
  const {
    apiKey,
    setApiKey,
    userId,
    setUserId,
    email,
    setEmail,
    setLoginInProgress,
  } = useIterableApp();
  const loginIsEnabled = useMemo(
    () => apiKey && (email || userId),
    [apiKey, email, userId]
  );

  return (
    <View style={styles.loginScreenContainer}>
      <Text style={styles.appName}>Iterable</Text>
      <Text style={styles.title}>Sign in to continue</Text>
      <Text style={styles.subtitle}>
        Example app for React Native developers
      </Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>API key</Text>
        <TextInput
          style={styles.input}
          onChangeText={setApiKey}
          value={apiKey}
          placeholder="eg: 1234567890abcdefg1234567890hijkl"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="eg: my.name@gmail.com"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.label}>Email address or User ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserId}
          value={userId}
          placeholder="eg: 1234567890"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable
          style={loginIsEnabled ? styles.button : styles.buttonDisabled}
          disabled={!loginIsEnabled}
          onPressOut={() => setLoginInProgress(true)}
        >
          <Text
            style={
              loginIsEnabled ? styles.buttonText : styles.buttonTextDisabled
            }
          >
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
