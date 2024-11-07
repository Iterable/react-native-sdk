// TODO: Add description
export enum IterableInAppTriggerType {
  /** Tries to display the in-app automatically immediately  */
  immediate = 0,
  /** Used for Push to in-app */
  event = 1,
  /** Do not display the in-app automatically via the SDK */
  never = 2,
}

export default IterableInAppTriggerType;
