import RNIterableAPI from '../../api';
import { defaultLogger } from '../constants/defaults';
import { IterableLogger } from './IterableLogger';

export class IterableAuthManager {
  /**
   * The logger for the Iterable SDK.
   */
  static logger: IterableLogger = defaultLogger;

  constructor(logger: IterableLogger) {
    IterableAuthManager.logger = logger;
  }

  /**
   * Pause the authentication retry mechanism.
   *
   * @param pauseRetry - Whether to pause the authentication retry mechanism
   *
   * @example
   * ```typescript
   * Iterable.pauseAuthRetries(true);
   * ```
   */
  pauseAuthRetries(pauseRetry: boolean) {
    IterableAuthManager.logger?.log('pauseAuthRetries');
    RNIterableAPI.pauseAuthRetries(pauseRetry);
  }
}
