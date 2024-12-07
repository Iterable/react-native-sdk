import type { IterableInAppTriggerType } from '../enums';

// TODO: Add description
export class IterableInAppTrigger {
  type: IterableInAppTriggerType;

  constructor(type: IterableInAppTriggerType) {
    this.type = type;
  }

  static fromDict(dict: {
    type: IterableInAppTriggerType;
  }): IterableInAppTrigger {
    return new IterableInAppTrigger(dict.type);
  }
}
