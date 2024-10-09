import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

/**
 * Hook that provides information about the device orientation.
 *
 * @returns An object containing the height and width of the device, as well as
 * a boolean indicating whether the device is in portrait mode.
 *
 * @example
 * ```tsx
 * const { height, width, isPortrait } = useDeviceOrientation();
 * ```
 *
 * @category Hooks
 */
export function useDeviceOrientation(): {
  /** The height of the device */
  height: number;
  /** The width of the device */
  width: number;
  /** Whether the device is in portrait mode */
  isPortrait: boolean;
} {
  const { height, width } = useWindowDimensions();

  const [isPortrait, setIsPortrait] = useState<boolean>(height >= width);

  useEffect(() => {
    setIsPortrait(height >= width);
    //  TODO: why is height not included in the dependency array?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return { height, width, isPortrait };
}

export default useDeviceOrientation;
