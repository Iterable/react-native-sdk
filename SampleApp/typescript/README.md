# Iterable React Native Sample Application

A basic sample application which shows how to use Iterable react native SDK.

## Setup

Please make sure that you run each command below **in the folders mentioned**.

1. Run `yarn install` in `SampleApp/typescript` folder.
2. Rename `Config.sample.ts` to `Config.ts` in `SampleApp/typescript/ts/` folder.

	```javascript
	// in Config.ts
	export const iterableAPIKey = "<YOUR_API_KEY>"
	```
3. For iOS, you need the following extra step in `SampleApp/typescript/ios` folder.

	```
	cd ios && pod install
	``` 
4. From `SampleApp/typescript` folder run iOS/Android.

	```
	yarn ios|android
	```



 
