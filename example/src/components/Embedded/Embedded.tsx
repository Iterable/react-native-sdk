import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useState } from 'react';
import {
  Iterable,
  type IterableAction,
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

  const startEmbeddedImpression = useCallback(
    (message: IterableEmbeddedMessage) => {
      console.log(`startEmbeddedImpression`, message);
      Iterable.embeddedManager.startImpression(
        message.metadata.messageId,
        // TODO: check if this should be changed to a number, as per the type
        Number(message.metadata.placementId)
      );
    },
    []
  );

  const pauseEmbeddedImpression = useCallback(
    (message: IterableEmbeddedMessage) => {
      console.log(`pauseEmbeddedImpression:`, message);
      Iterable.embeddedManager.pauseImpression(message.metadata.messageId);
    },
    []
  );

  const handleClick = useCallback(
    (
      message: IterableEmbeddedMessage,
      buttonId: string | null,
      action?: IterableAction | null
    ) => {
      console.log(`handleClick:`, message);
      Iterable.embeddedManager.handleClick(message, buttonId, action);
    },
    []
  );

  const getEmbeddedMessagesForPlacement = useCallback(
    (placementId: number) => {
      console.log(`🚀 > Embedded > placementId:`, placementId);
      Iterable.embeddedManager.getMessagesForPlacement(placementId).then((messages: IterableEmbeddedMessage[]) => {
        setEmbeddedMessages(messages);
        console.log(messages);
      }).catch((error: unknown) => {
        console.error(error);
      });
    },
    []
  );

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
          <Text style={styles.buttonText}>Sync messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getPlacementIds}>
          <Text style={styles.buttonText}>Get placement ids</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={startEmbeddedSession}>
          <Text style={styles.buttonText}>Start session</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={endEmbeddedSession}>
          <Text style={styles.buttonText}>End session</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getEmbeddedMessages}>
          <Text style={styles.buttonText}>Get messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => getEmbeddedMessagesForPlacement(10)}>
          <Text style={styles.buttonText}>Get messages for placement 10</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.hr} />
      <ScrollView>
        <View style={styles.embeddedSection}>
          {embeddedMessages.map((message) => (
            <View key={message.metadata.messageId}>
              <View style={styles.embeddedTitleContainer}>
                <Text style={styles.embeddedTitle}>Embedded message</Text>
              </View>
              <View style={styles.embeddedTitleContainer}>
                <TouchableOpacity
                  onPress={() => startEmbeddedImpression(message)}
                >
                  <Text style={styles.link}>Start impression</Text>
                </TouchableOpacity>
                <Text style={styles.embeddedTitle}> | </Text>
                <TouchableOpacity
                  onPress={() => pauseEmbeddedImpression(message)}
                >
                  <Text style={styles.link}>Pause impression</Text>
                </TouchableOpacity>
                <Text style={styles.embeddedTitle}> | </Text>
                <TouchableOpacity
                  onPress={() =>
                    handleClick(message, null, message.elements?.defaultAction)
                  }
                >
                  <Text style={styles.link}>Handle click</Text>
                </TouchableOpacity>
              </View>

              <Text>metadata.messageId: {message.metadata.messageId}</Text>
              <Text>metadata.placementId: {message.metadata.placementId}</Text>
              <Text>elements.title: {message.elements?.title}</Text>
              <Text>elements.body: {message.elements?.body}</Text>
              <Text>
                elements.defaultAction.data:{' '}
                {message.elements?.defaultAction?.data}
              </Text>
              <Text>
                elements.defaultAction.type:{' '}
                {message.elements?.defaultAction?.type}
              </Text>
              {(message.elements?.buttons ?? []).map((button, buttonIndex) => (
                <View key={`${button.id}-${buttonIndex}`}>
                  <View style={styles.embeddedTitleContainer}>
                    <Text>Button {buttonIndex + 1}</Text>
                    <Text style={styles.embeddedTitle}> | </Text>
                    <TouchableOpacity
                      onPress={() =>
                        handleClick(message, button.id, button.action)
                      }
                    >
                      <Text style={styles.link}>Handle click</Text>
                    </TouchableOpacity>
                  </View>

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
