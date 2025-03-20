import { type ConfigPlugin } from '@expo/config-plugins';

const withIterableSDK: ConfigPlugin = (config) => {
  console.log('withIterableSDK', config);
  // iOS configuration
  // config = withInfoPlist(config, (config) => {
  //   // Add any required iOS permissions or configurations
  //   return config;
  // });

  // // Android configuration
  // config = withAndroidManifest(config, (config) => {
  //   // Add any required Android permissions or configurations
  //   return config;
  // });

  return config;
};

export default withIterableSDK;
