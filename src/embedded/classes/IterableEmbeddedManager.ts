import { NativeModules } from 'react-native';

import { Iterable } from '../../core/classes/Iterable';
import { IterableEmbeddedPlacement } from './IterableEmbeddedPlacement';

const RNIterableAPI = NativeModules.RNIterableAPI;

export class IterableEmbeddedManager {
  getPlacements(): Promise<IterableEmbeddedPlacement[]> {
    Iterable?.logger?.log('EmbeddedManager.getPlacements');

    return RNIterableAPI.getEmbeddedPlacements();
  }
}
