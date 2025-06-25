const path = require('path');

module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
    android: {},
  },
  dependencies: {
    '@iterable/react-native-sdk': {
      root: __dirname,
      platforms: {
        ios: {
          // modules: true,
        },
        android: {},
      },
    },
  },
};
