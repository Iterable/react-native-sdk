import { Iterable } from '@iterable/react-native-sdk';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import useIterableApp from '../../hooks/useIterableApp';
import styles from './Home.styles';

export const Home = () => {
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
    <View style={styles.container}>
      <Text style={styles.appName}>Welcome Iterator</Text>
      <Text style={styles.text}>Logged in as {loggedInAs}</Text>
      <TouchableOpacity style={styles.secondaryButton} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
