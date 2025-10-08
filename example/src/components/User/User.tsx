import { Iterable, IterableEmbeddedMessage } from '@iterable/react-native-sdk';
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useIterableApp } from '../../hooks';
import styles from './User.styles';

export const User = () => {
  const { logout, isLoggedIn } = useIterableApp();
  const isFocused = useIsFocused();
  const [loggedInAs, setLoggedInAs] = useState<string>('');
  const [hasListener, setHasListener] = useState<boolean>(false);
  const [hasSession, setHasSession] = useState<boolean>(false);

  useEffect(() => {
    const embeddedUpdateListener = (messages: IterableEmbeddedMessage[]) => {
      console.log('UPDATE', messages);
    };

    if (isFocused) {
      Iterable.embeddedManager.addUpdateListener(embeddedUpdateListener);
      setHasListener(true);

      Iterable.embeddedManager.startSession();
      setHasSession(true);
    } else {
      if (hasListener) {
        Iterable.embeddedManager.removeUpdateListener(embeddedUpdateListener);
        setHasListener(false);
      }
      if (hasSession) {
        Iterable.embeddedManager.endSession();
        setHasSession(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

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
