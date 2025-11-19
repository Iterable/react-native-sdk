import { Text, TouchableOpacity } from 'react-native';
import { useCallback, useState } from 'react';
import { Iterable } from '@iterable/react-native-sdk';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './Embedded.styles';

export const Embedded = () => {
  const [placementIds, setPlacementIds] = useState<number[]>([]);
  const getPlacementIds = useCallback(() => {
    Iterable.embeddedManager.getPlacementIds().then((ids: unknown) => {
      console.log(ids);
      setPlacementIds(ids as number[]);
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>EMBEDDED</Text>
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
      <TouchableOpacity style={styles.button} onPress={getPlacementIds}>
        <Text style={styles.buttonText}>Get placement ids</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={startEmbeddedSession}>
        <Text style={styles.buttonText}>Start embedded session</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={endEmbeddedSession}>
        <Text style={styles.buttonText}>End embedded session</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Embedded;
