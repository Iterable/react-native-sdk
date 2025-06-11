import TurboIterableModule from './NativeRNIterableApi'; // new arch
import { NativeModules } from 'react-native'; // fallback

const LegacyModule = NativeModules.RNIterableAPI;

const IterableAPI = TurboIterableModule ?? LegacyModule;

export default IterableAPI;
export * from './RNEventEmitter';