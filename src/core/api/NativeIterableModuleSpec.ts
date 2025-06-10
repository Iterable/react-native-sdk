import { type TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  trackEvent(eventName: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNIterableAPI');