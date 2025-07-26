/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
import { NativeModules } from 'react-native';
import BridgelessModule from './NativeRNIterableAPI';

export const RNIterableAPI = BridgelessModule ?? NativeModules.RNIterableAPI;

export default RNIterableAPI;
