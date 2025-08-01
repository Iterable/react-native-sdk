import { NativeModules } from 'react-native';
import BridgelessModule from './NativeRNIterableAPI';

export const RNIterableAPI = BridgelessModule ?? NativeModules.RNIterableAPI;

export default RNIterableAPI;
