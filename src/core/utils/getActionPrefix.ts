import { IterableCustomActionPrefix } from '../enums/IterableCustomActionPrefix';

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
