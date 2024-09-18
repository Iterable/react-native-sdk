import { useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

function useAppStateListener(): AppStateStatus {
  const appStateEventName = 'change';
  const appState = useRef(AppState.currentState);
  const [appStateVisibility, setAppStateVisibility] = useState(appState.current);

  useEffect(() => {
    const listener = AppState.addEventListener(appStateEventName, (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisibility(appState.current);
    });

    return () => {
      listener?.remove();
    };
  }, []);

  return appStateVisibility;
}

export default useAppStateListener;
