'use strict'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class IterableUtil {
  static readBoolean (dict: any, key: string): boolean {
    if (dict[key] != null) {
      return dict[key] as boolean
    } else {
      return false
    }
  }
}
