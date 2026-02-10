import { Iterable } from '@iterable/react-native-sdk';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useIterableApp } from '../../hooks';
import styles from './User.styles';

export const User = () => {
  const { logout, isLoggedIn } = useIterableApp();
  const [loggedInAs, setLoggedInAs] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn) {
      Iterable.getEmail().then((email) => setLoggedInAs(email || ''));
    } else {
      setLoggedInAs('');
    }
  }, [isLoggedIn]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appName}>Welcome Iterator</Text>
      <Text style={styles.text}>Logged in as {loggedInAs}</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default User;
