## 2.2.0-alpha.1

### Fixes
* [SDK-151] cannot-read-property-authtoken-of-undefined by @lposen in https://github.com/Iterable/react-native-sdk/pull/779
* [SDK-181] update ios/android sdk versions by @lposen in https://github.com/Iterable/react-native-sdk/pull/780
* [SDK-149] add-logout-functionality by @lposen in https://github.com/Iterable/react-native-sdk/pull/781

## 2.2.0-alpha.0

### Updates
- Updated Android SDK version to [3.6.1](https://github.com/Iterable/iterable-android-sdk/releases/tag/3.6.1)
- Updated iOS SDK version to [6.6.1](https://github.com/Iterable/swift-sdk/releases/tag/6.6.1)
- Added JWT Capabilities:
  - Added `Iterable.authhManager`, which manages the authentication flow
  - Added `IterableRetryBackoff` and `IterableAuthFailureReason` enums
  - Added `onJwtError` and `retryPolicy` for control over JWT flow
- Moved all native calls to `IterableApi.ts`
- Added JWT example to our example app

### Fixes
- Created a standalone `IterableLogger` to avoid circular dependencies

##2.1.0
### Updates
* SDK is now compatible with both New Architecture and Legacy Architecture. Fix
  for #691, #602, #563.

### Fixes
* Dependencies update

## 2.1.0

### Fixes
- Update SDK so that it has full support for [React Native New Architecture](https://reactnative.dev/architecture/landing-page)
- Add Temporary fix for circular paths, which break expo ([9c09743](https://github.com/Iterable/react-native-sdk/commit/9c09743))

### Chores
- Update dependencies for React Navigation and related packages ([95053bb](https://github.com/Iterable/react-native-sdk/commit/95053bb))

## 2.0.4

### Updates
- Added API documentation via Netlify([1087275](https://github.com/Iterable/react-native-sdk/commit/1087275))
- Removed dependency on `react-native-vector-icons`, per issues
  [#513](https://github.com/Iterable/react-native-sdk/issues/513),
 [#683](https://github.com/Iterable/react-native-sdk/issues/683) and
 [#675](https://github.com/Iterable/react-native-sdk/issues/675)
 ([6ece6e0](https://github.com/Iterable/react-native-sdk/commit/6ece6e0))
- Updated dependencies

## 2.0.3

### Updates
- Add in-app message manager with lazy initialization to avoid circular dependency ([6feec35](https://github.com/Iterable/react-native-sdk/commit/6feec35))

### Fixes
- Update Iterable-iOS-SDK to 6.5.4.1 to fix issue #701 (performAndWait) ([0bb4a24](https://github.com/Iterable/react-native-sdk/commit/0bb4a24)), closes [#701](https://github.com/Iterable/react-native-sdk/issues/701)
- Update Xcode project configuration to include CocoaPods build phases and settings ([23a9e79](https://github.com/Iterable/react-native-sdk/commit/23a9e79))
- Enable CodeQl Advanced Config ([7346e56](https://github.com/Iterable/react-native-sdk/commit/7346e56))
- Upload coverage report to Qlty ([6872621](https://github.com/Iterable/react-native-sdk/commit/6872621))
- Simplify IterableInAppManager usage in tests by directly accessing Iterable.inAppManager ([6deeae3](https://github.com/Iterable/react-native-sdk/commit/6deeae3))
- Correct markdown link syntax in IterableInAppManager documentation ([78e22b2](https://github.com/Iterable/react-native-sdk/commit/78e22b2))


## 2.0.2
### Fixes
- Migrate AppDelegate to Swift and remove Objective-C files
  ([06b82a0](https://github.com/Iterable/react-native-sdk/commit/06b82a0))
- Fixed misspelling ([bc2e84c](https://github.com/Iterable/react-native-sdk/commit/bc2e84c))

## 2.0.1
- Added support for React Native New Architecture through interop.  **WARNING**:
  As support for the New Architecture is through interop, developers should use
  this at their own risk.
- React Native support updated to 0.79.3

### Fixes
- Removed preinstall script from package.json (17199b3)
- Disabled empty body warnings in Podfile build settings (40f3c8f)
- Removed pod lockfile as the dependencies change depending on whether it is new
  arch (19c8c90)
- Updated Babel and Jest configurations for React Native 0.79.3 support
  (56584b5)
- Removed duplicate methods as it prevents rendering in new arch (b7f0c71)

## 2.0.0

GA release. No changes from 2.0.0-beta.1.

## 2.0.0-beta.1

- Added disclaimer to README to alert users that we do not yet support React
  Native New Architecture [`#630`](https://github.com/Iterable/react-native-sdk/pull/630)
- Resolved circular dependencies which were making the SDK incompatible with Expo [`#629`](https://github.com/Iterable/react-native-sdk/pull/629)
- Removed beta disclaimer link
  [`#625`](https://github.com/Iterable/react-native-sdk/pull/625)
- Added extra troubleshooting steps to example app README
- Added safe concurrent Ruby version to Gemfile


## 2.0.0-beta
**NOTE**: This is a beta release of the SDK. Please contact Iterable support if
you have any questions or issues.
### Fixes
- Updated React Native to
  [7.3.1](https://reactnative.dev/docs/0.73/getting-started).  See the version
  [CHANGELOG](https://github.com/facebook/react-native/releases/tag/v0.73.1) for
  further details.
- Updated dependencies, including:
  - [@react-navigation](https://reactnavigation.org/docs/elements/)
  - [react-native-safe-area-context](https://github.com/AppAndFlow/react-native-safe-area-context)
  - [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
  - [react-native-webview](https://github.com/react-native-webview/react-native-webview)
- Update exports to include components which previously were obtained via direct
  path.  EG: Instead of `import IterableInbox from
  '@iterable/react-native-sdk/js/IterableInbox'`, you can now import it by doing
  `import {IterableInbox} from '@iterable/react-native-sdk'`.
  - **NOTE**: This is a breaking change.  All nested imports will need to be updated.
- Replaced non-working sample application with a new example app
- Changed scaffolding to use [react-native-builder-bob](https://callstack.github.io/react-native-builder-bob/create)
- Fixed linting issues and made lint rules stricter
- Fixed unit tests
- Removed broken integration tests
- Changed folder structure to prepare for it to be divided into multiple packages
- Removed duplicate code
- Made lint rules stricter

## 1.3.21
### Fixes
- Fixes an issue where react native components that use safe-area-context or react-navigation throw an error because the sdk's components try and use its own local node_modules instead of the consumer's project.

#### Added
- Added a new configuration in IterableConfig, `IterablePushPlatform`, allowing developers to manually register a device as either sandbox or production. This provides greater control over push notification environments.

## 1.3.20
### Fixes
- Fixes an issue where the iOS SDK incorrectly targeted the latest minor version instead of a fixed version, potentially causing breaking changes.

## 1.3.19
### Updates
- updates to RN version 0.68.0 to address various security vulnerabilities

## 1.3.18
### Updates
- adds user id login for sample apps
- version mapping to newest native SDK versions
- updates versions of various package dependencies

## 1.3.17
### Fixed
- Fixes a specific Android issue where apps could crash due to EncryptedSharedPreference being null.

## 1.3.16
### Updates

This release allows you to use projects hosted on Iterable's EU data center. If your project is hosted on Iterable's [European data center (EUDC)](https://support.iterable.com/hc/articles/17572750887444), configure the SDK to use Iterable's EU-based API endpoints:

```javascript
const config = new IterableConfig();
// ... other configuration options ...
config.dataRegion = IterableDataRegion.EU;
Iterable.initialize('<YOUR_API_KEY>', config);
```

## Fixed
- Addressed push notification deep linking issues on Android where the app would restart instead of resuming the last activity upon being backgrounded.
- Resolves an additional push notification problem on Android wherein the customActionHandler and urlHandler were not being invoked in specific scenarios, as documented in issue #470. (Credit to @tnortman-jabra for the report and the fix)

## 1.3.15
### Updates
- Resolves Android build issues caused in 1.3.14
- Fixes a specific Android issue where custom action handlers were not invoked when tapping on push notification when the app is in background.

## 1.3.14
> **Warning**
> This version causes build failure on Android. Please use 1.3.15 which fixes this issue.
### Updates
- updates `Iterable.setEmail` and `Iterable.setUserId` to take in null parameter type
- fixes `Iterable.updateUser` on the Android side to merge nested objects in the user profile when `mergeNestedObjects` is set to true

## 1.3.9
### Added

[Version 1.3.9](https://github.com/Iterable/react-native-sdk/releases/tag/1.3.9) of Iterable's React Native SDK makes it possible for iOS apps to store in- app messages in memory, rather than in an unencrypted local file.  ([Version 1.3.7](https://github.com/Iterable/react-native-sdk/releases/tag/1.3.7) added this same support for Android.)

To store in-app messages in memory on both iOS and Android, set `useInMemoryStorageForInApps` to `true`:

```javascript
const config = new IterableConfig();
// ... other configuration options ...
config.useInMemoryStorageForInApps = true;
Iterable.initialize('<YOUR_API_KEY>', config);
```

This release deprecates `androidSdkUseInMemoryStorageForInApps`, which was introduced in version 1.3.7, and replaces it with `useInMemoryStorageForInApps`.  However, for now:

- Android apps store in-app messages in memory if `useInMemoryStorageForInApps` is `true`, `androidSdkUseInMemoryStorageForInApps` is `true`, or if both are `true`.

- iOS apps store in-app messages in memory if `useInMemoryStorageForInApps` is `true`. `androidSdkUseInMemoryStorageForInApps` does not affect iOS apps.

When you can, please update your apps to use `useInMemoryStorageForInApps` instead of `androidSdkUseInMemoryStorageForInApps`.

When users upgrade to a version of your iOS or Android app that uses this version of the SDK (or higher), and they've enabled in-app memory storage, the local file used for in-app message storage (if it already exists) is deleted.  However, no data is lost.

## 1.3.7
Starting with this release, as a privacy enhancement, Iterable’s React Native
SDK encrypts some data stored at rest.

#### iOS updates
In iOS apps, Iterable's React Native SDK now encrypts the following fields when
storing them at rest:

- `email` — The user's email address.
- `userId` — The user's ID.
- `authToken` — The JWT used to authenticate the user with Iterable's API.
- `lastPushPayload` — The JSON payload that came along with the last push
  notification received by the app.

(Note that, in iOS apps, Iterable's React Native SDK does not store in-app
messages at rest—before or after this update.)

When a user upgrades to a version of your app that uses this version of the SDK
(or higher), the fields shown above are encrypted. No data that's already stored
is lost.

For more information about this encryption in iOS, examine the source code for
Iterable's iOS SDK (upon which the React Native SDK relies):

- [`IterableKeychain`](https://github.com/Iterable/swift-sdk/blob/master/swift-sdk/Internal/IterableKeychain.swift)
- [`KeychainWrapper`](https://github.com/Iterable/swift-sdk/blob/master/swift-sdk/Internal/KeychainWrapper.swift)

#### Android updates
For Android, this release includes support for encrypting some data at rest,
and an option to store in-app messages in memory.

##### Encrypted data
In Android apps with `minSdkVersion` 23 or higher ([Android 6.0](https://developer.android.com/studio/releases/platforms#6.0))
Iterable's React Native SDK now encrypts the following fields when storing
them at rest:

- `email` — The user's email address.
- `userId` — The user's ID.
- `authToken` — The JWT used to authenticate the user with Iterable's API.

(Note that, in Android apps, Iterable's React Native SDK does not store the last
push payload at rest—before or after this update.)

For more information about this encryption in Android, examine the source code
for Iterable's Android SDK (upon which the React Native SDK relies):
[`IterableKeychain`](https://github.com/Iterable/iterable-android-sdk/blob/master/iterableapi/src/main/java/com/iterable/iterableapi/IterableKeychain.kt).

##### Storing in-app messages in memory
This release also allows you to have your Android apps (regardless of `minSdkVersion`)
store in-app messages in memory, rather than in an unencrypted local file.
However, an unencrypted local file is still the default option.

To store in-app messages in memory, on `IterableConfig`, set
`androidSdkUseInMemoryStorageForInApps` to `true` (defaults to `false`):

```javascript
const config = new IterableConfig();
// ... other configuration options ...
config.androidSdkUseInMemoryStorageForInApps = true;
Iterable.initialize('<YOUR_API_KEY>', config);
```

When users upgrade to a version of your Android app that uses this version of
the SDK (or higher), and you've set this configuration option to `true`, the
local file used for in-app message storage (if it already exists) is deleted
However, no data is lost.

##### Android upgrade instructions
If your app targets API level 23 or higher, this is a standard SDK upgrade, with
no special instructions.

If your app targets an API level less than 23, you'll need to make the following
changes to your project (which allow your app to build, even though it won't
encrypt data):

1. In `AndroidManifest.xml`, add `<uses-sdk tools:overrideLibrary="androidx.security" />`
2. In your app's `app/build.gradle`:
  - Add `multiDexEnabled true` to the `default` object, under `android`.
  - Add `implementation androidx.multidex:multidex:2.0.1` to the `dependencies`.

### Objective-C compatibility headers for React Native 0.68+
To help solve build errors that can arise when using Iterable's SDK with React
Native 0.68+, which uses Objective-C++, we've created some Objective-C
compatibility headers that you can import into your project. For details, read
[Installing Iterable's React Native SDK — Step 3.3: Import the SDK](https://support.iterable.com/hc/articles/360045714132#step-3-3-import-the-sdk).

## 1.1.0
#### Added
- Offline events processing
  This feature saves a local copy of events triggered in your app while the device is offline (up to 1000 events). When a connection is re-established and your app is in the foreground, the events will be sent to Iterable.
  Offline events processing is off by default, and we're rolling it out on a customer-by-customer basis. After you start using this version of the SDK, we'll send you a message before we enable the feature on your account (unfortunately, we can't give you an exact timeline for when this will happen). If you have any questions, talk to your Iterable customer success manager.
  To use this feature, you must follow the SDK [upgrade instructions](#upgrade-instructions-for-version-1-1-0).
#### Updated
- New properties on the `IterableCommerceItem` class
  The `IterableCommerceItem` class (which you can pass to the `trackPurchase` method on the `Iterable` class) now includes additional properties (all optional):
  - `sku` (string) - The item's SKU
  - `description` (string) - A description of the item
  - `url` (string) - A URL associated with the item
  - `imageUrl` (string) - A URL that points to an image of the item
  - `categories` (string) - Categories to associate with the item
#### Upgrade instructions for version 1.1.0
To use this version of Iterable's React Native SDK, you'll need to update your native Android application's `Application` class:
- Add this import:
  ```java
  import com.iterable.iterableapi.IterableApi;
  ```
- At the end of the `onCreate` method, add this line of code:
  ```java
  IterableApi.setContext(this);
  ```
