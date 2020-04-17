'use strict'
import React, {
    Component
} from 'react'
import {
    Text,
    View,
    StyleSheet,
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
