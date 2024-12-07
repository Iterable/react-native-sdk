/**
 * Utility class.
 *
 * TODO: Change to a util function instead of a class
 */
export class IterableUtil {
  /**
   * Reads a boolean value from a dictionary.
   *
   * @param dict - The dictionary to read from.
   * @param key - The key whose associated value is to be returned.
   * @returns The boolean value associated with the specified key, or `false` if the key does not exist or the value is not a boolean.
   */
  static readBoolean(dict: Record<string, unknown>, key: string): boolean {
    if (dict[key]) {
      return dict[key] as boolean;
    } else {
      return false;
    }
  }
}
