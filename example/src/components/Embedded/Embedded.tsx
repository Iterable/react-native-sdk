import {
  Iterable,
  IterableEmbeddedView,
  IterableEmbeddedViewType,
  type IterableEmbeddedMessage,
} from '@iterable/react-native-sdk';
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';

import { useIterableApp } from '../../hooks';
import styles from './Embedded.styles';

export const Embedded = () => {
  const { isLoggedIn } = useIterableApp();
  const isFocused = useIsFocused();
  const [hasSession, setHasSession] = useState<boolean>(false);
  const [placementIds, setPlacementIds] = useState<number[]>([]);
  const [messages, setMessages] = useState<IterableEmbeddedMessage[]>([]);

  const getPlacementIds = useCallback(() => {
    Iterable.embeddedManager.getPlacementIds().then((ids: unknown) => {
      console.log(ids);
      setPlacementIds(ids as number[]);
    });
  }, []);

  const getEmbeddedMessages = useCallback(() => {
    Iterable.embeddedManager.getMessages(placementIds).then((messageList) => {
      console.log(messageList);
      setMessages(messageList as IterableEmbeddedMessage[]);
    });
  }, [placementIds]);

  const sync = useCallback(() => {
    Iterable.embeddedManager.syncMessages();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getPlacementIds();
    }
  }, [isLoggedIn, getPlacementIds]);

  useEffect(() => {
    if (isFocused) {
      Iterable.embeddedManager.startSession();
      Iterable.embeddedManager.syncMessages();
      Iterable.embeddedManager.getPlacementIds().then((ids: unknown) => {
        console.log(ids);
        setPlacementIds(ids as number[]);
        Iterable.embeddedManager
          .getMessages(placementIds)
          .then((messageList) => {
            console.log(messageList);
            setMessages(messageList as IterableEmbeddedMessage[]);
            setHasSession(true);
          });
      });
    } else {
      if (hasSession) {
        Iterable.embeddedManager.endSession();
        setHasSession(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.utilitySection}>
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
      <View style={styles.hr} />
      <ScrollView>
        <View style={styles.embeddedSection}>
          {messages.map((message) => {
            return (
              <IterableEmbeddedView
                key={message.metadata.messageId}
                viewType={IterableEmbeddedViewType.Card}
                message={message}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Embedded;
