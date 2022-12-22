import { Component } from 'react'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Screens } from './HomeTab'
import { Coffee } from './Data'
declare interface HomeScreenProps {
  route: RouteProp<Screens, 'Home'>
  navigation: StackNavigationProp<Screens>
}
export default class HomeScreen extends Component<HomeScreenProps> {
  constructor (props: HomeScreenProps)
  navigate (coffee: Coffee): void
  render (): JSX.Element
}
export {}
