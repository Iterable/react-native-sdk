/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Iterable, IterableConfig } from '@iterable/react-native-sdk';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: undefined
    };
    const config = new IterableConfig();
    config.inAppDisplayInterval = 1.0; // Min gap between in-apps. No need to set this in production.
    config.urlDelegate = this.urlDelegate;
    Iterable.initialize("iterableAPIKey", config);
    Iterable.setEmail("user@example.com");
  }
  render() {
    if (this.state.greeting) return this.renderAfterButton();
    return (
      <View testID='welcome' style={{ flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25, marginBottom: 30 }}>
          Welcome
        </Text>
        <TouchableOpacity testID='hello_button' onPress={this.onButtonPress.bind(this, 'Hello')}>
          <Text style={{ color: 'blue', marginBottom: 20 }}>Say Hello</Text>
        </TouchableOpacity>
        <TouchableOpacity testID='world_button' onPress={this.onButtonPress.bind(this, 'World')}>
          <Text style={{ color: 'blue', marginBottom: 20 }}>Say World</Text>
        </TouchableOpacity>
        <TouchableOpacity testID='goodbye_button' onPress={this.onButtonPress.bind(this, 'Goodbye, World')}>
          <Text style={{ color: 'blue', marginTop: 50, marginBottom: 20 }}>Say Goodbye</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderAfterButton() {
    return (
      <View style={{ flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25 }}>
          {this.state.greeting}!!!
        </Text>
      </View>
    );
  }
  onButtonPress(greeting) {
    this.setState({
      greeting: greeting
    });
  }
}

AppRegistry.registerComponent('example', () => example);
