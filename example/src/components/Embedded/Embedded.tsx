import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useState } from 'react';
import {
  Iterable,
  type IterableAction,
  type IterableEmbeddedMessage,
} from '@iterable/react-native-sdk';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './Embedded.styles';

export const Embedded = () => {
  const [placementIdsInput, setPlacementIdsInput] = useState<string>('');
  const [embeddedMessages, setEmbeddedMessages] = useState<
    IterableEmbeddedMessage[]
  >([]);

  // Parse placement IDs from input
  const parsedPlacementIds = placementIdsInput
    .split(',')
    .map((id) => id.trim())
    .filter((id) => id !== '')
    .map((id) => parseInt(id, 10))
    .filter((id) => !isNaN(id));

  const idsToFetch = parsedPlacementIds.length > 0 ? parsedPlacementIds : null;

  const syncEmbeddedMessages = useCallback(() => {
    Iterable.embeddedManager.syncMessages();
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
    console.log('Fetching messages for placement IDs:', idsToFetch);

    Iterable.embeddedManager
      .getMessages(idsToFetch)
      .then((messages: IterableEmbeddedMessage[]) => {
        setEmbeddedMessages(messages);
        console.log(messages);
      });
  }, [idsToFetch]);

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Embedded</Text>
      {!Iterable.embeddedManager.isEnabled && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            ⚠️ Embedded messaging is disabled. Please enable it in your Iterable
            config.
          </Text>
        </View>
      )}
      <Text style={styles.subtitle}>
        Enter placement IDs to fetch embedded messages
      </Text>
      <View style={styles.utilitySection}>
        <TouchableOpacity style={styles.button} onPress={syncEmbeddedMessages}>
          <Text style={styles.buttonText}>Sync messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={startEmbeddedSession}>
          <Text style={styles.buttonText}>Start session</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={endEmbeddedSession}>
          <Text style={styles.buttonText}>End session</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Placement IDs (comma-separated):</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 1, 2, 3"
            placeholderTextColor="#999"
            value={placementIdsInput}
            onChangeText={setPlacementIdsInput}
            keyboardType="numbers-and-punctuation"
          />
          <TouchableOpacity style={styles.button} onPress={getEmbeddedMessages}>
            <Text style={styles.buttonText}>
              Get messages for placement ids
            </Text>
          </TouchableOpacity>
        </View>
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
