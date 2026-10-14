/**
 * The type of the `useIsFocused` hook from `@react-navigation/native`.
 */
type UseIsFocusedHook = () => boolean;

let _useIsFocused: UseIsFocusedHook | undefined;

/**
 * Attempts to load `useIsFocused` from `@react-navigation/native`.
 *
 * This is done once at module load time. If the package is not installed,
 * the import will fail and `_useIsFocused` will remain `undefined`.
 */
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  _useIsFocused = require('@react-navigation/native').useIsFocused;
} catch {
  // @react-navigation/native is not installed; this is fine.
}

/**
 * A fallback hook that always returns `true`.
 *
 * Used when `@react-navigation/native` is not installed. Since there is no
 * navigation container managing focus, the component is always considered
 * focused.
 *
 * @returns `true`
 */
function useAlwaysFocused(): boolean {
  return true;
}

/**
 * A hook that returns whether the screen is currently focused.
 *
 * If `@react-navigation/native` is installed, this delegates to its
 * `useIsFocused` hook. Otherwise, it falls back to always returning `true`,
 * which is appropriate when no navigation container is in use (the component
 * is always "focused" if there is no navigation stack managing focus).
 *
 * @returns `true` if the screen is focused (or if React Navigation is not
 * installed), `false` otherwise.
 */
export const useIsFocused: UseIsFocusedHook = _useIsFocused ?? useAlwaysFocused;
