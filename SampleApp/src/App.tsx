import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import {Iterable, IterableConfig} from 'react-native-iterable'

import HomeTab from './HomeTab'
import SettingsTab from './SettingsTab'

// ITERABLE:
const apiKey = "9db32a2d72b9476196cbca44d580a05e"

export interface Props {}
export default class App extends React.Component {
  constructor(props: Props) {
    super(props)
    // ITERABLE:
    const config = new IterableConfig()
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
          <Tab.Screen name="Home" component={HomeTab} />
          <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}