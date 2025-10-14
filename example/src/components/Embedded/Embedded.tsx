import { Text, View } from 'react-native';
import { Iterable } from '@iterable/react-native-sdk';

import styles from './Embedded.styles';

export const Embedded = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EMBEDDED</Text>
      <Text style={styles.text}>
        Does embedded class exist? {Iterable.embeddedManager ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.text}>
        Is embedded manager enabled?{' '}
        {Iterable.embeddedManager.isEnabled ? 'Yes' : 'No'}
      </Text>
    </View>
  );
};

export default Embedded;
