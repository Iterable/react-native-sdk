import React, {
  Component
} from 'react'
import {
  View
} from 'react-native'
import { ListItem } from 'react-native-elements'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Screens } from './HomeTab'
import { Coffee, coffees } from './Data'

interface HomeScreenProps {
  route: RouteProp<Screens, 'Home'>
  navigation: StackNavigationProp<Screens>
}

export default class HomeScreen extends Component<HomeScreenProps> {
  constructor (props: HomeScreenProps) {
    super(props)
  }

  navigate (coffee: Coffee) {
    this.props.navigation.navigate('Detail', { coffee })
  }

  render () {
    return (
      <View>
        {
          coffees.map((coffee, i) => (
            <ListItem
              onPress={() => {
                this.props.navigation.navigate('Detail', { coffee })
              }}
              key={i}
              leftAvatar={{ source: coffee.icon }}
              title={coffee.name}
              subtitle={coffee.subtitle}
              bottomDivider
              chevron
            />
          ))
        }
      </View>
    )
  }
}
