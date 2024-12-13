import type { IterableActionSource } from '../enums';
import { IterableAction } from './IterableAction';

/**
 * TODO: Add description
 */
export class IterableActionContext {
  action: IterableAction;
  source: IterableActionSource;

  constructor(action: IterableAction, source: IterableActionSource) {
    this.action = action;
    this.source = source;
  }

  static fromDict(dict: IterableActionContext): IterableActionContext {
    const action = IterableAction.fromDict(dict.action);
    const source = dict.source;
    return new IterableActionContext(action, source);
  }
}
