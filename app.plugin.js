const { withPlugins } = require('@expo/config-plugins');

const withIterableSDK = (config) => {
  return withPlugins(config, [
    // Add Iterable SDK specific configurations
    (config) => {
      // Ensure the config object exists
      if (!config.plugins) {
        config.plugins = [];
      }

      // Return the modified config
      return config;
    },
  ]);
};

module.exports = withIterableSDK;
