import { defaultLogger } from '../constants/defaults';
import { IterableLogger } from './IterableLogger';
import { IterableApi } from './IterableApi';

/**
 * Manages the authentication for the Iterable SDK.
 *
 * @example
 * ```typescript
 * const config = new IterableConfig();
 * const logger = new IterableLogger(config);
 * const authManager = new IterableAuthManager(logger);
 * ```
 */
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
    IterableAuthManager.logger?.log('pauseAuthRetries', pauseRetry);
    return IterableApi.pauseAuthRetries(pauseRetry);
  }
}
