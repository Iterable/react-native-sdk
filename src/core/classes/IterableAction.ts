/**
 * IterableAction represents an action defined as a response to user events.
 * It is currently used in push notification actions (open push & action buttons).
 */
export class IterableAction {
  /**
   * The type of iterable action.
   */
  type: string;
  /**
   * TODO: Review
   * Optional string data associated with the IterableAction.
   */
  data?: string;
  /**
   * TODO: Review
   * Optional user input string.
   * This property can be used to store input provided by the user.
   */
  userInput?: string;

  /**
   * Creates an instance of IterableAction.
   *
   * @param type - The type of the action.
   * @param data - Optional data associated with the action.
   * @param userInput - Optional user input related to the action.
   */
  constructor(type: string, data?: string, userInput?: string) {
    this.type = type;
    this.data = data;
    this.userInput = userInput;
  }

  /**
   * Creates an instance of `IterableAction` from a dictionary object.
   *
   * @param dict - The dictionary object containing the properties to initialize the `IterableAction` instance.
   * @returns A new instance of `IterableAction` initialized with the provided dictionary properties.
   */
  static fromDict(dict: IterableAction): IterableAction {
    return new IterableAction(dict.type, dict.data, dict.userInput);
  }
}
