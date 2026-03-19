import { useIsFocused } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  EmbeddedSessionManager,
  Iterable,
  IterableEmbeddedView,
  IterableEmbeddedViewType,
  type IterableEmbeddedMessage,
  type IterableEmbeddedViewConfig,
} from '@iterable/react-native-sdk';

import styles from './Embedded.styles';

const DEFAULT_CONFIG_JSON = `{
}`;

export const Embedded = () => {
  const isFocused = useIsFocused();
  const [placementIdsInput, setPlacementIdsInput] = useState<string>('');
  const [embeddedMessages, setEmbeddedMessages] = useState<
    IterableEmbeddedMessage[]
  >([]);
  const [selectedViewType, setSelectedViewType] =
    useState<IterableEmbeddedViewType>(IterableEmbeddedViewType.Banner);
  const [viewConfig, setViewConfig] =
    useState<IterableEmbeddedViewConfig | null>(null);
  const [configEditorVisible, setConfigEditorVisible] = useState(false);
  const [configJson, setConfigJson] = useState(DEFAULT_CONFIG_JSON);

  // Parse placement IDs from input
  const parsedPlacementIds = placementIdsInput
    .split(',')
    .map((id) => id.trim())
    .filter((id) => id !== '')
    .map((id) => parseInt(id, 10))
    .filter((id) => !isNaN(id));

  const idsToFetch = parsedPlacementIds.length > 0 ? parsedPlacementIds : null;

  const getEmbeddedMessages = useCallback(() => {
    Iterable.embeddedManager
      .getMessages(idsToFetch)
      .then((messages: IterableEmbeddedMessage[]) => {
        setEmbeddedMessages(messages);
        console.log(messages);
      });
  }, [idsToFetch]);

  const openConfigEditor = useCallback(() => {
    setConfigJson(
      viewConfig ? JSON.stringify(viewConfig, null, 2) : DEFAULT_CONFIG_JSON
    );
    setConfigEditorVisible(true);
  }, [viewConfig]);

  const applyConfig = useCallback(() => {
    try {
      const parsed = JSON.parse(configJson) as IterableEmbeddedViewConfig;
      setViewConfig(parsed);
      setConfigEditorVisible(false);
    } catch {
      Alert.alert('Error', 'Invalid JSON');
    }
  }, [configJson]);

  const closeConfigEditor = useCallback(() => {
    setConfigEditorVisible(false);
  }, []);

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
        <TouchableOpacity style={styles.button} onPress={openConfigEditor}>
          <Text style={styles.buttonText}>Set view config</Text>
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
      <Modal
        visible={configEditorVisible}
        animationType="slide"
        transparent
        onRequestClose={closeConfigEditor}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.jsonEditor}
              value={configJson}
              onChangeText={setConfigJson}
              multiline
              textAlignVertical="top"
              placeholder={DEFAULT_CONFIG_JSON}
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={closeConfigEditor}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={applyConfig}
              >
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.hr} />
      <EmbeddedSessionManager isActive={isFocused}>
        <ScrollView>
          {embeddedMessages.map((message) => (
            <View style={styles.embeddedItem} key={message.metadata.messageId}>
              <IterableEmbeddedView
                viewType={selectedViewType}
                message={message}
                config={viewConfig}
              />
            </View>
          ))}
        </ScrollView>
      </EmbeddedSessionManager>
    </SafeAreaView>
  );
};

export default Embedded;
