import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

// TODO: Comment
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
