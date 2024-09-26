import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

export function useDeviceOrientation() {
  const { height, width } = useWindowDimensions();

  const [isPortrait, setIsPortrait] = useState<boolean>(height >= width);

  useEffect(() => {
    setIsPortrait(height >= width);
  }, [width, height]);

  return { height, width, isPortrait };
}

export default useDeviceOrientation;
