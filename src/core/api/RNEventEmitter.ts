import { NativeEventEmitter, NativeModules } from 'react-native';

const RNIterableAPI = NativeModules.RNIterableAPI;
export const RNEventEmitter = new NativeEventEmitter(RNIterableAPI);