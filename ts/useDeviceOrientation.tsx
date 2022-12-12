import { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'

function useDeviceOrientation (): any {
  const { height, width } = useWindowDimensions()

  const [isPortrait, setIsPortrait] = useState<boolean>(height >= width)

  useEffect(() => {
    setIsPortrait(height >= width)
  }, [height, width])

  return { height, width, isPortrait }
}

export default useDeviceOrientation
