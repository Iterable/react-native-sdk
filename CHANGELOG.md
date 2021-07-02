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