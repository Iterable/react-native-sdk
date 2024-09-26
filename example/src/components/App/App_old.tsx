import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { type InboxRowViewModel, IterableInbox } from '@iterable/react-native-sdk';

import ApiListScreen from '../ApiListScreen';
import Home from '../Home';
import Settings from '../Settings';
import useDeviceOrientation from '../useDeviceOrientation';

// @ts-ignore
const MessageListItemLayout = (last: boolean, rowViewModel: InboxRowViewModel) => {
  const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title;
  const messageBody = rowViewModel.inAppMessage.inboxMetadata?.subtitle;
  const messageCreatedAt = rowViewModel.createdAt;

  let styles = StyleSheet.create({
    unreadIndicatorContainer: {
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },

    unreadIndicator: {
      width: 15,
      height: 15,
      borderRadius: 15 / 2,
      backgroundColor: 'blue',
      marginLeft: 10,
      marginRight: 5,
      marginTop: 7,
    },

    unreadMessageContainer: {
      paddingLeft: 5,
    },

    readMessageContainer: {
      paddingLeft: 30,
    },

    title: {
      fontSize: 22,
      paddingBottom: 10,
    },

    body: {
      fontSize: 15,
      color: 'lightgray',
      paddingBottom: 10,
    },

    createdAt: {
      fontSize: 12,
      color: 'lightgray',
    },

    messageRow: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      width: '100%',
      height: 100,
      borderStyle: 'solid',
      borderColor: 'black',
      borderTopWidth: 1,
    },
  });

  const {
    unreadIndicatorContainer,
    unreadIndicator,
    unreadMessageContainer,
    readMessageContainer,
    title,
    body,
    createdAt,
    messageRow,
  } = styles;

  function messageRowStyle(_rowViewModel: InboxRowViewModel) {
    return last ? { ...messageRow, borderBottomWidth: 1 } : messageRow;
  }

  return [
    <View style={messageRowStyle(rowViewModel)}>
      <View style={unreadIndicatorContainer}>
        {rowViewModel.read ? null : <View style={unreadIndicator} />}
      </View>
      <View style={rowViewModel.read ? readMessageContainer : unreadMessageContainer}>
        <Text style={title}>{messageTitle}</Text>
        <Text style={body}>{messageBody}</Text>
        <Text style={createdAt}>{messageCreatedAt as unknown as string}</Text>
      </View>
    </View>,
    styles.messageRow.height,
  ];
};

const iterableInboxCustomization = {
  navTitle: 'Iterable',
  noMessagesTitle: 'No messages today',
  noMessagesBody: 'Come back later',

  unreadIndicatorContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  unreadIndicator: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: 'orange',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },

  unreadMessageIconContainer: {
    paddingLeft: 0,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  readMessageIconContainer: {
    paddingLeft: 35,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  messageContainer: {
    paddingLeft: 10,
    width: '65%',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    paddingBottom: 10,
  },

  body: {
    fontSize: 15,
    color: 'lightgray',
    width: '65%',
    flexWrap: 'wrap',
    paddingBottom: 10,
  },

  createdAt: {
    fontSize: 12,
    color: 'lightgray',
  },

  messageRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    height: 200,
    borderStyle: 'solid',
    borderColor: 'red',
    borderTopWidth: 1,
  },
};

export default function App() {
  const Tab = createBottomTabNavigator();
  let { isPortrait } = useDeviceOrientation();
  const [returnToInboxTrigger, setReturnToInboxTrigger] = useState<boolean>(false);
  const [isInboxTab, setIsInboxTab] = useState<boolean>(false);

  let tabBarHeight = isPortrait ? 80 : 50;
  let tabBarPadding = 20;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name == 'Home') {
              return <Icon name="home" size={size} color={color} />;
            } else if (route.name == 'ApiList') {
              return <Icon name="server" size={size} color={color} />;
            } else if (route.name == 'Inbox 1') {
              return <Icon name="mail" size={size} color={color} />;
            } else if (route.name == 'Inbox 2') {
              return <Icon name="mail" size={size} color={color} />;
            } else {
              return <Icon name="settings-sharp" size={size} color={color} />;
            }
          },
        })}
        // @ts-ignore
        tabBarOptions={{
          style: {
            height: tabBarHeight,
            paddingBottom: tabBarPadding,
          },
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          // @ts-ignore
          listeners={({ navigation, route }) => ({
            tabPress: (_e) => {
              setIsInboxTab(false);
            },
          })}
        />
        <Tab.Screen
          name="ApiList"
          component={ApiListScreen}
          // @ts-ignore
          listeners={({ navigation, route }) => ({
            tabPress: (_e) => {
              setIsInboxTab(false);
            },
          })}
        />
        <Tab.Screen
          name="Inbox 1"
          // @ts-ignore
          listeners={({ navigation, route }) => ({
            tabPress: (_e) => {
              if (isInboxTab) {
                setReturnToInboxTrigger(!returnToInboxTrigger);
              }
              setIsInboxTab(true);
            },
          })}
        >
          {() => <IterableInbox returnToInboxTrigger={returnToInboxTrigger} />}
        </Tab.Screen>
        <Tab.Screen
          name="Inbox 2"
          // @ts-ignore
          listeners={({ navigation, route }) => ({
            tabPress: (_e) => {
              if (isInboxTab) {
                setReturnToInboxTrigger(!returnToInboxTrigger);
              }
              setIsInboxTab(true);
            },
          })}
        >
          {() => (
            <IterableInbox
              returnToInboxTrigger={returnToInboxTrigger}
              customizations={iterableInboxCustomization}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Settings"
          component={Settings}
          // @ts-ignore
          listeners={({ navigation, route }) => ({
            tabPress: (_e) => {
              setIsInboxTab(false);
            },
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
