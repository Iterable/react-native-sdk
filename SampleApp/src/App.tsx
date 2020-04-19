import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Alert,
} from 'react-native';

import HomeTab from './HomeTab'
import SettingsTab from './SettingsTab'
import { Coffee, coffees } from './Data'
import {
  Iterable,
  IterableConfig,
  IterableAction,
  IterableActionContext,
  IterableInAppMessage,
  IterableInAppShowResponse,
} from 'react-native-iterable';

// ITERABLE:
// Replace with your Iterable apiKey
const apiKey = "9db32a2d72b9476196cbca44d580a05e"

interface Props { }
export default class App extends React.Component {
  constructor(props: Props) {
    super(props)
    this.homeTabRef = React.createRef()

    // ITERABLE:
    const config = new IterableConfig()
    config.inAppDisplayInterval = 1.0
    config.urlDelegate = this.urlDelegate
    config.customActionDelegate = (action: IterableAction, context: IterableActionContext) => {
      Alert.alert("Custom Action Delegate", "actionType: " + action.type)
      return true
    }
    config.inAppDelegate = (message: IterableInAppMessage) => {
      return IterableInAppShowResponse.show
    }
    Iterable.initialize(apiKey, config)
  }

  render() {
    const Tab = createBottomTabNavigator();

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name == 'Home') {
                return <Icon name="ios-home" size={size} color={color} />
              } else {
                return <Icon name="ios-settings" size={size} color={color} />
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showIcon: true,
          }}
        >
          <Tab.Screen name="Home" options={{ title: "Coffees" }}>
            {props => <HomeTab ref={this.homeTabRef} {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

  private homeTabRef: any

  private navigate(coffee: Coffee) {
    this.homeTabRef.current.navigate(coffee)
  }

  // ITERABLE:
  private urlDelegate = (url: String, context: IterableActionContext): Boolean => {
    console.log(`urlDelegate, url: ${url}`)
    let match = url.match(/coffee\/([^\/]+)/i)
    if (match) {
      this.navigate(coffees[2])
      return true
    } else {
      console.log("opening external url")
      return false
    }
  }
}
