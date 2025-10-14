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
  const [placementIds, setPlacementIds] = useState<number[]>([]);
  const [embeddedMessages, setEmbeddedMessages] = useState<
    IterableEmbeddedMessage[]
  >([]);
  const [selectedViewType, setSelectedViewType] =
    useState<IterableEmbeddedViewType>(IterableEmbeddedViewType.Banner);

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

  // const startEmbeddedImpression = useCallback(
  //   (message: IterableEmbeddedMessage) => {
  //     console.log(`startEmbeddedImpression`, message);
  //     Iterable.embeddedManager.startImpression(
  //       message.metadata.messageId,
  //       // TODO: check if this should be changed to a number, as per the type
  //       Number(message.metadata.placementId)
  //     );
  //   },
  //   []
  // );

  // const pauseEmbeddedImpression = useCallback(
  //   (message: IterableEmbeddedMessage) => {
  //     console.log(`pauseEmbeddedImpression:`, message);
  //     Iterable.embeddedManager.pauseImpression(message.metadata.messageId);
  //   },
  //   []
  // );

  // const handleClick = useCallback(
  //   (
  //     message: IterableEmbeddedMessage,
  //     buttonId: string | null,
  //     action?: IterableAction | null
  //   ) => {
  //     console.log(`handleClick:`, message);
  //     Iterable.embeddedManager.handleClick(message, buttonId, action);
  //   },
  //   []
  // );

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
        <TouchableOpacity style={styles.button} onPress={startEmbeddedSession}>
          <Text style={styles.buttonText}>Start session</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={endEmbeddedSession}>
          <Text style={styles.buttonText}>End session</Text>
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
