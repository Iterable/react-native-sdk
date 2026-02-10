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
  type IterableEmbeddedMessage,
  IterableEmbeddedView,
  IterableEmbeddedViewType,
} from '@iterable/react-native-sdk';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './Embedded.styles';

export const Embedded = () => {
  const [placementIdsInput, setPlacementIdsInput] = useState<string>('');
  const [embeddedMessages, setEmbeddedMessages] = useState<
    IterableEmbeddedMessage[]
  >([]);
  const [selectedViewType, setSelectedViewType] =
    useState<IterableEmbeddedViewType>(IterableEmbeddedViewType.Banner);

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
    Iterable.embeddedManager.startSession();
  }, []);

  const endEmbeddedSession = useCallback(() => {
    Iterable.embeddedManager.endSession();
  }, []);

  const getEmbeddedMessages = useCallback(() => {
    Iterable.embeddedManager
      .getMessages(idsToFetch)
      .then((messages: IterableEmbeddedMessage[]) => {
        setEmbeddedMessages(messages);
        console.log(messages);
      });
  }, [idsToFetch]);

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
        <View style={styles.viewTypeSelector}>
          <Text style={styles.text}>Select View Type:</Text>
          <View style={styles.viewTypeButtons}>
            <TouchableOpacity
              style={[
                styles.viewTypeButton,
                selectedViewType === IterableEmbeddedViewType.Banner &&
                  styles.viewTypeButtonSelected,
              ]}
              onPress={() =>
                setSelectedViewType(IterableEmbeddedViewType.Banner)
              }
            >
              <Text
                style={[
                  styles.viewTypeButtonText,
                  selectedViewType === IterableEmbeddedViewType.Banner &&
                    styles.viewTypeButtonTextSelected,
                ]}
              >
                Banner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewTypeButton,
                selectedViewType === IterableEmbeddedViewType.Card &&
                  styles.viewTypeButtonSelected,
              ]}
              onPress={() => setSelectedViewType(IterableEmbeddedViewType.Card)}
            >
              <Text
                style={[
                  styles.viewTypeButtonText,
                  selectedViewType === IterableEmbeddedViewType.Card &&
                    styles.viewTypeButtonTextSelected,
                ]}
              >
                Card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewTypeButton,
                selectedViewType === IterableEmbeddedViewType.Notification &&
                  styles.viewTypeButtonSelected,
              ]}
              onPress={() =>
                setSelectedViewType(IterableEmbeddedViewType.Notification)
              }
            >
              <Text
                style={[
                  styles.viewTypeButtonText,
                  selectedViewType === IterableEmbeddedViewType.Notification &&
                    styles.viewTypeButtonTextSelected,
                ]}
              >
                Notification
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
            <IterableEmbeddedView
              key={message.metadata.messageId}
              viewType={selectedViewType}
              message={message}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Embedded;
