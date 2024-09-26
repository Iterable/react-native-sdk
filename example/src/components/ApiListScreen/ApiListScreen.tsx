import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

import {
  IterableInAppCloseSource,
  IterableInAppDeleteSource,
  IterableInAppLocation,
  Iterable,
  IterableAttributionInfo,
  IterableCommerceItem,
} from '@iterable/react-native-sdk';

import styles from './ApiListScreen.styles';

export default function ApiListScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.body}>
            <Button
              title="Set Email"
              onPress={() => {
                Iterable.setEmail('megha.tiwari@iterable.com');
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Get Email"
              onPress={() => {
                Iterable.getEmail().then((email) => {
                  console.log('email: ' + email);
                });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Set UserId"
              onPress={() => {
                Iterable.setUserId('user001');
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Get UserId"
              onPress={() => {
                Iterable.getUserId().then((userId) => {
                  console.log('userId: ' + userId);
                });
              }}
            />
          </View>
          {/* TODO: This does not currently exist on the class.  Find out if it should. */}
          {/* <View style={styles.body}>
            <Button
              title="Register Device Token"
              onPress={() => {
                Iterable.registerDeviceToken();
              }}
            />
          </View> */}
          <View style={styles.body}>
            <Button
              title="Disable Device For Current User"
              onPress={() => {
                Iterable.disableDeviceForCurrentUser();
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Get Last Push Payload"
              onPress={() => {
                Iterable.getLastPushPayload().then((payload) => {
                  console.log('pushPayload: ' + JSON.stringify(payload));
                });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Set Attribution Info"
              onPress={() => {
                Iterable.setAttributionInfo(
                  new IterableAttributionInfo(123, 456, 'messageId')
                );
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Get Attribution Info"
              onPress={() => {
                Iterable.getAttributionInfo().then((attributionInfo) => {
                  console.log(
                    'attributionInfo: ' + JSON.stringify(attributionInfo)
                  );
                });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Track Push Open With CampaignId"
              onPress={() => {
                Iterable.trackPushOpenWithCampaignId(1234, 0, null, true, null);
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Track Purchase"
              onPress={() => {
                let items = [
                  new IterableCommerceItem('id1', 'item_name', 123.456, 789),
                  new IterableCommerceItem('id2', 'item_name_2', 1000, 1),
                  new IterableCommerceItem(
                    'id3',
                    'New Commerce Item',
                    299,
                    2,
                    'SKUString',
                    'This is the third test item',
                    'www.google.com',
                    'www.placekitten.com/300/400',
                    ['shopping', 'travel']
                  ),
                ];
                Iterable.trackPurchase(1000000, items, { name1: 'value1' });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Track In-App Open"
              onPress={() => {
                Iterable.inAppManager.getMessages().then((messages) => {
                  console.log('total messages: ' + messages.length);
                  if (messages && messages.length > 0) {
                    Iterable.trackInAppOpen(
                      messages[messages.length - 1],
                      IterableInAppLocation.inbox
                    );
                  }
                });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Track In-App Click"
              onPress={() => {
                Iterable.inAppManager.getMessages().then((messages) => {
                  console.log('total messages: ' + messages.length);
                  if (messages.length > 0) {
                    Iterable.trackInAppClick(
                      messages[messages.length - 1],
                      IterableInAppLocation.inbox,
                      'https://somewhere.com'
                    );
                  }
                });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Track In-App Close"
              onPress={() => {
                Iterable.inAppManager.getMessages().then((messages) => {
                  console.log('total messages: ' + messages.length);
                  if (messages.length > 0) {
                    Iterable.trackInAppClose(
                      messages[messages.length - 1],
                      IterableInAppLocation.inbox,
                      IterableInAppCloseSource.back,
                      'https://somewhere.com'
                    );
                  }
                });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="In-App Consume"
              onPress={() => {
                Iterable.inAppManager.getMessages().then((messages) => {
                  console.log('total messages: ' + messages.length);
                  if (messages.length > 0) {
                    Iterable.inAppConsume(
                      messages[messages.length - 1],
                      IterableInAppLocation.inbox,
                      IterableInAppDeleteSource.deleteButton
                    );
                  }
                });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Track Event"
              onPress={() => {
                Iterable.trackEvent('custom event', { field1: 'value1' });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Update User"
              onPress={() => {
                Iterable.updateUser({ field1: 'value1' }, false);
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Update Email"
              onPress={() => {
                Iterable.updateEmail('email@email.com');
              }}
            />
          </View>
          <View style={styles.body}>
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
          <View style={styles.body}>
            <Button
              title="Show In-App Message"
              onPress={() => {
                Iterable.inAppManager.getMessages().then((messages) => {
                  console.log('total messages: ' + messages.length);
                  if (messages.length > 0) {
                    Iterable.inAppManager
                      .showMessage(messages[messages.length - 1], false)
                      .then((url) => {
                        console.log('url: ' + url);
                      });
                  }
                });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Remove In-App Message"
              onPress={() => {
                Iterable.inAppManager.getMessages().then((messages) => {
                  console.log('total messages: ' + messages.length);
                  if (messages.length > 0) {
                    Iterable.inAppManager.removeMessage(
                      messages[messages.length - 1],
                      IterableInAppLocation.inbox,
                      IterableInAppDeleteSource.deleteButton
                    );
                  }
                });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Set Read for In-App Message"
              onPress={() => {
                Iterable.inAppManager.getMessages().then((messages) => {
                  console.log('total messages: ' + messages.length);
                  if (messages.length > 0) {
                    Iterable.inAppManager.setReadForMessage(
                      messages[messages.length - 1],
                      false
                    );
                  }
                });
              }}
            />
            <Button
              title="Track Event"
              onPress={() => {
                console.log('track event');
                Iterable.trackEvent('custom event', { field1: 'value1' });
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Update User"
              onPress={() => {
                console.log('update user');
                Iterable.updateUser({ field1: 'value1' }, false);
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Update Email"
              onPress={() => {
                console.log('update email');
                Iterable.updateEmail('email@email.com');
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Handle App Link"
              onPress={() => {
                console.log('handle app link');
                Iterable.handleAppLink('https://iterable.com/a/asdf');
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Update Subscriptions"
              onPress={() => {
                console.log('update subscriptions');
                Iterable.updateSubscriptions(
                  null,
                  [87, 49, 46],
                  [12, 45],
                  [84],
                  -1,
                  4
                );
              }}
            />
          </View>
          <View style={styles.body}>
            <Button
              title="Get In-App Content"
              onPress={() => {
                console.log('get in-app content');
                Iterable.inAppManager.getMessages().then((messages) => {
                  console.log('total messages: ' + messages.length);
                  if (messages.length > 0) {
                    Iterable.inAppManager
                      .getHtmlContentForMessage(messages[messages.length - 1])
                      .then((content) => {
                        console.log('content.html: ' + content.html);
                      });
                  }
                });
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
