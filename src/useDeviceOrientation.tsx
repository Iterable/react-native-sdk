import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

export function useDeviceOrientation() {
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
