import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

/**
 * Hook that returns the current state of the app.
 *
 * @returns {AppState} The current state of the app.
 *
 * @example
 * ```tsx
 * const appState = useAppStateListener(); // 'active', 'background' etc.
 * ```
 *
 * @category Hooks
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

export default useAppStateListener;
