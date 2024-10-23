const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

module.exports = function (api) {
  api.cache(false);

  return getConfig(
    {
      presets: ['module:@react-native/babel-preset'],
      plugins: [
        [
          'module:react-native-dotenv',
          {
            envName: 'APP_ENV',
            moduleName: '@env',
            path: '.env',
            blocklist: null,
            allowlist: null,
            blacklist: null, // DEPRECATED
            whitelist: null, // DEPRECATED
            safe: false,
            allowUndefined: true,
            verbose: false,
          },
        ],
      ],
    },
    { root, pkg }
  );
};
