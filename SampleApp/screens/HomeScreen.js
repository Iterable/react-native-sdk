'use strict'

import React, {
  Component,
} from 'react'

import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native'

import {
  StyleSheet,
} from 'react-native';

import { FlatList } from 'react-native-gesture-handler'

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <SafeAreaView>
          <FlatList style={styles.list}
            data={[
              {key: "Cappuccino"},
              {key: "Mocha"},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
   paddingTop: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

