import React, { Component } from 'react';
import { View } from 'react-native';
import IterableCardView from './components/IterableCardView';

export default class CardViewScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={{ flex: 1, padding: 10 }}>
            <IterableCardView
                titleText='Card View 1'
                subTitleText='Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
                isShowbtnSecondary={true}
            />
            <IterableCardView
                titleText='Card View 2'
                subTitleText='Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 2233'
                imgSrc='https://codesymphony.in/assets/projects/sonetel/Sonetel%205.png'
                isShowbtnSecondary={true}
            />
        </View>
    }
}
