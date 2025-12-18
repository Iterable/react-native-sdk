import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useState } from 'react';
import {
  Iterable,
  type IterableEmbeddedMessage,
} from '@iterable/react-native-sdk';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './Embedded.styles';

export const Embedded = () => {
  const [placementIds, setPlacementIds] = useState<number[]>([]);
  const [embeddedMessages, setEmbeddedMessages] = useState<
    IterableEmbeddedMessage[]
  >([]);

  const syncEmbeddedMessages = useCallback(() => {
    Iterable.embeddedManager.syncMessages();
  }, []);

  const getPlacementIds = useCallback(() => {
    return Iterable.embeddedManager.getPlacementIds().then((ids: unknown) => {
      console.log(ids);
      setPlacementIds(ids as number[]);
      return ids;
    });
  }, []);

  const startEmbeddedSession = useCallback(() => {
    console.log(
      'startEmbeddedSession --> check android/ios logs to check if it worked'
    );
    Iterable.embeddedManager.startSession();
  }, []);

  const endEmbeddedSession = useCallback(() => {
    console.log(
      'endEmbeddedSession --> check android/ios logs to check if it worked'
    );
    Iterable.embeddedManager.endSession();
  }, []);

  const getEmbeddedMessages = useCallback(() => {
    getPlacementIds()
      .then((ids: number[]) => Iterable.embeddedManager.getMessages(ids))
      .then((messages: IterableEmbeddedMessage[]) => {
        setEmbeddedMessages(messages);
        console.log(messages);
      });
  }, [getPlacementIds]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>EMBEDDED</Text>
      <View style={styles.utilitySection}>
        <Text style={styles.text}>
          Does embedded class exist? {Iterable.embeddedManager ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.text}>
          Is embedded manager enabled?{' '}
          {Iterable.embeddedManager.isEnabled ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.text}>
          Placement ids: [{placementIds.join(', ')}]
        </Text>
        <TouchableOpacity style={styles.button} onPress={syncEmbeddedMessages}>
          <Text style={styles.buttonText}>Sync embedded messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getPlacementIds}>
          <Text style={styles.buttonText}>Get placement ids</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={startEmbeddedSession}>
          <Text style={styles.buttonText}>Start embedded session</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={endEmbeddedSession}>
          <Text style={styles.buttonText}>End embedded session</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getEmbeddedMessages}>
          <Text style={styles.buttonText}>Get embedded messages</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.hr} />
      <ScrollView>
        <View style={styles.embeddedSection}>
          {embeddedMessages.map((message) => (
            <View key={message.metadata.messageId}>
              <Text>Embedded message</Text>
              <Text>metadata.messageId: {message.metadata.messageId}</Text>
              <Text>metadata.placementId: {message.metadata.placementId}</Text>
              <Text>elements.title: {message.elements?.title}</Text>
              <Text>elements.body: {message.elements?.body}</Text>
              {(message.elements?.buttons ?? []).map((button, buttonIndex) => (
                <View key={`${button.id}-${buttonIndex}`}>
                  <Text>Button {buttonIndex + 1}</Text>
                  <Text>button.id: {button.id}</Text>
                  <Text>button.title: {button.title}</Text>
                  <Text>button.action?.data: {button.action?.data}</Text>
                  <Text>button.action?.type: {button.action?.type}</Text>
                </View>
              ))}
              <Text>payload: {JSON.stringify(message.payload)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Embedded;
