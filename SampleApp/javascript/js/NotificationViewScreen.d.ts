import { Component } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

declare type NotificationViewScreenProps = {
    route: RouteProp<any, 'NotificationView'>;
    navigation: StackNavigationProp<any>;
};
export default class NotificationViewScreen extends Component<NotificationViewScreenProps> {
    constructor(props: NotificationViewScreenProps);
    render(): JSX.Element;
}
export {};
