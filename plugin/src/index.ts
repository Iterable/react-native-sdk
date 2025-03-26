import { type ConfigPlugin } from '@expo/config-plugins';

const withIterableSDK: ConfigPlugin<{ name?: string }> = (config, { name = 'my-app' } = {}) => {
  console.log('running with fn');
  config.name = name;
  return config;
};

export default withIterableSDK;
