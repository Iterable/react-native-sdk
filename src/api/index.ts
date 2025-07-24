import { NativeModules } from 'react-native';

export const isTurboModuleEnabled = global.__turboModuleProxy != null;

const getNativeModule = () => {
  if (isTurboModuleEnabled) {
    return require('./NativeRNIterableAPI').default;
  }
  return NativeModules.RNIterableAPI;
};

export const api = getNativeModule();

export default api;
