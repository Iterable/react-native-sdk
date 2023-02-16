import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeTab from './HomeTab'
import SettingsTab from './SettingsTab'
import { coffees } from './Data'

// Step 1:
// Import the Iterable and IterableConfig class.
// Refer to "Installing Iterable's React Native SDK" of the developer guide.
// (https://support.iterable.com/hc/en-us/articles/360045714132-Installing-Iterable-s-React-Native-SDK-#step-5-import-iterable-sdk-classes-wherever-needed)

import { Iterable, IterableConfig } from '@iterable/react-native-sdk'

// Step 2:
// Create a Config.js and add your apiKey as "iterableAPIKey".
// Refer to "Creating API Keys" under "API Keys" of the developer guide
// to create an API key for your Iterable project.
// (https://support.iterable.com/hc/en-us/articles/360043464871#creating-api-keys)

import { iterableAPIKey } from './Config'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.homeTabRef = React.createRef()

    // Step 3: Initialize the React Native SDK here.
    // Create an IterableConfig object with various properties set.
    // The config object is used to customize various features of the SDK such as the URL handler and custom action handler.
    // If a config object is not defined, the React Native SDK defaults to the default configuration.

    // The IterableConfig.js file is linked to the documentation.
    // Refer to Step 6 of "Installing Iterable's React Native SDK" of the developer guide.
    // (https://support.iterable.com/hc/en-us/articles/360045714132-Installing-Iterable-s-React-Native-SDK-#step-6-initialize-iterable-s-react-native-sdk)

    // Below is a sample implementation of the config object where we set the urlHAndler and inAppDisplayInterval

    const config = new IterableConfig()

    // inAppDisplayInterval sets the number of seconds to wait between displaying multiple in-app messages in sequence
    config.inAppDisplayInterval = 1.0

    // urlHandler is set up here to handle deep link URLs and in-app message buttons and link URLs
    config.urlHandler = this.urlHandler

    // Initialize by calling the Iterable.initialize method passing in your API key and the optional config object.
    Iterable.initialize(iterableAPIKey, config)
  }

  render () {
    const Tab = createBottomTabNavigator()
    return (React.createElement(NavigationContainer, null,
      React.createElement(Tab.Navigator, {
        screenOptions: ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return React.createElement(Icon, { name: 'ios-home', size, color })
            } else {
              return React.createElement(Icon, { name: 'ios-settings', size, color })
            }
          }
        }),
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          showIcon: true
        }
      },
      React.createElement(Tab.Screen, { name: 'Home', options: { title: 'Coffees' } }, props => React.createElement(HomeTab, Object.assign({ ref: this.homeTabRef }, props))),
      React.createElement(Tab.Screen, { name: 'Settings', component: SettingsTab }))))
  }

  navigate (coffee) {
    if (this.homeTabRef && this.homeTabRef.current) {
      this.homeTabRef.current.navigate(coffee)
    }
  }

  // urlHandler is defined here
  urlHandler = (url, context) => {
    console.log(`urlHandler, url: ${url}`)
    const match = url.match(/coffee\/([^]+)/i)
    if (match && match.length > 1) {
      const id = match[1]
      const foundCoffee = coffees.find(coffee => coffee.id === id)
      if (foundCoffee) {
        this.navigate(foundCoffee)
      } else {
        console.log(`could not find coffee with id: ${id}`)
      }
      return true
    } else {
      console.log('opening external url')
      return false
    }
  }
}
