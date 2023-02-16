import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

import HomeTab from './HomeTab'
import SettingsTab from './SettingsTab'
import { Coffee, coffees } from './Data'
import {
  Iterable,
  IterableConfig,
  IterableActionContext
} from '@iterable/react-native-sdk'

// ITERABLE:
// Make sure you have a file called Config.js and your apiKey is in there.
import { iterableAPIKey } from './Config'

interface Props { }
export default class App extends React.Component {
  constructor (props: Props) {
    super(props)
    this.homeTabRef = React.createRef()

    // ITERABLE:
    const config = new IterableConfig()
    config.inAppDisplayInterval = 1.0 // Min gap between in-apps. No need to set this in production.
    config.urlHandler = this.urlHandler
    Iterable.initialize(iterableAPIKey, config)
  }

  render () {
    const Tab = createBottomTabNavigator()

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
            }
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showIcon: true
          }}
        >
          <Tab.Screen name="Home" options={{ title: 'Coffees' }}>
            {props => <HomeTab ref={this.homeTabRef} {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

  // Private variables
  private readonly homeTabRef: any

  private navigate (coffee: Coffee) {
    if (this.homeTabRef && this.homeTabRef.current) {
      this.homeTabRef.current.navigate(coffee)
    }
  }

  // ITERABLE:
  private readonly urlHandler = (url: String, context: IterableActionContext): boolean => {
    console.log(`urlHandler, url: ${url}`)
    const match = url.match(/coffee\/([^\/]+)/i)
    if ((match != null) && match.length > 1) {
      const id = match[1]
      const foundCoffee = coffees.find(coffee => coffee.id == id)
      if (foundCoffee != null) {
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
