import { useEffect } from 'react'
import { NativeEventEmitter, NativeModules } from 'react-native'

const RNIterableAPI = NativeModules.RNIterableAPI
const RNEventEmitter = new NativeEventEmitter(RNIterableAPI)

type useInboxChangedListenerProps = {
    onInboxChanged: Function
}

const useInboxChangedListener = ({ onInboxChanged }: useInboxChangedListenerProps) => {
    useEffect(() => {
        RNEventEmitter.addListener(
            "receivedIterableInboxChanged",
            () => {
               onInboxChanged()
            }
        )
        
        return RNEventEmitter.removeAllListeners("receivedIterableInboxChanged")
    }, [])
}

export default useInboxChangedListener