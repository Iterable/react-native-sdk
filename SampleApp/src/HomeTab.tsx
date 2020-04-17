'use strict'
import React, {
  Component
} from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListItem } from 'react-native-elements'

type Screens = {
  Home: undefined,
  Detail: { coffee: Coffee },
}
type NavigationProp = StackNavigationProp<Screens>

type HomeRouteProp = RouteProp<Screens, 'Home'>
type DetailRouteProp = RouteProp<Screens, 'Detail'>

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

type Coffee = {
  name: string
  icon: any
  subtitle: string
}

const coffees: Array<Coffee> = [{
  name: 'Black Coffee',
  icon: require('../img/black-coffee.png'),
  subtitle: 'Black coffee is great for weight loss'
}, {
  name: 'Cappuccino',
  icon: require('../img/cappuccino.png'),
  subtitle: 'It is tasty'
}, {
  name: 'Mocha',
  icon: require('../img/mocha.png'),
  subtitle: 'Indulge yourself'
},
]

class HomeScreen extends React.Component<HomeScreenProps> {
  constructor(props: HomeScreenProps) {
    super(props)
  }

  navigate(coffee: Coffee) {
    this.props.navigation.navigate('Detail', { coffee: coffee })
  }

  render() {
    return (
      <View>
        {
          coffees.map((coffee, i) => (
            <ListItem
              onPress={() => {
                this.props.navigation.navigate('Detail', { coffee: coffee })
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

class DetailScreen extends Component<DetailScreenProps> {
  constructor(props: DetailScreenProps) {
    super(props)
  }

  render() {
    return (
      <View style={styles.details}>
        <Text>Details! {this.props.route.params.coffee.subtitle}</Text>
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
export type { Coffee }