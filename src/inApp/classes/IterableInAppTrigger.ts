import type { IterableInAppTriggerType } from 'inApp/enums';

// TODO: Add description
export class IterableInAppTrigger {
  type: IterableInAppTriggerType;

  constructor(type: IterableInAppTriggerType) {
    this.type = type;
  }

  static fromDict(dict: any): IterableInAppTrigger {
    const type = dict.type as
      | IterableInAppTriggerType
      | IterableInAppTriggerType.immediate;
    return new IterableInAppTrigger(type);
  }
}
