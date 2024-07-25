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

# Loren Notes

- Runs on `react-native 0.68`, but throws an empty object error
- If using `nvm` on an M1, you need to add `.xcode.env`. This should be
  documented.
- `Iterable-iOS-SDK` has been updated to `6.5.4`. Update here?
- Added script for setting the platform to `12.0` everywhere
- Added script to make M1 work
- Added script to make flipper work, though it still doesn't appear to be working
- Fixed script in AppDelegate which was causing build failure
- Updates to `.zshrc` needed to be made for M1
  -- https://github.com/nvm-sh/nvm/issues/2881
  -- https://noahpeeters.de/posts/apple-silicon/homebrew-setup/
- updates to `.metro.config.js`
- updates to `babel.config.js`
- updated `reactNativePath`:
  https://stackoverflow.com/questions/74245902/ios-invalid-podfile-file-no-implicit-conversion-of-nil-into-string
- downgrade `react-native-ionicons` to @^4.x
- added `react-native-asset`: https://github.com/ant-design/ant-design-icons/issues/535
