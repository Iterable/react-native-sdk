import type { IterableInAppTriggerType } from '../enums';

/**
 * Trigger information for in-app messages in the Iterable SDK.
 */
export class IterableInAppTrigger {
  /**
   * The type of the in-app trigger.
   */
  type: IterableInAppTriggerType;

  /**
   * Creates an instance of IterableInAppTrigger.
   * @param type - The type of the in-app trigger.
   */
  constructor(type: IterableInAppTriggerType) {
    this.type = type;
  }

  /**
   * Creates an IterableInAppTrigger instance from a dictionary object.
   * @param dict - The dictionary containing the type of the in-app trigger.
   * @returns A new instance of IterableInAppTrigger.
   */
  static fromDict(dict: {
    type: IterableInAppTriggerType;
  }): IterableInAppTrigger {
    return new IterableInAppTrigger(dict.type);
  }
}
