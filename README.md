# Iterable React Native SDK

### Resources

- [Iterable iOS SDK](https://github.com/Iterable/swift-sdk)
- [Iterable Android SDK](https://github.com/Iterable/iterable-android-sdk)
- [API docs](https://iterable.github.io/react-native-sdk/modules/_iterable_.html)

### Requirements:

 - Xcode 11+
 - iOS: Deployment target 10.0+
 - Android: minSdkVersion 16+, compileSdkVersion 28+
 - React Native >= 0.60.0
 - React Native cli >= 2.0.1

## Install

```
yarn add @iterable/react-native-sdk
```
or

```
npm install @iterable/react-native-sdk
```

## Sample Application

This repository contains the following sample application

- [Sample Application](https://github.com/Iterable/react-native-sdk/blob/master/SampleApp)

## iOS Setup

1. Install pods

	```bash
	cd ios && pod install
	```
		
	If your app will receive rich push notification containing media
	attachments (images, etc.) and/or custom buttons, add the
	**Iterable-iOS-AppExtensions** pod to your project's
	`Notification Service Extension` target.

	```ruby
	target '<YOUR-APP-NOTIFICATION-EXTENSION-TARGET-NAME>' do
    	pod 'Iterable-iOS-AppExtensions'
	end
	```
	Please see [here](https://support.iterable.com/hc/articles/360035451931#configure-support-for-rich-push-notifications)
	regarding how to setup rich push notifications.

2. Add the following capabilities to your application target as needed.

	- `Background Modes - Remote notifications` - needed for in-app messages
	- `Push Notifications` - needed for push messages
	- `Associated Domains` - needed for deep linking. Please see more information [here](https://support.iterable.com/hc/articles/360035496511).

3. To enable in-app messages and push notifications, set both of the following in your `AppDelegate` file
	
	```swift
	// Needed to register token for messaging
	func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
	    IterableAPI.register(token: deviceToken)
	}

	// Needed to receive silent push notifications for in-app messages
	func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
   		IterableAppIntegration.application(application, didReceiveRemoteNotification: userInfo, fetchCompletionHandler: completionHandler)
	}		
	```

	Now you should be able to retrieve in-app messages without any further configuration.

4. To enable push notifications, call Apple's
[`requestAuthorization`](https://developer.apple.com/documentation/usernotifications/unusernotificationcenter/1649527-requestauthorization)
method on [`UNNotificationCenter`](https://developer.apple.com/documentation/usernotifications/unusernotificationcenter)
to prompt the user for these permissions. Before requesting authorization,
remember to set the `delegate` property for `UNUserNotificationCenter.current()`.

	```swift
		UNUserNotificationCenter.current().delegate = self
		UNUserNotificationCenter.current().requestAuthorization(options:[.alert, .badge, .sound]) { (success, error) in
    		// ...
		}
	```

	```swift
	extension AppDelegate: UNUserNotificationCenterDelegate {
 	    // App is running in the foreground
   		public func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        	completionHandler([.alert, .badge, .sound])
    	}
		
	    // The method will be called on the delegate when the user responded to the notification by opening the application, dismissing the notification or choosing a UNNotificationAction. The delegate must be set before the application returns from applicationDidFinishLaunching:.
    	public func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
			IterableAppIntegration.userNotificationCenter(center, didReceive: response, withCompletionHandler: completionHandler)
    	}
	}
	```

5. To handle Iterable deep link URLs of the form `https://links.yourcompany.com/a/3906b9d2bd8`,
which are used to track email clicks, you will have to pass this URL from
`application(_:continue:restorationHandler:)` to `IterableAPI` as below:

	```swift
    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        ITBInfo()
        guard let url = userActivity.webpageURL else {
            return false
        }

        return IterableAPI.handle(universalLink: url)
    }
	```

	If you pass a regular URL to `IterableAPI.handle(universalLink:)`, that URL
	will be passed unaltered to `IterableConfig.urlDelegate`. If you pass an
	Iterable deep link uURLrl to `IterableAPI.handle(universalLink:)`, we will
	convert this URL to a regular URL and pass the resolved URL to
	`IterableConfig.urlDelegate`. 
	
	We recommend handling **all URLs** in `IterableConfig.urlDelegagte`. This way
	you ca  have all of your URL handling logic in one place.
	
	Please see [Configuring the SDK](#configuring-the-sdk) section below to see
	how to set `IterableConfig.urlDelegate`.
	
> &#x1f4a1; You can take a look at our sample [AppDelegate](https://github.com/Iterable/react-native-sdk/blob/master/SampleApp/ios/SampleApp/AppDelegate.swift)
file to see an example of the above mentioned changes.

## Android Setup

1. Step 1
2. Step 2

## Configuring the React Native SDK

1. Import Iterable react native components

	```javascript
	import { Iterable, IterableConfig } from 'react-native-iterable';
	```
2. Set an API Key
	
	```javascript
	const config = IterableConfig();
	Iterable.initialize('<YOUR_API_KEY>', config);
	```	
	
3. Set userId or email

	```javascript
	Iterable.email = '<USER_EMAIL_ADDRESS>';
	```

	> &#x26A0; Don't specify a value for both `email` and `userId` in the same
	session, as they will be treated as different users by the SDK. Only use
	one type of identifier, `email` or `userId`, to identify the user.

4. To handle URLs coming from in-app messages and push messages as well as to
handle Iterable deep link URLs coming from emails, you will have to set
`IterableConfig.urlDelegate` to handle the URL. Please see the example below.
	
	```javascript
	const config = new IterableConfig()

	config.urlDelegate = (url, context) => {
		if (url.match(/product\/([^\/]+)/i)) {
			this.navigate(match[1]);
			return true; // handled
		}

		return false; // not handled
   }

   Iterable.initialize('<YOUR_API_KEY>', config);
   ```
	
## License

The MIT License

See [LICENSE](LICENSE.md)

## Want to contribute?

This library is open source, and we will look at pull requests!

See [CONTRIBUTING](CONTRIBUTING.md) for more information.
