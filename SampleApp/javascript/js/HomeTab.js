'use strict'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import DetailScreen from './DetailScreen'
export default class HomeTab extends Component {
  constructor (props) {
    super(props)
    this.homeScreenRef = React.createRef()
  }

  navigate (coffee) {
    this.homeScreenRef.current.navigate(coffee)
  }

  render () {
    const HomeStack = createStackNavigator()
    return (React.createElement(HomeStack.Navigator, null,
      React.createElement(HomeStack.Screen, { name: 'Home', options: { headerTitle: 'Coffees' } }, props => React.createElement(HomeScreen, Object.assign({}, props, { ref: this.homeScreenRef }))),
      React.createElement(HomeStack.Screen, { name: 'Detail', options: { headerTitle: 'Coffee' }, component: DetailScreen })))
  }
}
