'use strict'
import React, {
  Component
} from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native'
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Screens } from './HomeTab'

type DetailScreenProps = {
  route: RouteProp<Screens, 'Detail'>,
  navigation: StackNavigationProp<Screens>,
}

export default class DetailScreen extends Component<DetailScreenProps> {
  constructor(props: DetailScreenProps) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" style={styles.image} source={this.props.route.params.coffee.icon} />
        <Text style={styles.text}>{this.props.route.params.coffee.subtitle}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    paddingTop: 20,
    fontSize: 20,
  },
})
