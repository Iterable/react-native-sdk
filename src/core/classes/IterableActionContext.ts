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
   * Creates an instance of IterableActionContext.
   *
   * @param action - The action associated with the context.
   * @param source - The origin of the action (where the action was triggered).
   *
   * @example
   * ```typescript
   * const actionContext = new IterableActionContext(action, source);
   * ```
   */
  constructor(action: IterableAction, source: IterableActionSource) {
    this.action = action;
    this.source = source;
  }

  /**
   * Creates an instance of `IterableActionContext` from a dictionary object.
   *
   * @param dict - A dictionary object containing the action and source properties.
   * @returns A new instance of `IterableActionContext` with the provided properties.
   */
  static fromDict(dict: IterableActionContext) {
    const action = IterableAction.fromDict(dict.action);
    const source = dict.source;
    return new IterableActionContext(action, source);
  }
}
