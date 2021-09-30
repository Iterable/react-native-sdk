import { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'

const useDeviceOrientation = () => {
   const { height, width } = useWindowDimensions()

   const [isPortrait, setIsPortrait] = useState<boolean>(height >= width)

   useEffect(() => {
      setIsPortrait(height >= width)
   }, [width])

   return { height, width, isPortrait }
}

export default useDeviceOrientation