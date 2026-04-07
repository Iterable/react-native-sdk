/**
 * A wrapper around `useIsFocused` from `@react-navigation/native` that
 * gracefully falls back to `true` when react-navigation is not installed.
 *
 * This allows the SDK to work without requiring `@react-navigation/native`
 * as a hard dependency. Users who do not use react-navigation (or do not use
 * the inbox feature with navigation) will not need to install it.
 *
 * @see https://github.com/Iterable/react-native-sdk/issues/770
 */

let reactNavigationHook: (() => boolean) | undefined;

try {
  // Dynamic import via require is necessary here to gracefully handle the case
  // where @react-navigation/native is not installed.
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const reactNavigation = require('@react-navigation/native');
  reactNavigationHook = reactNavigation.useIsFocused;
} catch {
  // @react-navigation/native is not installed
}

/**
 * Returns whether the screen is currently focused.
 *
 * If `@react-navigation/native` is installed, this delegates to its
 * `useIsFocused` hook. Otherwise it returns `true` (always focused).
 */
export function useIsFocused(): boolean {
  if (reactNavigationHook) {
    return reactNavigationHook();
  }
  return true;
}
