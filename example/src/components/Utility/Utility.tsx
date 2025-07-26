import { Iterable, RNIterableAPI } from '@iterable/react-native-sdk';
import { useEffect } from 'react';
import { NativeEventEmitter, Text, TouchableOpacity, View } from 'react-native';

import styles from './Utility.styles';

const newEmitter = new NativeEventEmitter(RNIterableAPI);

export const Utility = () => {
  useEffect(() => {
    console.log(`🚀 > RNIterableAPI:`, RNIterableAPI);

    const newSub = newEmitter.addListener('onTestEventDispatch', (event) => {
      console.log('*** ITBL JS *** RECEIVED onTestEventDispatch:', event);
    });
    return () => {
      newSub.remove();
    };
  }, []);

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
        <TouchableOpacity style={styles.button} onPress={() => {
            Iterable.setAttributionInfo({
              campaignId: 123,
              templateId: 456,
              messageId: '789',
            });
          }}>
          <Text style={styles.buttonText}>Iterable.setAttributionInfo()</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
            Iterable.disableDeviceForCurrentUser();
          }}>
          <Text style={styles.buttonText}>Iterable.disableDeviceForCurrentUser()</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
            Iterable.getLastPushPayload().then((lastPushPayload) => {
              console.log('Iterable.getLastPushPayload() --> lastPushPayload', lastPushPayload);
            });
          }}>
          <Text style={styles.buttonText}>Iterable.getLastPushPayload()</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
            console.log('*** ITBL JS *** SENDING testEventDispatch');
            RNIterableAPI.testEventDispatch();
          }}>
          <Text style={styles.buttonText}>dispatch test event</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Utility;
