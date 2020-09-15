/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NativeModules, Alert } from 'react-native'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {
  Iterable,
  IterableConfig,
  IterableAction,
  IterableActionContext,
  IterableInAppMessage,
  IterableInAppShowResponse,
  IterableInAppLocation,
  IterableInAppDeleteSource,
} from '@iterable/react-native-sdk';

import { iterableAPIKey, sendInAppCampaignId, skipInAppCampaignId, openDeepLinkCampaignId, openSafariCampaignId, customActionCampaignId } from './Config'

var TestBridge = NativeModules.IterableTestBridge;

const RNE2E = NativeModules.RNE2E;

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
         
          <View style={styles.body}>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Iterable RN Test</Text>

            </View>
{/* ------------------------------------------------------------ */}
            <Button style={styles.buttonStyle}
              onPress={() => Alert.alert(
                   'Alert Title',
                   'My Alert Msg',
                   [
                    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                     {text: 'OK', onPress: () => console.log('OK Pressed')},
                   ]
                 )}
              title="Show Sample Alert"
              color="#841584" />
{/* ------------------------------------------------------------ */}
            <Button
              onPress={initialize}
              title="Initialize Iterable API"
              color="#231567"/>
{/* ------------------------------------------------------------ */}
            <Button
              onPress={() => {
                Iterable.setEmail("akshay.ayyanchira@iterable.com")
                Iterable.getEmail().then(email => {
                  console.log("gotEmail: " + email)
                })
              }}
              title="Set Email to Akshay"
              color="#274567"/>
{/* ------------------------------------------------------------ */}
            <Button
              onPress={sayHiFromJava}
              title="Call Java Function"/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


const sayHiFromJava = () => {
  console.log('Attempting to call a java method')
  TestBridge.sayHi( (err) => {console.log(err)}, (msg) => {console.log(msg)
  Alert.alert(msg)} );
}

const initialize = () => {
  console.log('Initializing..')
  const config = new IterableConfig()
  config.inAppDisplayInterval = 1.0
  Iterable.initialize(iterableAPIKey, config);
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.yellow,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  buttonStyle: {
    color: 'red',
    marginTop: 30,
    padding: 50,
    borderRadius: 30,
    backgroundColor: 'green'
}
});

export default App;
