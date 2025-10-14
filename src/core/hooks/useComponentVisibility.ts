import {
  View,
  Dimensions,
  AppState,
  type LayoutChangeEvent,
} from 'react-native';
import { useRef, useState, useCallback, useEffect } from 'react';

interface UseVisibilityOptions {
  threshold?: number; // Percentage of component that must be visible (0-1)
  checkOnAppState?: boolean; // Whether to check app state (active/background)
  checkInterval?: number; // How often to check visibility in ms (0 = only on layout changes)
  enablePeriodicCheck?: boolean; // Whether to enable periodic checking for navigation changes
}

interface LayoutInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useComponentVisibility = (options: UseVisibilityOptions = {}) => {
  const {
    threshold = 0.1,
    checkOnAppState = true,
    checkInterval = 0, // Default to only check on layout changes
    enablePeriodicCheck = true, // Enable periodic checking by default for navigation
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const componentRef = useRef<View>(null);
  const [layout, setLayout] = useState<LayoutInfo>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle layout changes
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setLayout({ x, y, width, height });
  }, []);

  // Check if component is visible on screen using measure
  const checkVisibility = useCallback((): Promise<boolean> => {
    if (!componentRef.current || layout.width === 0 || layout.height === 0) {
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      componentRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        const screenHeight = Dimensions.get('window').height;
        const screenWidth = Dimensions.get('window').width;

        // Calculate visible area using page coordinates
        const visibleTop = Math.max(0, pageY);
        const visibleBottom = Math.min(screenHeight, pageY + height);
        const visibleLeft = Math.max(0, pageX);
        const visibleRight = Math.min(screenWidth, pageX + width);

        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);

        const visibleArea = visibleHeight * visibleWidth;
        const totalArea = height * width;
        const visibilityRatio = totalArea > 0 ? visibleArea / totalArea : 0;

        resolve(visibilityRatio >= threshold);
      });
    }).catch(() => {
      // Fallback to layout-based calculation if measure fails
      const screenHeight = Dimensions.get('window').height;
      const screenWidth = Dimensions.get('window').width;

      const visibleTop = Math.max(0, layout.y);
      const visibleBottom = Math.min(screenHeight, layout.y + layout.height);
      const visibleLeft = Math.max(0, layout.x);
      const visibleRight = Math.min(screenWidth, layout.x + layout.width);

      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibleWidth = Math.max(0, visibleRight - visibleLeft);

      const visibleArea = visibleHeight * visibleWidth;
      const totalArea = layout.height * layout.width;
      const visibilityRatio = totalArea > 0 ? visibleArea / totalArea : 0;

      return visibilityRatio >= threshold;
    });
  }, [layout, threshold]);

  // Update visibility state
  const updateVisibility = useCallback(async () => {
    const isComponentVisible = await checkVisibility();
    const isAppActive = !checkOnAppState || appState === 'active';
    const newVisibility = isComponentVisible && isAppActive;

    setIsVisible(newVisibility);
  }, [checkVisibility, appState, checkOnAppState]);

  // Update visibility when layout or app state changes
  useEffect(() => {
    updateVisibility();
  }, [updateVisibility]);

  // Set up periodic checking for navigation changes
  useEffect(() => {
    const interval =
      checkInterval > 0 ? checkInterval : enablePeriodicCheck ? 500 : 0;

    if (interval > 0) {
      intervalRef.current = setInterval(updateVisibility, interval);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
    return undefined;
  }, [checkInterval, enablePeriodicCheck, updateVisibility]);

  // Listen to app state changes
  useEffect(() => {
    if (!checkOnAppState) return;

    const handleAppStateChange = (nextAppState: string) => {
      setAppState(nextAppState as typeof AppState.currentState);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    return () => subscription?.remove();
  }, [checkOnAppState]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isVisible,
    componentRef,
    handleLayout,
    appState,
    layout,
  };
};
