import { Iterable } from '@iterable/react-native-sdk';
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useIterableApp } from '../../hooks';
import styles from './Embedded.styles';

export const Embedded = () => {
  const { isLoggedIn } = useIterableApp();
  const isFocused = useIsFocused();
  const [loggedInAs, setLoggedInAs] = useState<string>('');
  const [hasSession, setHasSession] = useState<boolean>(false);
  const [placementIds, setPlacementIds] = useState<number[]>([]);

  useEffect(() => {
    if (isFocused) {
      Iterable.embeddedManager.startSession();
      setHasSession(true);
    } else {
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
      Iterable.embeddedManager.getPlacementIds().then((ids: unknown) => {
        console.log(`🚀 > User > ids:`, ids);
        setPlacementIds(ids as number[]);
      });
    } else {
      setLoggedInAs('');
    }
  }, [isLoggedIn]);

  const getEmbeddedMessages = useCallback(() => {
    Iterable.embeddedManager
      .getMessages(placementIds)
      .then((messages: unknown) => {
        console.log(messages);
      });
  }, [placementIds]);

  const getPlacementIds = useCallback(() => {
    Iterable.embeddedManager.getPlacementIds().then((ids: unknown) => {
      console.log(ids);
    });
  }, []);

  const sync = useCallback(() => {
    Iterable.embeddedManager.syncMessages();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Welcome Iterator</Text>
      <Text style={styles.text}>Logged in as {loggedInAs}</Text>
      <Text style={styles.text}>Has session: {hasSession.toString()}</Text>
      <Text style={styles.text}>
        Placement ids: [{placementIds.join(', ')}]
      </Text>
      <TouchableOpacity style={styles.button} onPress={getEmbeddedMessages}>
        <Text style={styles.buttonText}>Get embedded messages</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getPlacementIds}>
        <Text style={styles.buttonText}>Get placement ids</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={sync}>
        <Text style={styles.buttonText}>Sync</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Embedded;
