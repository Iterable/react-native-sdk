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