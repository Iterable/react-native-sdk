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
import { Iterable } from '@iterable/react-native-sdk'

interface Props { }
interface State {
  email?: string
  isLoggedIn: boolean
}
class SettingsTab extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { isLoggedIn: false }
    this.updateState()
  }

  render() {
    var userInfo
    if (this.state.isLoggedIn) {
      userInfo = this.renderLoggedIn(this.state.email!)
    } else {
      userInfo = this.renderLoggedOut()
    }
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Image resizeMode="contain" style={styles.image} source={require('../img/iterable-logo.png')} />
          {userInfo}
        </View>
      </View>
    )
  }

  private renderLoggedIn(email: String) {
    console.log(`renderLoggedIn, email: ${email}`)
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

  private renderLoggedOut() {
    console.log("renderLoggedOut")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return (
      <View style={styles.emailContainer}>
        <TextInput
          value={this.state.email}
          style={styles.emailTextInput}
          autoCapitalize="none"
          autoCompleteType= {emailRegex.test(this.state.email) ? "email" : "none"}
          onChangeText={(text) => this.setState({ isLoggedIn: false, email: text })}
          placeholder="user@example.com/userId" />
        <Button
          title="Login"
          onPress={this.onLoginTapped}
        />
      </View>
    )
  }

  private onLoginTapped = () => {
    console.log("onLoginTapped")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(this.state.email)) {
      Iterable.setEmail(this.state.email)
    } else{
      Iterable.setUserId(this.state.email)
    }
    this.updateState()
  }

  private onLogoutTapped = () => {
    console.log("onLogoutTapped")
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.state.email)) {
      Iterable.setEmail(undefined)
    } else {
      Iterable.setUserId(undefined)
    }
    this.updateState()
  }

  private updateState() {
    Iterable.getEmail().then(email => {
      console.log("gotEmail: " + email)
      if (email) {
        this.setState({ isLoggedIn: true, email: email })
      } else {
        Iterable.getUserId().then(userId => {
          console.log("gotUserId: " + userId)
          if (userId) {
            this.setState({ isLoggedIn: true, email: userId })
          } else {
            this.setState({ isLoggedIn: false, email: undefined })
          }
        })
      }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  upperContainer: {
    marginTop: 25,
    height: 300,
    backgroundColor: 'white',
  },
  image: {
    width: 275,
    height: 150,
  },
  emailContainer: {
    flexDirection: "row",
    marginTop: 25,
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
    fontSize: 18,
  },
})

export default SettingsTab