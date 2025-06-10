import { NativeModules } from 'react-native';

import { Iterable } from '../../core/classes/Iterable';
import type { IterableEmbeddedMessage } from './IterableEmbeddedMessage';

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
  getMessages(): Promise<IterableEmbeddedMessage[]> {
    Iterable?.logger?.log('EmbeddedManager.getMessages');

    return RNIterableAPI.getEmbeddedMessages();
  }
}
