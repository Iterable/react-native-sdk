import { Iterable } from '@iterable/react-native-sdk';
import { useEffect, useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Route } from '../../constants/routes';
import useIterableApp from '../../hooks/useIterableApp';
import type { RootStackScreenProps } from '../../types/navigation';
import styles from './Home.styles';

export const Home = ({ navigation }: RootStackScreenProps<Route.Home>) => {
  const { initialize, logout, isLoggedIn } = useIterableApp();
  const [loggedInAs, setLoggedInAs] = useState<string>('');

  useEffect(() => {
    initialize(navigation);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Iterable.getEmail().then((email) => {
        console.log(`🚀 > Home > email:`, email);
        setLoggedInAs(email || '');
      });
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
