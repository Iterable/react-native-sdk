import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

/**
 * Represents the device orientation.
 */
export interface IterableDeviceOrientation {
  /** The height of the device screen */
  height: number;
  /** The width of the device screen */
  width: number;
  /** Indicates if the device is in portrait mode */
  isPortrait: boolean;
}

/* eslint-disable tsdoc/syntax */
/**
 * Custom hook to get the current device orientation.
 *
 * This hook returns the height, width, and a boolean indicating if the device is in portrait mode.
 * It listens to changes in the window dimensions and updates the orientation accordingly.
 *
 * @returns {IterableDeviceOrientation} An object containing the height, width, and a boolean `isPortrait` indicating if the device is in portrait mode.
 *
 * @category Hooks
 * @group Hooks
 *
 * @example
 * const { height, width, isPortrait } = useDeviceOrientation();
 *
 * @remarks
 * The `useEffect` hook only includes `width` in its dependency array. This is because the height and width are typically updated together,
 * and including only `width` prevents unnecessary re-renders.
 */
/* eslint-enable tsdoc/syntax */
export function useDeviceOrientation(): IterableDeviceOrientation {
  const { height, width } = useWindowDimensions();

  const [isPortrait, setIsPortrait] = useState<boolean>(height >= width);

  useEffect(() => {
    setIsPortrait(height >= width);
    // MOB-10425: why is height not included in the dependency array?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return { height, width, isPortrait };
}
