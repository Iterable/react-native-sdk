# Iterable React Native Sample Application

A basic sample application which shows how to use Iterable react native SDK.

## Setup

Please make sure that you run each command below **in the folders mentioned**.

1. Run `yarn install` in `SampleApp/javascript` folder
2. Rename `Config.sample.js` to `Config.js` in `SampleApp/javascript/js/` folder.

	```javascript
	// in Config.js
	export const iterableAPIKey = "<YOUR_API_KEY>";
	```
3. For iOS, you need the following extra step in `SampleApp/javascript/ios` folder.

	```
	cd ios && pod install
	``` 
4. From `SampleApp/javascript` folder run iOS/Android

	```
	yarn ios|android
	```


 
