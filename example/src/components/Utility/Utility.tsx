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
        <Text style={styles.buttonText}>Iterable.getEmail()aeff</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
          Iterable.getUserId().then((userId) => {
            console.log('Iterable.getUserId() --> userId', userId);
          });
        }}>
        <Text style={styles.buttonText}>Iterable.getUserId()</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
          Iterable.getAttributionInfo().then((attributionInfo) => {
            console.log('Iterable.getAttributionInfo() --> attributionInfo', attributionInfo);
          });
        }}>
        <Text style={styles.buttonText}>Iterable.getAttributionInfo()</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Utility;
