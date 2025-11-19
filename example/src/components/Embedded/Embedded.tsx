import { Text, View } from 'react-native';

import styles from './Embedded.styles';

export const Embedded = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EMBEDDED</Text>
    </View>
  );
};

export default Embedded;
