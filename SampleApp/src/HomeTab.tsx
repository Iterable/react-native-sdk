'use strict'
import React, {
  Component
} from 'react'
import {
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler'
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Screens = {
  Home: undefined,
  Detail: {coffeeId: String},
}
type HomeRouteProp = RouteProp<Screens, 'Home'>
type DetailRouteProp = RouteProp<Screens, 'Detail'>

type NavigationProp = StackNavigationProp<Screens>

type HomeScreenProps = {
  route: HomeRouteProp,
  navigation: NavigationProp,
}

type DetailScreenProps = {
  route: DetailRouteProp,
  navigation: NavigationProp,
}

class HomeTab extends Component {
  constructor(props: Readonly<{}>) {
    super(props)
  }

  render() {
    const HomeStack = createStackNavigator();

    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Detail" component={DetailScreen} />
      </HomeStack.Navigator>
    );
    }
}

class HomeScreen extends React.Component<HomeScreenProps> {
  constructor(props: HomeScreenProps) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          data={[
            { key: "Cappuccino" },
            { key: "Mocha" },
            { key: "Black" },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
        />
        <Text>Home screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Detail', {coffeeId: "mocha"})}
        />
      </View>
    )
  }
}

class DetailScreen extends Component<DetailScreenProps> {
  constructor(props: DetailScreenProps) {
    super(props)
  }

  render() {
    return (
      <View style={styles.details}>
        <Text>Details! {this.props.route.params.coffeeId}</Text>
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
  list: {
    paddingTop: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeTab
