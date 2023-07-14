import React, { Component } from 'react';
import { View } from 'react-native';
import IterableBannerView from './components/IterableBannerView';

export default class BannerViewScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={{ flex: 1, padding: 10 }}>
            <IterableBannerView
                titleText='Banner View 1'
                subTitleText='Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
                imgSrc='https://codesymphony.in/assets/technology/home-page/Serverless.png'
                btnPrimaryText={'Try Premium'}
            />
            <IterableBannerView
                titleText='Banner View 2'
                subTitleText='Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 2233'
                imgSrc='https://codesymphony.in/assets/technology/home-page/Selenium.png'
                isShowbtnSecondary={true}
            />
        </View>
    }
}
