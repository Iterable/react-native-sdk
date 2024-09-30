import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  NativeModules,
} from 'react-native';

import {
  Iterable,
  IterableConfig,
  IterableAction,
  IterableActionContext,
  IterableInAppShowResponse,
  IterableInAppLocation,
  IterableInAppDeleteSource,
  IterableInAppMessage,
} from '@iterable/react-native-sdk';

import { Login } from './Login';

// Consts
import {
  iterableAPIKey,
  sendInAppCampaignId,
  skipInAppCampaignId,
  openDeepLinkCampaignId,
  openSafariCampaignId,
  customActionCampaignId,
} from './Config';

const RNE2E = NativeModules.RNE2E;

interface State {
  statusText?: string;
}
export default class App extends React.Component<Object, State> {
  constructor(props: Object) {
    super(props);
    this.state = { statusText: '' };
    this.initializeIterable();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.buttonContainer}>
            <Login />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              testID="sendInAppBtn"
              title="Send In-App"
              onPress={() => {
                RNE2E.sendCommand('send-in-app', {
                  campaignId: sendInAppCampaignId,
                });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              testID="skipInAppBtn"
              title="Skip In-App"
              onPress={() => {
                RNE2E.sendCommand('send-in-app', {
                  campaignId: skipInAppCampaignId,
                });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              testID="customActionBtn"
              title="Custom Action"
              onPress={() => {
                RNE2E.sendCommand('send-in-app', {
                  campaignId: customActionCampaignId,
                });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              testID="openDeepLinkBtn"
              title="Url Delegate Open Deep Link"
              onPress={() => {
                RNE2E.sendCommand('send-in-app', {
                  campaignId: openDeepLinkCampaignId,
                });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              testID="openSafariBtn"
              title="Url Delegate Open Safari"
              onPress={() => {
                RNE2E.sendCommand('send-in-app', {
                  campaignId: openSafariCampaignId,
                });
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Get In-app Messages"
              onPress={() => {
                Iterable.inAppManager.getMessages().then((messages) => {
                  console.log('messages: ' + messages.length);
                  messages.forEach((message) => {
                    console.log(JSON.stringify(message, null, 2));
                  });
                });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Remove In-App Message"
              onPress={() => {
                Iterable.inAppManager.getMessages().then((messages) => {
                  console.log('total messages: ' + messages.length);
                  if (messages.length > 0) {
                    Iterable.inAppManager.removeMessage(
                      // @ts-ignore
                      messages[messages.length - 1],
                      IterableInAppLocation.inbox,
                      IterableInAppDeleteSource.deleteButton
                    );
                  }
                });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              testID="clearAllInApps"
              title="Clear All In-App Messages"
              onPress={() => {
                console.log('clearAllInApps');
                // @ts-ignore
                RNE2E.clearAllInAppMessages().then((success) => {
                  console.log('cleared all in-app messages: ' + success);
                  this.setState({ statusText: 'Cleared all in-apps' });
                });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              testID="resetBtn"
              title="Reset"
              onPress={() => {
                console.log('reset');
                this.setState({ statusText: '' });
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.textContainer}>
          <Text testID="statusText" style={styles.statusText}>
            {this.state.statusText}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  initializeIterable() {
    const config = new IterableConfig();
    config.inAppDisplayInterval = 1.0;
    config.urlHandler = (url: string, _context: IterableActionContext) => {
      console.log('urlHandler: url: ' + url);
      // eslint-disable-next-line eqeqeq
      if (url.search(/coffee/i) == -1) {
        this.setState({ statusText: `Opening url: '${url}'` });
        return false;
      } else {
        // @ts-ignore
        const coffee = url.match(/coffee\/(.+)/)[1];
        this.setState({ statusText: `Opening coffee page: '${coffee}'` });
        return true;
      }
    };
    config.customActionHandler = (
      action: IterableAction,
      _context: IterableActionContext
    ) => {
      this.setState({ statusText: `Custom Action: '${action.type}'` });
      return true;
    };
    config.inAppHandler = (message: IterableInAppMessage) => {
      if (App.readBoolean(message.customPayload, 'hide')) {
        this.setState({ statusText: 'Skipping in-app' });
        return IterableInAppShowResponse.skip;
      } else {
        this.setState({ statusText: 'Showing in-app' });
        return IterableInAppShowResponse.show;
      }
    };

    RNE2E.setApiKey(iterableAPIKey);
    Iterable.initialize(iterableAPIKey, config);
  }

  static readBoolean(dict: any, key: string): boolean {
    if (dict[key]) {
      return dict[key] as boolean;
    } else {
      return false;
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
    color: '#DDDDDD',
  },
});
