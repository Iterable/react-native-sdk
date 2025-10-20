import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

/**
 * A hook that listens to the app state changes and returns the current app
 * state.
 *
 * @returns The current app state.
 *
 * @category Hooks
 * @group Hooks
 *
 * @example
 * ```typescript
 * const appState = useAppStateListener();
 * console.log(appState); // 'active', 'background', etc.
 * ```
 */
export function useAppStateListener() {
  const appStateEventName = 'change';
  const appState = useRef(AppState.currentState);
  const [appStateVisibility, setAppStateVisibility] = useState(
    appState.current
  );

  useEffect(() => {
    const listener = AppState.addEventListener(
      appStateEventName,
      (nextAppState) => {
        appState.current = nextAppState;
        setAppStateVisibility(appState.current);
      }
    );

    return () => {
      listener.remove();
    };
  }, []);

  return appStateVisibility;
}
