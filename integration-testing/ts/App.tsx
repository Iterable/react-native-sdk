import { NativeModules, NativeEventEmitter, Linking } from 'react-native'
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
} from 'react-native';

import {
  Iterable,
  IterableConfig,
  PushServicePlatform,
  IterableAction,
  IterableActionContext,
  IterableInAppMessage,
  IterableInAppShowResponse,
  IterableInAppLocation,
  IterableInAppCloseSource,
  IterableInAppDeleteSource,
} from '@iterable/react-native-sdk';

import { Login } from './Login'

// Consts
import { iterableAPIKey, sendInAppCampaignId, skipInAppCampaignId } from './Config'

const RNE2E = NativeModules.RNE2E

interface State {
  statusText?: string
}
export default class App extends React.Component<Object, State> {
  constructor(props) {
    super(props)
    this.state = { statusText: "" }
    this.initializeIterable()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.buttonContainer}>
            <Login />
          </View>
          <View style={styles.buttonContainer}>
            <Button testID='sendInAppBtn' title="Send In-App" onPress={() => {
              RNE2E.sendCommand("send-in-app", { campaignId: sendInAppCampaignId })
            }} />
          </View>
          <View style={styles.buttonContainer}>
            <Button testID='skipInAppBtn' title="Skip In-App" onPress={() => {
              RNE2E.sendCommand("send-in-app", { campaignId: skipInAppCampaignId })
            }} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Track In-App Open" onPress={() => {
              Iterable.inAppManager.getMessages().then(messages => {
                console.log("total messages: " + messages.length)
                if (messages.length > 0) {
                  Iterable.trackInAppOpen(messages[messages.length - 1], IterableInAppLocation.inbox)
                }
              })
            }} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Track In-App Click" onPress={() => {
              Iterable.inAppManager.getMessages().then(messages => {
                console.log("total messages: " + messages.length)
                if (messages.length > 0) {
                  Iterable.trackInAppClick(messages[messages.length - 1], IterableInAppLocation.inbox, "https://somewhere.com")
                }
              })
            }} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Track In-App Close" onPress={() => {
              Iterable.inAppManager.getMessages().then(messages => {
                console.log("total messages: " + messages.length)
                if (messages.length > 0) {
                  Iterable.trackInAppClose(messages[messages.length - 1], IterableInAppLocation.inbox, IterableInAppCloseSource.back, "https://somewhere.com")
                }
              })
            }} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="In-App Consume" onPress={() => {
              Iterable.inAppManager.getMessages().then(messages => {
                console.log("total messages: " + messages.length)
                if (messages.length > 0) {
                  Iterable.inAppConsume(messages[messages.length - 1], IterableInAppLocation.inbox, IterableInAppDeleteSource.deleteButton)
                }
              })
            }} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Track Event" onPress={() => {
              this.setState({ statusText: "Changed text" })
            }} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Get In-app Messages" onPress={() => {
              Iterable.inAppManager.getMessages().then(messages => {
                console.log("messages: " + messages.length)
                messages.forEach(message => {
                  console.log(JSON.stringify(message, null, 2))
                })
              })
            }} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Show In-App Message" onPress={() => {
              Iterable.inAppManager.getMessages().then(messages => {
                console.log("total messages: " + messages.length)
                if (messages.length > 0) {
                  Iterable.inAppManager.showMessage(messages[messages.length - 1], false).then(url => {
                    console.log("url: " + url)
                  })
                }
              })
            }} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Remove In-App Message" onPress={() => {
              Iterable.inAppManager.getMessages().then(messages => {
                console.log("total messages: " + messages.length)
                if (messages.length > 0) {
                  Iterable.inAppManager.removeMessage(messages[messages.length - 1], IterableInAppLocation.inbox, IterableInAppDeleteSource.deleteButton)
                }
              })
            }} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Handle Universal Link" onPress={() => {
              console.log("handle universal link")
              Iterable.handleUniversalLink("https://iterable.com/a/asdf")
            }} />
          </View>
        </ScrollView>
        <View style={styles.textContainer}>
          <Text testID='statusText' style={styles.statusText}>{this.state.statusText}</Text>
        </View>
      </SafeAreaView>
    )
  }

  initializeIterable() {
    const config = new IterableConfig()
    config.pushPlatform = PushServicePlatform.auto
    config.inAppDisplayInterval = 1.0
    config.urlDelegate = (url: string, context: IterableActionContext) => {
      console.log("urlDelegate: url: " + url)
      if (url.search(/coffee/i) == -1) {
        return false
      } else {
        this.setState({ statusText: "Url Delegate, opening coffee page, url: " + url })
        return true
      }
    }
    config.customActionDelegate = (action: IterableAction, context: IterableActionContext) => {
      this.setState({ statusText: "Custom Action Delegate, actionType: " + action.type })
      return true
    }
    config.inAppDelegate = (message: IterableInAppMessage) => {
      if (App.readBoolean(message.customPayload, "hide")) {
        this.setState({ statusText: "Skipping in-app" })
        return IterableInAppShowResponse.skip
      }
      this.setState({ statusText: "Showing in-app" })
      return IterableInAppShowResponse.show
    }

    RNE2E.setApiKey(iterableAPIKey)
    Iterable.initialize(iterableAPIKey, config);
  }

  static readBoolean(dict: any, key: string): boolean {
    if (dict[key]) {
      return dict[key] as boolean
    } else {
      return false
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#777777',
  },
  colors: {
    backgroundColor: '#F5FCFF',
  },
  statusText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    padding: 10,
    fontSize: 18,
    color: '#DDDDDD'
  },
});

