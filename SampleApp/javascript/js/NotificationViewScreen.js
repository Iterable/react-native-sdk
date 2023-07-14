import React, { Component } from 'react';
import { View } from 'react-native';
import IterableNotificationView from './components/IterableNotificationView';

export default class BannerViewScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={{ flex: 1, padding: 10 }}>
            <IterableNotificationView
                titleText='Turn on notifications'
                titleTextColor='#2489A9'
                subTitleText='Get updates on scheduled and trending classes.'
                subTitleTextColor='#2489A9'
                btnPrimaryText={'Turn on'}
                btnPrimaryBgColor={'white'}
                btnPrimaryTextColor={'#2489A9'}
                backgroundColor={'#C2F0FC'}
            />
            <IterableNotificationView
                titleText='Turn on notifications 2'
                subTitleText='Get updates on scheduled and trending classes.'
                titleTextColor='#2489A9'
                isShowbtnSecondary={true}
                subTitleTextColor='#2489A9'
                btnPrimaryText={'Turn on'}
                btnPrimaryBgColor={'white'}
                btnPrimaryTextColor={'#2489A9'}
                backgroundColor={'#C2F0FC'}
                btnSecondaryText={'Not now'}
                btnSecondaryTextColor={'#2489A9'}
            />
        </View>
    }
}
