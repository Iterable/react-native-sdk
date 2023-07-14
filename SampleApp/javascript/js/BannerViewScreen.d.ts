import { Component } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

declare type BannerViewScreenProps = {
    route: RouteProp<any, 'BannerView'>;
    navigation: StackNavigationProp<any>;
};
export default class BannerViewScreen extends Component<BannerViewScreenProps> {
    constructor(props: BannerViewScreenProps);
    render(): JSX.Element;
}
export {};
