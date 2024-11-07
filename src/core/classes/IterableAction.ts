/**
 * IterableAction represents an action defined as a response to user events.
 * It is currently used in push notification actions (open push & action buttons).
 */
export class IterableAction {
  type: string;
  data?: string;
  userInput?: string;

  constructor(type: string, data?: string, userInput?: string) {
    this.type = type;
    this.data = data;
    this.userInput = userInput;
  }

  static fromDict(dict: IterableAction): IterableAction {
    return new IterableAction(dict.type, dict.data, dict.userInput);
  }
}

export default IterableAction;
