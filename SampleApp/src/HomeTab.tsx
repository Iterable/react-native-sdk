'use strict'

import React, {
  Component
} from 'react'
import {
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler'

const HomeStack = createStackNavigator();

function HomeTab() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
        data={[
          { key: "Cappuccino" },
          { key: "Mocha" },
          { key: "Black" },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={styles.details}>
      <Text>Details!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'  
  },
  list: {
    paddingTop: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  details: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default HomeTab
