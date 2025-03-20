// Using CommonJS syntax instead of ES modules
// const { withPlugins } = require('@expo/config-plugins');

// const withIterableSDK = (config) => {
//   return withPlugins(config, [
//     // Your plugin modifications will go here
//   ]);
// };

// module.exports = withIterableSDK;

// /Users/Loren.Posen/mobile/RN/react-native-sdk/lib/commonjs/plugin/withIterableSDK.js

module.exports = require('./lib/commonjs/plugin/withIterableSDK');
