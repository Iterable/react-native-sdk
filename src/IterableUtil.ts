// TODO: Add a description
export class IterableUtil {
  static readBoolean(dict: any, key: string): boolean {
    if (dict[key]) {
      return dict[key] as boolean;
    } else {
      return false;
    }
  }
}

export default IterableUtil;