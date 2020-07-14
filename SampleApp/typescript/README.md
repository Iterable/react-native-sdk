# Sample App - TypeScript

This sample app demonstrates how to use Iterable's React Native SDK in a
TypeScript-based React Native application.

## Running this sample

To run this sample:

1. In the **SampleApp/typescript** folder, run `yarn install`.

2. In the **SampleApp/typescript/ts** folder, rename **Config.sample.ts** to
   **Config.ts**.

3. Provide a _Mobile_ [API key](https://support.iterable.com/hc/articles/360043464871) 
   for Iterable in the new **Config.ts** file:

	```typescript
	// in Config.js
	export const iterableAPIKey = "<YOUR_API_KEY>";
	```

	**WARNING**: Never use _Standard_ Iterable API keys in client-side
	code of any kind (for example, web or mobile). These API keys can access all
	of your Iterable project's data, and they could potentially be compromised if
	used in client-side code. In mobile apps, only use _Mobile_ API keys.

4. In the **SampleApp/typescript/ios** folder, install various iOS dependencies
   by running `pod install`.

5. Run the app from the **SampleApp/typescript** folder by running either
   `yarn ios` or `yarn android`.

