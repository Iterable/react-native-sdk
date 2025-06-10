import { NativeModules } from 'react-native';

import { Iterable } from '../../core/classes/Iterable';
import { IterableEmbeddedPlacement } from './IterableEmbeddedPlacement';

const RNIterableAPI = NativeModules.RNIterableAPI;

/**
 * Manages embedded messages for the current user.
 *
 * This class provides methods to interact with embedded messages, including retrieving placements.
 */
export class IterableEmbeddedManager {
  /**
   * Retrieve the current user's list of embedded placements.
   *
   * @returns A Promise that resolves to an array of embedded placements.
   */
  getPlacements(): Promise<IterableEmbeddedPlacement[]> {
    Iterable?.logger?.log('EmbeddedManager.getPlacements');

    return RNIterableAPI.getEmbeddedPlacements();
  }
}
