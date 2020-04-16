'use strict'

import React from 'react'
import {
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Details!</Text>
    </View>
  );
}


function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const SettingsStack = createStackNavigator();

function SettingsTab() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'  
  },
})

export default SettingsTab