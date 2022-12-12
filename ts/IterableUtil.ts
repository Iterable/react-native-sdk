'use strict'

export function readBoolean (dict: any, key: string): boolean {
  if (dict[key] != null) {
    return dict[key] as boolean
  } else {
    return false
  }
}
