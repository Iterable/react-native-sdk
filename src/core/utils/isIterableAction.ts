import { IterableCustomActionPrefix } from '../enums/IterableCustomActionPrefix';

export const isIterableAction = (str: string = '') =>
  str.startsWith(IterableCustomActionPrefix.Action) ||
  str.startsWith(IterableCustomActionPrefix.Itbl);
