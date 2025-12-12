import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useState } from 'react';
import {
  Iterable,
  // type IterableAction,
  type IterableEmbeddedMessage,
  IterableEmbeddedView,
  IterableEmbeddedViewType,
} from '@iterable/react-native-sdk';

import styles from './Embedded.styles';

export const Embedded = () => {
  const [placementIds] = useState<number[]>([10, 2112]);
  const [embeddedMessages, setEmbeddedMessages] = useState<
    IterableEmbeddedMessage[]
  >([]);
  const [selectedViewType, setSelectedViewType] =
    useState<IterableEmbeddedViewType>(IterableEmbeddedViewType.Card);

  const syncEmbeddedMessages = useCallback(() => {
    Iterable.embeddedManager.syncMessages();
  }, []);

  const getPlacementIds = useCallback(() => {
    // return Iterable.embeddedManager.getPlacementIds().then((ids: unknown) => {
    //   console.log(ids);
    //   setPlacementIds(ids as number[]);
    //   return ids;
    // });
  }, []);

  const getEmbeddedMessages = useCallback(() => {
    Iterable.embeddedManager
      .getMessages(placementIds)
      .then((messages: IterableEmbeddedMessage[]) => {
        setEmbeddedMessages(messages);
        console.log(messages);
      });
    // getPlacementIds()
    //   .then((ids: number[]) => Iterable.embeddedManager.getMessages(ids))
    //   .then((messages: IterableEmbeddedMessage[]) => {
    //     setEmbeddedMessages(messages);
    //     console.log(messages);
    //   });
  }, [placementIds]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>EMBEDDED</Text>
      <View style={styles.utilitySection}>
        <Text style={styles.text}>
          Placement ids: [{placementIds.join(', ')}]
        </Text>
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
        <TouchableOpacity style={styles.button} onPress={getPlacementIds}>
          <Text style={styles.buttonText}>Get placement ids</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getEmbeddedMessages}>
          <Text style={styles.buttonText}>Get messages</Text>
        </TouchableOpacity>
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
    </View>
  );
};

export default Embedded;
