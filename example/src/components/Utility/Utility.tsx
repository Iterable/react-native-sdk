import { Iterable } from '@iterable/react-native-sdk';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './Utility.styles';

export const Utility = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Utility</Text>
      <TouchableOpacity style={styles.button} onPress={() => {
          Iterable.getEmail().then((email) => {
            console.log('Iterable.getEmail() --> email', email);
          });
        }}>
        <Text style={styles.buttonText}>Iterable.getEmail()</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Utility;
