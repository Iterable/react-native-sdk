import { Component } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Screens } from './HomeTab';
declare type DetailScreenProps = {
    route: RouteProp<Screens, 'Detail'>;
    navigation: StackNavigationProp<Screens>;
};
export default class DetailScreen extends Component<DetailScreenProps> {
    constructor(props: DetailScreenProps);
    render(): JSX.Element;
    private buyTapped;
}
export {};
