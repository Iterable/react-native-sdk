import { Iterable } from '@iterable/react-native-sdk';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './Embedded.styles';

export const Embedded = () => {
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
    </SafeAreaView>
  );
};

export default Embedded;
