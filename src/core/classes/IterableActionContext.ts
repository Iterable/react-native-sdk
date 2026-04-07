import type { IterableActionSource } from '../enums';
import { IterableAction } from './IterableAction';

/**
 * Information related to an Iterable action.
 */
export class IterableActionContext {
  /**
   * The action associated with the context.
   */
  action: IterableAction;
  /**
   * The origin of the action.  In other words, where was the action triggered?
   */
  source: IterableActionSource;

  /**
   * The push notification payload, if the action originated from a push notification.
   *
   * This field is automatically populated when the action source is
   * {@link IterableActionSource.push}. It contains the custom payload data
   * from the push notification that triggered the action, allowing you to
   * access campaign-specific metadata in your URL or custom action handlers.
   *
   * @example
   * ```typescript
   * const config = new IterableConfig();
   * config.urlHandler = (url, context) => {
   *   if (context.pushPayload) {
   *     const promoCode = context.pushPayload.promoCode;
   *     // Use the custom payload data from the push notification
   *   }
   *   return true;
   * };
   * ```
   */
  pushPayload?: Record<string, unknown>;

  /**
   * Creates an instance of IterableActionContext.
   */
  constructor(action: IterableAction, source: IterableActionSource) {
    this.action = action;
    this.source = source;
  }

  /**
   * Creates an instance of `IterableActionContext` from a dictionary object.
   *
   * @returns A new instance of `IterableActionContext` with the provided properties.
   */
  static fromDict(dict: IterableActionContext): IterableActionContext {
    const action = IterableAction.fromDict(dict.action);
    const source = dict.source;
    return new IterableActionContext(action, source);
  }
}
