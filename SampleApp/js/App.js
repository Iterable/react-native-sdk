import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeTab from './HomeTab';
import SettingsTab from './SettingsTab';
import { coffees } from './Data';
import { Iterable, IterableConfig, } from 'react-native-iterable';
// ITERABLE:
// Replace with your Iterable apiKey
import { iterableAPIKey } from './Config';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        // ITERABLE:
        this.urlDelegate = (url, context) => {
            console.log(`urlDelegate, url: ${url}`);
            let match = url.match(/coffee\/([^\/]+)/i);
            if (match && match.length > 1) {
                const id = match[1];
                const foundCoffee = coffees.find(coffee => coffee.id == id);
                if (foundCoffee) {
                    this.navigate(foundCoffee);
                }
                else {
                    console.log(`could not find coffee with id: ${id}`);
                }
                return true;
            }
            else {
                console.log("opening external url");
                return false;
            }
        };
        this.homeTabRef = React.createRef();
        // ITERABLE:
        const config = new IterableConfig();
        config.inAppDisplayInterval = 1.0; // Min gap between in-apps. No need to set this in production.
        config.urlDelegate = this.urlDelegate;
        Iterable.initialize(iterableAPIKey, config);
    }
    render() {
        const Tab = createBottomTabNavigator();
        return (React.createElement(NavigationContainer, null,
            React.createElement(Tab.Navigator, { screenOptions: ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name == 'Home') {
                            return React.createElement(Icon, { name: "ios-home", size: size, color: color });
                        }
                        else {
                            return React.createElement(Icon, { name: "ios-settings", size: size, color: color });
                        }
                    },
                }), tabBarOptions: {
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    showIcon: true,
                } },
                React.createElement(Tab.Screen, { name: "Home", options: { title: "Coffees" } }, props => React.createElement(HomeTab, Object.assign({ ref: this.homeTabRef }, props))),
                React.createElement(Tab.Screen, { name: "Settings", component: SettingsTab }))));
    }
    navigate(coffee) {
        if (this.homeTabRef && this.homeTabRef.current) {
            this.homeTabRef.current.navigate(coffee);
        }
    }
}
