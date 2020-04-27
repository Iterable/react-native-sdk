# Iterable React Native Sample Application

A basic sample application which shows how to use Iterable react native SDK.

## Setup

1. Run `npm install` in `SampleApp` folder
2. Rename `Config.sample.js` to `Config.js` in `/js/` folder.

	```javascript
	// in Config.js
	export const iterableAPIKey = "<YOUR_API_KEY>";
	```
3. For iOS, you need the following extra step

	```
	cd ios && pod install
	``` 
4. From `SampleApp` folder run iOS/Android

	```
	npm run ios|android
	```



 
