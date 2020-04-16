'use strict'

import React, {
  Component
} from 'react'
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

interface Props {}
interface State {
  isLoggedIn: boolean
}

class SettingsTab extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {isLoggedIn: false}
  }

  render() {
    if (this.state.isLoggedIn == true) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {
    return (
      <View style={styles.emailContainer}>
        <Text>Hello, World</Text>
        <TextInput 
          style={styles.emailTextInput} 
          autoCapitalize="none" 
          autoCompleteType="email"
          placeholder="user@example.com" />
        <Button
          title="Login"
          onPress={() => {this.setState({isLoggedIn: false})}}
        />
      </View>
   ) 
  }

  renderLoggedOut() {
    return (
      <View style={styles.emailContainer}>
        <TextInput 
          style={styles.emailTextInput} 
          autoCapitalize="none" 
          autoCompleteType="email"
          placeholder="user@example.com" />
        <Button
          title="Login"
          onPress={this.onLoginTapped}
        />
      </View>
    )
  }

  onLoginTapped = () => {
    this.setState({isLoggedIn: true})
  }
}

const styles = StyleSheet.create({
  emailContainer: {
    flexDirection: "row",
    marginTop: 250,
  },
  emailTextInput: {
    marginLeft: 10,
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: 250,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default SettingsTab