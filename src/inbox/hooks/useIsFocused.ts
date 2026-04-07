/**
 * Safe wrapper around `@react-navigation/native`'s `useIsFocused` hook.
 *
 * If `@react-navigation/native` is not installed (i.e., the consumer does not
 * use React Navigation), the hook falls back to always returning `true` —
 * meaning the component behaves as if it is always focused.
 *
 * This makes `@react-navigation/native` an optional peer dependency so that
 * consumers who don't use the Inbox UI (or who use a different navigation
 * library) are not forced to install it.
 *
 * @see https://github.com/Iterable/react-native-sdk/issues/770
 */

// Use globalThis.require to avoid needing @types/node in the tsconfig while
// still performing a synchronous optional require at module-load time.
declare const globalThis: { require?: (id: string) => unknown };

let useIsFocusedFromNav: (() => boolean) | undefined;

try {
  const reactNavigation = globalThis.require?.('@react-navigation/native') as
    | { useIsFocused?: () => boolean }
    | undefined;
  useIsFocusedFromNav = reactNavigation?.useIsFocused;
} catch {
  // @react-navigation/native is not installed — that's fine.
}

/**
 * Returns whether the screen is currently focused.
 *
 * Uses React Navigation's `useIsFocused` when available, otherwise defaults
 * to `true`.
 */
export function useIsFocused(): boolean {
  if (useIsFocusedFromNav) {
    return useIsFocusedFromNav();
  }
  return true;
}
