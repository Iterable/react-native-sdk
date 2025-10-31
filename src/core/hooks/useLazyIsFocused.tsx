import { useEffect, useState, type ReactElement } from 'react';

/**
 * Component that uses the useIsFocused hook.
 * This is only rendered when the navigation module is available.
 */
function FocusTrackerWithHook({
  onFocusChange,
  useIsFocused,
}: {
  onFocusChange: (focused: boolean) => void;
  useIsFocused: () => boolean;
}): null {
  // Call the hook unconditionally since this component only renders when the hook is available
  const isFocused = useIsFocused();

  useEffect(() => {
    onFocusChange(isFocused);
  }, [isFocused, onFocusChange]);

  return null;
}

/**
 * A hook that lazily loads `useIsFocused` from @react-navigation/native if available.
 * Returns `true` by default if @react-navigation/native is not installed.
 * This allows the package to work for users who don't have @react-navigation/native installed.
 *
 * @returns A tuple containing the focus state and a component to render that tracks focus.
 */
export function useLazyIsFocused(): [boolean, ReactElement | null] {
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [navigationModule, setNavigationModule] = useState<
    typeof import('@react-navigation/native') | null
  >(null);

  // Lazy load the @react-navigation/native module
  useEffect(() => {
    let mounted = true;

    import('@react-navigation/native')
      .then((module) => {
        if (mounted && 'useIsFocused' in module) {
          setNavigationModule(module);
        }
      })
      .catch(() => {
        // Module not available - will default to true (already set)
      });

    return () => {
      mounted = false;
    };
  }, []);

  // If navigation module is available, render a component that uses the hook
  const focusTracker =
    navigationModule && 'useIsFocused' in navigationModule ? (
      <FocusTrackerWithHook
        onFocusChange={setIsFocused}
        useIsFocused={navigationModule.useIsFocused}
      />
    ) : null;

  return [isFocused, focusTracker];
}
