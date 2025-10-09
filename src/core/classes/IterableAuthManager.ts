import RNIterableAPI from '../../api';
import { IterableConfig } from './IterableConfig';
import { IterableLogger } from './IterableLogger';

export class IterableAuthManager {
  /**
   * The logger for the Iterable SDK.
   */
  private _logger: IterableLogger = new IterableLogger(new IterableConfig());

  constructor(logger: IterableLogger) {
    this._logger = logger;
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
    this._logger?.log('pauseAuthRetries');
    RNIterableAPI.pauseAuthRetries(pauseRetry);
  }
}
