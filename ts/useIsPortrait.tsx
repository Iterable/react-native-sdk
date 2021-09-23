import { useEffect, useState } from "react"
import { Dimensions } from "react-native"

const isPortraitFunc = () => {
   const dim = Dimensions.get('screen')
   return dim.height >= dim.width
} 

export function useIsPortrait(): boolean {
   const [isPortrait, setIsPortrait] = useState<boolean> (
      isPortraitFunc()
   )

   useEffect(() => {
      const callback = () => setIsPortrait(isPortraitFunc())
      Dimensions.addEventListener('change', callback)
      return () => {
         Dimensions.removeEventListener('change', callback)    
      }
   }, [])

   return isPortrait
}