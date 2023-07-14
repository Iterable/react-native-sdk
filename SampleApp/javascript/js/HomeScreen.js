import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    navigateToCardView() {
        console.log("Card View");
    }

    navigateToNotificationView() {
        this.props.navigation.navigate('NotificationView');
    }

    navigateToBannerView() {
        console.log("Banner View");
    }

    render() {
        return <View style={{ flex: 1, padding: 10 }}>
            <TouchableOpacity style={{ padding: 10, width: '100%', justifyContent: 'center' }} onPress={() => this.navigateToCardView()}>
                <Text style={{ textAlign: 'center', color: 'blue', fontSize: 16 }}>{"Card View Demo"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10, width: '100%', justifyContent: 'center' }} onPress={() => this.navigateToNotificationView()}>
                <Text style={{ textAlign: 'center', color: 'blue', fontSize: 16 }}>{"Notification View Demo"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10, width: '100%', justifyContent: 'center' }} onPress={() => this.navigateToBannerView()}>
                <Text style={{ textAlign: 'center', color: 'blue', fontSize: 16 }}>{"Banner View Demo"}</Text>
            </TouchableOpacity>
        </View>
    }
}