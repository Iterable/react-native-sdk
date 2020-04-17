'use strict'
import React, {
  Component
} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Coffee} from './Data'
import HomeScreen from './HomeScreen'
import DetailScreen from './DetailScreen'

export type Screens = {
  Home: undefined,
  Detail: { coffee: Coffee },
}

export default class HomeTab extends Component {
  constructor(props: Readonly<{}>) {
    super(props)
    this.homeScreenRef = React.createRef()
  }
  
  navigate(coffee: Coffee) {
    this.homeScreenRef.current.navigate(coffee)
  }

  render() {
    const HomeStack = createStackNavigator();

    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" options={{ headerTitle: "Coffees" }}>
          {props => <HomeScreen {...props} ref={this.homeScreenRef} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="Detail" options={{ headerTitle: "Coffee" }} component={DetailScreen} />
      </HomeStack.Navigator>
    );
  }

  private homeScreenRef: any
}
