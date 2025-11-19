import { IterableCustomActionPrefix } from '../enums/IterableCustomActionPrefix';

/**
 * Gets the action prefix from a string.
 *
 * @param str - The string to get the action prefix from.
 * @returns The action prefix.
 */
export const getActionPrefix = (
  str?: string | null
): IterableCustomActionPrefix | null => {
  if (!str) return null;
  if (str.startsWith(IterableCustomActionPrefix.Action)) {
    return IterableCustomActionPrefix.Action;
  }
  if (str.startsWith(IterableCustomActionPrefix.Itbl)) {
    return IterableCustomActionPrefix.Itbl;
  }
  return null;
};
