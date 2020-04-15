'use strict';

import React, {
  Component,
} from 'react';

import {
  Text,
  View,
  Image,
  Switch,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import styles from './../Styles';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image
            style={{ width: 298, height: 68, marginTop: 75, alignItems: 'center' }}
            source={require('./../img/iterable-logo.png')}
          />
        </ScrollView>
      </View>
    );
  }
}

