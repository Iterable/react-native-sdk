// import { type ConfigPlugin } from '@expo/config-plugins';

// const withIterableSDK: ConfigPlugin = (config) => {
//   console.log('withIterableSDK', config);
//   // iOS configuration
//   // config = withInfoPlist(config, (config) => {
//   //   // Add any required iOS permissions or configurations
//   //   return config;
//   // });

//   // // Android configuration
//   // config = withAndroidManifest(config, (config) => {
//   //   // Add any required Android permissions or configurations
//   //   return config;
//   // });

//   return config;
// };

// export default withIterableSDK;

import { type ConfigPlugin, createRunOncePlugin } from '@expo/config-plugins';

const withIterableSDK: ConfigPlugin = (config, _props) => {
  console.log(` _props:`, _props);
  console.log(` config:`, config);
  // const props = _props || { androidApiKey: '', iosApiKey: '', baseUrl: '' };

  // config = withAndroidBrazeSdk(config, props);
  // config = withIOSBrazeSdk(config, props);

  return config;
};

const pkg = require('../package.json');

export default createRunOncePlugin(withIterableSDK, pkg.name, pkg.version);
