// TODO: Add a description
// TODO: Change to a util function instead of a class
export class IterableUtil {
  static readBoolean(dict: any, key: string): boolean {
    if (dict[key]) {
      return dict[key] as boolean;
    } else {
      return false;
    }
  }
}
