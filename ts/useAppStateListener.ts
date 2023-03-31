import { useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'

function useAppStateListener (): string {
  const appStateEventName = 'change'
  const appState = useRef(AppState.currentState)
  const [appStateVisibility, setAppStateVisibility] = useState(appState.current)

  useEffect(() => {
    AppState.addEventListener(
      appStateEventName,
      (nextAppState) => {
        appState.current = nextAppState
        setAppStateVisibility(appState.current)
      }
    )

    return () => {
      AppState.removeEventListener(
        appStateEventName,
        () => { }
      )
    }
  }, [])

  return appStateVisibility
}

export default useAppStateListener
