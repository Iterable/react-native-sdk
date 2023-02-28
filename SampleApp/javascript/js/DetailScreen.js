
'use strict'
import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { Iterable, IterableCommerceItem } from '@iterable/react-native-sdk'
import { RouteProp, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import PropTypes from 'prop-types';

DetailScreen.propTypes = {
  route: RouteProp<Screens>,
  navigation: PropTypes.NavigationScreenProp<ParamListBase>
}

export default class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.buyTapped = () => {
            console.log("bought coffee");
            const coffee = this.props.route.params.coffee;
            const purchasedItem = new IterableCommerceItem(coffee.id, coffee.name, 3.50, 1);
            Iterable.trackPurchase(3.50, [purchasedItem], null);
            this.props.navigation.goBack();
        };
    }
    render() {
        const coffee = this.props.route.params.coffee;
        return (React.createElement(View, { style: styles.container },
            React.createElement(Image, { resizeMode: "contain", style: styles.image, source: coffee.icon }),
            React.createElement(Text, { style: styles.text },
                coffee.name,
                ". ",
                coffee.subtitle),
            React.createElement(Button, { buttonStyle: styles.button, titleStyle: styles.buttonText, title: "Buy Now", onPress: this.buyTapped })));
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
});
