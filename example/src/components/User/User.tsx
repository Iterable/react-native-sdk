import { Iterable } from '@iterable/react-native-sdk';
import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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

  const getEmbeddedMessages = useCallback(() => {
    Iterable.embeddedManager.getMessages([1641]).then((messages: unknown) => {
      console.log(messages);
    });
  }, []);

  const getPlacementIds = useCallback(() => {
    Iterable.embeddedManager.getPlacementIds().then((ids: unknown) => {
      console.log(ids);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Welcome Iterator</Text>
      <Text style={styles.text}>Logged in as {loggedInAs}</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getEmbeddedMessages}>
        <Text style={styles.buttonText}>Get embedded messages</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getPlacementIds}>
        <Text style={styles.buttonText}>Get placement ids</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;
