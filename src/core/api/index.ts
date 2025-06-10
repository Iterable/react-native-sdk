import TurboIterableModule from './NativeIterableModuleSpec'; // new arch
import { NativeModules } from 'react-native'; // fallback

const LegacyModule = NativeModules.RNIterableAPI;

const Iterable = TurboIterableModule ?? LegacyModule;

export default Iterable;