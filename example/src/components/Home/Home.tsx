import { Iterable } from '@iterable/react-native-sdk';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Route } from '../../constants/routes';
import useIterableApp from '../../hooks/useIterableApp';
import type { RootStackScreenProps } from '../../types/navigation';
import { Login } from '../Login';
import styles from './Home.styles';

export const Home = (props: RootStackScreenProps<Route.Home>) => {
  const { logout, isLoggedIn } = useIterableApp();
  const [loggedInAs, setLoggedInAs] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn) {
      Iterable.getEmail().then((email) => setLoggedInAs(email || ''));
    } else {
      setLoggedInAs('');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Login {...props} />;
  }

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
