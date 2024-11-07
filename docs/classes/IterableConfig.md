[**@iterable/react-native-sdk v2.0.0-alpha**](../README.md) • **Docs**

***

[@iterable/react-native-sdk v2.0.0-alpha](../globals.md) / IterableConfig

# Class: IterableConfig

An IterableConfig object sets various properties of the SDK.
An IterableConfig object is passed into the static initialize method on the Iterable class when initializing the SDK.

## Constructors

### new IterableConfig()

> **new IterableConfig**(): [`IterableConfig`](IterableConfig.md)

#### Returns

[`IterableConfig`](IterableConfig.md)

## Properties

### allowedProtocols

> **allowedProtocols**: `string`[] = `[]`

Use this array to declare the specific URL protocols that the SDK can expect to see on incoming
links from Iterable, so it knows that it can safely handle them as needed. This array helps
prevent the SDK from opening links that use unexpected URL protocols.

#### Defined in

[core/classes/IterableConfig.ts:98](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L98)

***

### androidSdkUseInMemoryStorageForInApps

> **androidSdkUseInMemoryStorageForInApps**: `boolean` = `false`

DEPRECATED - please use `useInMemoryStorageForInApps` as a replacement for this config option.

NOTE: until this option is removed, it will still function with `useInMemoryStorageForInApps` by
doing an OR operation, so if either this or `useInMemoryStorageForInApps` are set to `true`,
the native Android SDK layer will use in memory storage for in-apps.

This specifies the `useInMemoryStorageForInApps` config option downstream to the Android SDK layer.

#### Defined in

[core/classes/IterableConfig.ts:109](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L109)

***

### authHandler()?

> `optional` **authHandler**: () => `Promise`\<`undefined` \| `String` \| [`IterableAuthResponse`](IterableAuthResponse.md)\>

A function expression that provides a valid JWT for the app's current user to Iterable's
React Native SDK. Provide an implementation for this method only if your app uses a
JWT-enabled API key.

#### Returns

`Promise`\<`undefined` \| `String` \| [`IterableAuthResponse`](IterableAuthResponse.md)\>

#### Defined in

[core/classes/IterableConfig.ts:72](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L72)

***

### autoPushRegistration

> **autoPushRegistration**: `boolean` = `true`

When set to true (which is the default value), IterableSDK will automatically register and deregister
notification tokens when you provide email or userId values to the SDK using Iterable.setEmail or Iterable.setUserId.

#### Defined in

[core/classes/IterableConfig.ts:30](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L30)

***

### checkForDeferredDeeplink

> **checkForDeferredDeeplink**: `boolean` = `false`

When set to true, it will check for deferred deep links on first time app launch after installation from the App Store.
This is currently deprecated and will be removed in the future.

#### Defined in

[core/classes/IterableConfig.ts:36](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L36)

***

### customActionHandler()?

> `optional` **customActionHandler**: (`action`, `context`) => `boolean`

A function expression used to handle `action://` URLs for in-app buttons and links.

#### Parameters

• **action**: [`IterableAction`](IterableAction.md)

• **context**: [`IterableActionContext`](IterableActionContext.md)

#### Returns

`boolean`

#### Defined in

[core/classes/IterableConfig.ts:52](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L52)

***

### dataRegion

> **dataRegion**: [`IterableDataRegion`](../enumerations/IterableDataRegion.md) = `IterableDataRegion.US`

This specifies the data region which determines the data center and associated endpoints used by the SDK

#### Defined in

[core/classes/IterableConfig.ts:120](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L120)

***

### encryptionEnforced

> **encryptionEnforced**: `boolean` = `false`

Android only feature: This controls whether the SDK should enforce encryption for all PII stored on disk.
By default, the SDK will not enforce encryption and may fallback to unencrypted storage in case the encryption fails.

#### Defined in

[core/classes/IterableConfig.ts:133](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L133)

***

### expiringAuthTokenRefreshPeriod

> **expiringAuthTokenRefreshPeriod**: `number` = `60.0`

The number of seconds before the current JWT's expiration that the SDK should call the
authHandler to get an updated JWT.

#### Defined in

[core/classes/IterableConfig.ts:91](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L91)

***

### inAppDisplayInterval

> **inAppDisplayInterval**: `number` = `30.0`

Number of seconds to wait when displaying multiple in-app messages in sequence.
between each. Defaults to 30 seconds.

#### Defined in

[core/classes/IterableConfig.ts:42](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L42)

***

### inAppHandler()?

> `optional` **inAppHandler**: (`message`) => [`IterableInAppShowResponse`](../enumerations/IterableInAppShowResponse.md)

Implement this callback to override default in-app behavior.
By default, every single in-app will be shown as soon as it is available.
If more than 1 in-app is available, we show the first.

See "In-App Messages with Iterable's React Native SDK" in support documentation
for more information.

#### Parameters

• **message**: [`IterableInAppMessage`](IterableInAppMessage.md)

#### Returns

[`IterableInAppShowResponse`](../enumerations/IterableInAppShowResponse.md)

#### Defined in

[core/classes/IterableConfig.ts:65](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L65)

***

### logLevel

> **logLevel**: [`IterableLogLevel`](../enumerations/IterableLogLevel.md) = `IterableLogLevel.info`

Set the verbosity of Android and iOS project's log system.
By default, you will be able to see info level logs printed in IDE when running the app.

#### Defined in

[core/classes/IterableConfig.ts:78](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L78)

***

### logReactNativeSdkCalls

> **logReactNativeSdkCalls**: `boolean` = `true`

Set whether the React Native SDK should print function calls to console
This is for calls within the React Native layer, and is separate from `logLevel`
which affects the Android and iOS native SDKs

#### Defined in

[core/classes/IterableConfig.ts:85](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L85)

***

### pushIntegrationName?

> `optional` **pushIntegrationName**: `string`

The name of the Iterable push integration that will send push notifications to your app.
Defaults to your app's application ID or bundle ID for iOS.

Note: Don't specify this value unless you are using an older Iterable push integration that
has a custom name. To view your existing integrations, navigate to Settings > Mobile Apps.

#### Defined in

[core/classes/IterableConfig.ts:24](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L24)

***

### pushPlatform

> **pushPlatform**: [`IterablePushPlatform`](../enumerations/IterablePushPlatform.md) = `IterablePushPlatform.auto`

This specifies the push platform to use for push notifications. Either `sandbox`, `production`, or `auto`.
The default value is `auto`, which means the SDK will automatically determine the push platform to use.
However, you can also set this to `sandbox` or `production` to force the SDK to use a specific platform.

#### Defined in

[core/classes/IterableConfig.ts:127](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L127)

***

### urlHandler()?

> `optional` **urlHandler**: (`url`, `context`) => `boolean`

A callback function used to handle deep link URLs and in-app message button and link URLs.

#### Parameters

• **url**: `string`

• **context**: [`IterableActionContext`](IterableActionContext.md)

#### Returns

`boolean`

#### Defined in

[core/classes/IterableConfig.ts:47](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L47)

***

### useInMemoryStorageForInApps

> **useInMemoryStorageForInApps**: `boolean` = `false`

This specifies the `useInMemoryStorageForInApps` config option downstream to the native SDK layers.
Please read the respective `IterableConfig` files for specific details on this config option.

#### Defined in

[core/classes/IterableConfig.ts:115](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L115)

## Methods

### toDict()

> **toDict**(): `any`

#### Returns

`any`

#### Defined in

[core/classes/IterableConfig.ts:135](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableConfig.ts#L135)
