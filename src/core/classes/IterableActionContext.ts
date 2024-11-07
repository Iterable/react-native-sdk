import type { IterableActionSource } from 'core/enums';
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

  static fromDict(dict: any): IterableActionContext {
    const action = IterableAction.fromDict(dict.action);
    const source = dict.source as IterableActionSource;
    return new IterableActionContext(action, source);
  }
}

export default IterableActionContext;
