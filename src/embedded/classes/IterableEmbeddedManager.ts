import { NativeModules } from 'react-native';

import type { IterableLogger } from '../../core/classes/IterableLogger';
import { IterableEmbeddedPlacement } from './IterableEmbeddedPlacement';

const RNIterableAPI = NativeModules.RNIterableAPI;

/**
 * Manages embedded messages for the current user.
 *
 * This class provides methods to interact with embedded messages, including retrieving placements.
 */
export class IterableEmbeddedManager {
  private logger?: IterableLogger;

  constructor(logger?: IterableLogger) {
    this.logger = logger;
  }

  /**
   * Sets the logger instance for this manager
   * @param logger - The logger instance to use
   */
  setLogger(logger: IterableLogger) {
    this.logger = logger;
  }

  /**
   * Retrieve the current user's list of embedded placements.
   *
   * @returns A Promise that resolves to an array of embedded placements.
   */
  getPlacements(): Promise<IterableEmbeddedPlacement[]> {
    this.logger?.log('EmbeddedManager.getPlacements');

    return RNIterableAPI.getEmbeddedPlacements();
  }
}
