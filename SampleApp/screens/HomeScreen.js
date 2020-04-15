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

import styles from './../Styles'

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image
            style={{ width: 298, height: 68, marginTop: 75, alignItems: 'center' }}
            source={require('./../img/iterable-logo.png')}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
