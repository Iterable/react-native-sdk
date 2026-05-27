import { NativeModules } from 'react-native';

import IterableTurboModule from './NativeRNIterableAPI';

// Production: TurboModule from codegen (New Architecture).
// Jest: IterableTurboModule is undefined; tests provide MockRNIterableAPI via NativeModules.
const RNIterableAPI = IterableTurboModule ?? NativeModules.RNIterableAPI;

export { RNIterableAPI };
export default RNIterableAPI;
