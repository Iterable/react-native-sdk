import React, { Component } from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { coffees } from './Data'
export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
  }

  navigate (coffee) {
    this.props.navigation.navigate('Detail', { coffee })
  }

  render () {
    return (React.createElement(View, null, coffees.map((coffee, i) => (React.createElement(ListItem, {
      onPress: () => {
        this.props.navigation.navigate('Detail', { coffee })
      },
      key: i,
      leftAvatar: { source: coffee.icon },
      title: coffee.name,
      subtitle: coffee.subtitle,
      bottomDivider: true,
      chevron: true
    })))))
  }
}
