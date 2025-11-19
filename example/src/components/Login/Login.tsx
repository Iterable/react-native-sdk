import { useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, type Route } from '../../constants';
import { useIterableApp } from '../../hooks';
import type { RootStackScreenProps } from '../../types';
import { styles } from './Login.styles';

export const Login = ({ navigation }: RootStackScreenProps<Route.Login>) => {
  const { apiKey, setApiKey, userId, setUserId, initialize, loginInProgress } =
    useIterableApp();
  const loginIsEnabled = useMemo(() => apiKey && userId, [apiKey, userId]);

  return (
    <SafeAreaView style={styles.loginScreenContainer}>
      {loginInProgress ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.brandPurple} />
        </View>
      ) : (
        <>
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
            <Text style={styles.label}>Email address or User Id</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUserId}
              value={userId ?? ''}
              placeholder="eg: my.name@gmail.com or 1234567890"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
            />
            <Pressable
              style={loginIsEnabled ? styles.button : styles.buttonDisabled}
              disabled={!loginIsEnabled}
              onPressOut={() => initialize(navigation)}
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
        </>
      )}
    </SafeAreaView>
  );
};

export default Login;
