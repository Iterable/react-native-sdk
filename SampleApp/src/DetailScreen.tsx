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
import { Button } from 'react-native-elements'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Screens } from './HomeTab'

import { 
  Iterable, 
  IterableCommerceItem } from 'react-native-iterable'

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
        <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title="Buy Now" onPress={this.buyTapped} />
      </View>
    )
  }

  private buyTapped = () => {
    console.log("bought coffee")
    const coffee = this.props.route.params.coffee
    const purchasedItem = new IterableCommerceItem(coffee.id, coffee.name, 3.50, 1)
    Iterable.trackPurchase(3.50, [purchasedItem], null)
    this.props.navigation.goBack()
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
    paddingTop: 10,
    fontSize: 15,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
  }
})
