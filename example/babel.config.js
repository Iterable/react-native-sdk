const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

// module.exports = getConfig(
//   {
//     presets: ['module:@react-native/babel-preset'],
//     plugins: ['module:react-native-dotenv'],
//   },
//   { root, pkg }
// );

module.exports = function (api) {
  api.cache(false);

  return getConfig(
    {
      presets: ['module:@react-native/babel-preset'],
      plugins: ['module:react-native-dotenv'],
    },
    { root, pkg }
  );
};
