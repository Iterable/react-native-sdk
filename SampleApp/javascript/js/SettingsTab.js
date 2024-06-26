'use strict';
import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Iterable } from '@iterable/react-native-sdk';
class SettingsTab extends Component {
    constructor(props) {
        super(props);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.onLoginTapped = () => {
            console.log("onLoginTapped");
            if (emailRegex.test(this.state.email)) {
                Iterable.setEmail(this.state.email);
                this.updateState();
            } else {
                Iterable.setUserId(this.state.email);
            }
            this.updateState();
        };
        this.onLogoutTapped = () => {
            console.log("onLogoutTapped");
            if (emailRegex.test(this.state.email)) {
                Iterable.setEmail(undefined);
            } else{
                Iterable.setUserId(undefined);
            }
            this.updateState();
        };
        this.state = { isLoggedIn: false };
        this.updateState();
    }
    render() {
        var userInfo;
        if (this.state.isLoggedIn) {
            userInfo = this.renderLoggedIn(this.state.email);
        }
        else {
            userInfo = this.renderLoggedOut();
        }
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.upperContainer },
                React.createElement(Image, { resizeMode: "contain", style: styles.image, source: require('../img/iterable-logo.png') }),
                userInfo)));
    }
    renderLoggedIn(email) {
        console.log(`renderLoggedIn, email: ${email}`);
        return (React.createElement(View, { style: styles.emailContainer },
            React.createElement(Text, { style: styles.emailText },
                "User: ",
                email),
            React.createElement(Button, { title: "Logout", onPress: this.onLogoutTapped })));
    }
    renderLoggedOut() {
        console.log("renderLoggedOut");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return (React.createElement(View, { style: styles.emailContainer },
            React.createElement(TextInput, { value: this.state.email, style: styles.emailTextInput, autoCapitalize: "none", autoCompleteType: emailRegex.test(this.state.email) ? "email" : "none", onChangeText: (text) => this.setState({ isLoggedIn: false, email: text }), placeholder: "user@example.com/userId" }),
            React.createElement(Button, { title: "Login", onPress: this.onLoginTapped })));
    }
    updateState() {
        Iterable.getEmail().then(email => {
            console.log("gotEmail: " + email);
            if (email) {
                this.setState({ isLoggedIn: true, email: email });
            }
            else {
                Iterable.getUserId().then(userId => {
                    console.log("gotUserId: " + userId);
                    if(userId) {
                        this.setState({ isLoggedIn: true, email: userId });
                    } else {
                        this.setState({ isLoggedIn: false, email: undefined });
                    }
                })
            }
        });
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    upperContainer: {
        marginTop: 25,
        height: 300,
        backgroundColor: 'white',
    },
    image: {
        width: 275,
        height: 150,
    },
    emailContainer: {
        flexDirection: "row",
        marginTop: 25,
    },
    emailTextInput: {
        marginLeft: 10,
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: 250,
    },
    emailText: {
        marginLeft: 10,
        padding: 10,
        fontSize: 18,
    },
});
export default SettingsTab;
