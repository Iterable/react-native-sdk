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
import { Iterable } from 'react-native-iterable'

interface Props { }
interface State {
  email?: String
}

class SettingsTab extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
    this.updateState()
  }

  updateState() {
    console.log("updateState")
    Iterable.getEmail().then(email => {
      console.log("gotEmail: " + email)
      if (email) {
        this.setState((prevState, props) => { return { email: email } })
      } else {
        this.setState((prevState, props) => { return { email: undefined } })
      }
    })
  }

  render() {
    console.log("render")
    var userInfo
    if (this.state.email) {
      console.log("renderLoggedIn: " + this.state.email)
      userInfo = this.renderLoggedIn(this.state.email)
    } else {
      console.log("renderLoggedOut")
      userInfo = this.renderLoggedOut()
    }
    return (
      <View style={styles.container}>
        <Image source={require('../img/iterable-logo.png')} />
        {userInfo}
      </View>
    )
  }

  renderLoggedIn(email: String) {
    console.log("email: " + email)
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.emailText}>User: {email}</Text>
        <Button
          title="Logout"
          onPress={this.onLogoutTapped}
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
    console.log("onLoginTapped")
    Iterable.setEmail("tapash@iterable.com")
    this.updateState()
  }

  onLogoutTapped = () => {
    console.log("onLogoutTapped")
    Iterable.setEmail(null)
    this.updateState()
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
  emailText: {
    marginLeft: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})

export default SettingsTab