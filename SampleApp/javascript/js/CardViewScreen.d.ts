import { Component } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

declare type CardViewScreenProps = {
    route: RouteProp<any>;
    navigation: StackNavigationProp<any>;
};
export default class CardViewScreen extends Component<CardViewScreenProps> {
    constructor(props: CardViewScreenProps);
    render(): JSX.Element;
}
export {};
