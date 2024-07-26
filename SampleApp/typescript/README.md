# Sample App - TypeScript

This sample app demonstrates how to use Iterable's React Native SDK in a
TypeScript-based React Native application.

## Running this sample

To run this sample:

1.  In the **SampleApp/typescript** folder, run `yarn install`.

2.  In the **SampleApp/typescript/ts** folder, rename **Config.sample.ts** to
    **Config.ts**.

3.  Provide a _Mobile_ [API key](https://support.iterable.com/hc/articles/360043464871)
    for Iterable in the new **Config.ts** file:

        	```typescript
        	// in Config.js
        	export const iterableAPIKey = "<YOUR_API_KEY>";
        	```

        	**WARNING**: Never use _Standard_ Iterable API keys in client-side
        	code of any kind (for example, web or mobile). These API keys can access all
        	of your Iterable project's data, and they could potentially be compromised if
        	used in client-side code. In mobile apps, only use _Mobile_ API keys.

4.  In the **SampleApp/typescript/ios** folder, install various iOS dependencies
    by running `pod install`.

5.  Run the app from the **SampleApp/typescript** folder by running either
    `yarn ios` or `yarn android`.

# Loren changes

- added script to update targets, fix M1/Silicone issues, fix flipper in ts
  podfile
- updated `Iterable-iOS-SDK` to `6.5.4`
- patched yoga per instructions here:
  https://stackoverflow.com/questions/75897834/use-of-bitwise-with-boolean-operands-xcode-14-3-fails-builds-using-react-n
- changed target > build phases > bundle react native code and images shell to:

  ````
  set -e

      	export NODE_BINARY=node
      	export NODE_OPTIONS=--openssl-legacy-provider
      	../node_modules/react-native/scripts/react-native-xcode.sh
      	```

  ````

- updated react-native
- updated metro config: https://github.com/facebook/metro/issues/1028

## Errors

### TypeError: Cannot read properties of undefined (reading 'transformFile')

```
error: TypeError: Cannot read properties of undefined (reading 'transformFile')
    at /Users/Loren.Posen/mobile/RN/react-native-sdk/SampleApp/typescript/node_modules/metro/src/Bundler.js:95:34
    at Generator.next (<anonymous>)
    at asyncGeneratorStep (/Users/Loren.Posen/mobile/RN/react-native-sdk/SampleApp/typescript/node_modules/metro/src/Bundler.js:14:24)
    at _next (/Users/Loren.Posen/mobile/RN/react-native-sdk/SampleApp/typescript/node_modules/metro/src/Bundler.js:36:9)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
```

- https://github.com/facebook/metro/issues/1205
- https://github.com/facebook/metro/issues/1051
