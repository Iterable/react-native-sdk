![Iterable logo](./images/Iterable-Logo.png "Iterable Logo")

# Iterable's React Native SDK

[Iterable](https://www.iterable.com) is a growth marketing platform that helps
you to create better experiences for—and deeper relationships with—your
customers. Use it to send customized email, SMS, push notification, in-app
message and web push notification campaigns to your customers.

This SDK helps you integrate your React Native-based iOS and Android apps with
Iterable. It supports JavaScript and TypeScript.



<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Iterable's React Native SDK](#iterables-react-native-sdk)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [📚 API Documentation](#-api-documentation)
  - [Architecture Support](#architecture-support)
  - [Features](#features)
  - [Example project](#example-project)
  - [Version mapping](#version-mapping)
  - [Release notes, support and troubleshooting](#release-notes-support-and-troubleshooting)
  - [License](#license)
  - [Want to contribute?](#want-to-contribute)

<!-- /code_chunk_output -->



## Requirements

Iterable's React Native SDK relies on:

- **React Native**
    - [React Native 0.75+](https://github.com/facebook/react-native)
    - [React 18.1+](https://github.com/facebook/react)

    _UI Components require additional peer dependencies_
    - [React Navigation 6+](https://github.com/react-navigation/react-navigation)
    - [React Native Safe Area Context 4+](https://github.com/th3rdwave/react-native-safe-area-context)
    - [React Native Vector Icons 10+](https://github.com/oblador/react-native-vector-icons)
    - [React Native WebView 13+](https://github.com/react-native-webview/react-native-webview)

- **iOS**
    - Xcode 12+
    - [Deployment target 13.4+](https://help.apple.com/xcode/mac/current/#/deve69552ee5)
    - [Iterable's iOS SDK](https://github.com/Iterable/iterable-swift-sdk)

- **Android**
    - [`minSdkVersion` 21+, `compileSdkVersion` 31+](https://medium.com/androiddevelopers/picking-your-compilesdkversion-minsdkversion-targetsdkversion-a098a0341ebd)
    - [Iterable's Android SDK](https://github.com/Iterable/iterable-android-sdk)

## Installation

For installation instructions, read [Installing Iterable's React Native SDK](https://support.iterable.com/hc/articles/360045714132).

## 📚 API Documentation

View the [API documentation](https://iterable-react-native-sdk.netlify.app).

## Architecture Support

**Important**: Iterable's React Native SDK has limited support for [React
Native's New Architecture](https://reactnative.dev/architecture/landing-page)
through interop. We are in the process of updating the SDK to fully support the New
Architecture, and suggest using the legacy architecture in the meantime.  *TLDR;* Use the New Architecture at your own risk --
you may encounter significant issues.

## Features

To learn more about the SDK, read:

- [Overview of Iterable's React Native SDK](https://support.iterable.com/hc/articles/360045714072)
- [Installing Iterable's React Native SDK](https://support.iterable.com/hc/articles/360045714132)
- [Managing User Identity](https://support.iterable.com/hc/articles/360045714152)
- [User Profile Data and Subscription Preferences](https://support.iterable.com/hc/articles/360046134851)
- [Tracking Events](https://support.iterable.com/hc/articles/360046134891)
- [Deep Links and Custom Actions](https://support.iterable.com/hc/articles/360046134911)
- [Push Notifications](https://support.iterable.com/hc/articles/360046134871)
- [In-App Messages](https://support.iterable.com/hc/articles/360045714172)
- [Migrating to Iterable's React Native SDK](https://support.iterable.com/hc/articles/360046134931)

## Example project

For sample code, take a look at the following project:

- [Example App](https://github.com/Iterable/react-native-sdk/tree/master/example)

## Version mapping

For quick reference, the following table lists the versions of the [Android SDK](https://github.com/Iterable/iterable-android-sdk) and the [iOS SDK](https://github.com/Iterable/swift-sdk) the React Native SDK points to for version 1.2.0 and above.

| RN SDK Version                                                              | Android SDK Version                                                          | iOS SDK Version |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------- |
| [2.0.3](https://www.npmjs.com/package/@iterable/react-native-sdk/v/2.0.3) | [3.5.2](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.5.2) | [6.5.4](https://github.com/Iterable/swift-sdk/releases/tag/6.5.4)
| [2.0.2](https://www.npmjs.com/package/@iterable/react-native-sdk/v/2.0.2) | [3.5.2](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.5.2) | [6.5.4](https://github.com/Iterable/swift-sdk/releases/tag/6.5.4)
| [2.0.1](https://www.npmjs.com/package/@iterable/react-native-sdk/v/2.0.1) | [3.5.2](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.5.2) | [6.5.4](https://github.com/Iterable/swift-sdk/releases/tag/6.5.4)
| [2.0.0](https://www.npmjs.com/package/@iterable/react-native-sdk/v/2.0.0) | [3.5.2](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.5.2) | [6.5.4](https://github.com/Iterable/swift-sdk/releases/tag/6.5.4)
| [2.0.0-beta.1](https://www.npmjs.com/package/@iterable/react-native-sdk/v/2.0.0-beta.1) | [3.5.2](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.5.2) | [6.5.4](https://github.com/Iterable/swift-sdk/releases/tag/6.5.4)
| [2.0.0-beta](https://www.npmjs.com/package/@iterable/react-native-sdk/v/2.0.0-beta) | [3.5.2](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.5.2) | [6.5.4](https://github.com/Iterable/swift-sdk/releases/tag/6.5.4)
| [1.3.21](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.20) | [3.5.2](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.5.2) | [6.5.4](https://github.com/Iterable/swift-sdk/releases/tag/6.5.4)
| [1.3.20](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.20) | [3.5.2](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.5.2) | [6.5.4](https://github.com/Iterable/swift-sdk/releases/tag/6.5.4)
| [1.3.19](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.19) | [3.5.2](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.5.2) | [6.5.3](https://github.com/Iterable/swift-sdk/releases/tag/6.5.3)
| [1.3.18](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.18) | [3.5.2](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.5.2) | [6.5.3](https://github.com/Iterable/swift-sdk/releases/tag/6.5.3)
| [1.3.17](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.17) | [3.4.16](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.16) | [6.4.15](https://github.com/Iterable/swift-sdk/releases/tag/6.4.15)
| [1.3.16](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.16) | [3.4.15](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.15) | [6.4.15](https://github.com/Iterable/swift-sdk/releases/tag/6.4.15)
| [1.3.15](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.15) | [3.4.14](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.14) | [6.4.14](https://github.com/Iterable/swift-sdk/releases/tag/6.4.14)
| [1.3.14](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.14) | [3.4.13](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.13) | [6.4.14](https://github.com/Iterable/swift-sdk/releases/tag/6.4.14)
| [1.3.13](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.13) | [3.4.11](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.11) | [6.4.12](https://github.com/Iterable/swift-sdk/releases/tag/6.4.12)
| [1.3.12](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.12) | [3.4.10](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.10) | [6.4.12](https://github.com/Iterable/swift-sdk/releases/tag/6.4.12)
| [1.3.11](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.11) | [3.4.10](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.10) | [6.4.11](https://github.com/Iterable/swift-sdk/releases/tag/6.4.11)
| [1.3.10](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.10) | [3.4.10](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.10) | [6.4.10](https://github.com/Iterable/swift-sdk/releases/tag/6.4.10) |
| [1.3.9](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.9)   | [3.4.10](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.10) | [6.4.9](https://github.com/Iterable/swift-sdk/releases/tag/6.4.9) |
| [1.3.7](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.7)   | [3.4.10](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.10) | [6.4.8](https://github.com/Iterable/swift-sdk/releases/tag/6.4.8) |
| [1.3.6](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.6)   | [3.4.9](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.9) | [6.4.7](https://github.com/Iterable/swift-sdk/releases/tag/6.4.7) |
| [1.3.5](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.5)   | [3.4.9](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.9) | [6.4.7](https://github.com/Iterable/swift-sdk/releases/tag/6.4.7) |
| [1.3.4](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.4)   | [3.4.8](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.8) | [6.4.6](https://github.com/Iterable/swift-sdk/releases/tag/6.4.6) |
| [1.3.3](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.3)   | [3.4.7](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.7) | [6.4.5](https://github.com/Iterable/swift-sdk/releases/tag/6.4.5) |
| [1.3.2](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.2)   | [3.4.5](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.5) | [6.4.3](https://github.com/Iterable/swift-sdk/releases/tag/6.4.3) |
| [1.3.1](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.1)   | [3.4.5](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.5) | [6.4.2](https://github.com/Iterable/swift-sdk/releases/tag/6.4.2) |
| [1.3.0](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.3.0)   | [3.4.5](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.5) | [6.4.2](https://github.com/Iterable/swift-sdk/releases/tag/6.4.2) |
| [1.2.3](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.2.3)   | [3.4.5](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.5) | [6.4.2](https://github.com/Iterable/swift-sdk/releases/tag/6.4.2) |
| [1.2.2](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.2.2)   | [3.4.4](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.4) | [6.4.1](https://github.com/Iterable/swift-sdk/releases/tag/6.4.1) |
| [1.2.1](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.2.1)   | [3.4.3](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.3) | [6.4.1](https://github.com/Iterable/swift-sdk/releases/tag/6.4.1) |
| [1.2.0](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.2.0)   | [3.4.3](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.4.3) | [6.4.1](https://github.com/Iterable/swift-sdk/releases/tag/6.4.1) |
| [1.1.3](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.1.3)   | [3.3.8](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.3.8) | [6.3.4](https://github.com/Iterable/swift-sdk/releases/tag/6.3.4) |
| [1.1.2](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.1.2)   | [3.3.5](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.3.5) | [6.3.3](https://github.com/Iterable/swift-sdk/releases/tag/6.3.3) |
| [1.1.1](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.1.1)   | [3.3.4](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.3.4) | [6.3.2](https://github.com/Iterable/swift-sdk/releases/tag/6.3.2) |
| [1.1.0](https://www.npmjs.com/package/@iterable/react-native-sdk/v/1.1.0)   | [3.3.2](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.3.2) | [6.3.1](https://github.com/Iterable/swift-sdk/releases/tag/6.3.1) |

## Release notes, support and troubleshooting

Release notes:

- [Release Notes - Iterable's React Native SDK](https://support.iterable.com/hc/articles/360045714352) (major releases)
- [Releases page on GitHub](https://github.com/Iterable/react-native-sdk/releases)
  on GitHub (minor releases)

Support policies:

- Iterable's [Mobile SDK Support Policy](https://support.iterable.com/hc/articles/360046136171)
- [Deprecation and End-of-Life Schedule](https://support.iterable.com/hc/articles/360045714352#deprecation-and-end-of-life-schedule)
  for Iterable's React Native SDK

Please contact your customer success manager with any questions.

## License

This SDK is released under the MIT License. See [LICENSE](https://github.com/Iterable/swift-sdk/blob/master/LICENSE.md)
for more information.

## Want to contribute?

This library is open source, and we will look at issue reports and pull requests.
See [CONTRIBUTING](CONTRIBUTING.md) for more information.
