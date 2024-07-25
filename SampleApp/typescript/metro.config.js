const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const metroConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const sampleAppConfig = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};

module.exports = mergeConfig(metroConfig, sampleAppConfig);
