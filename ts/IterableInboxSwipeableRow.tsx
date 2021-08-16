import React, { useState, useRef } from 'react'
import {
   View,
   Text,
   Dimensions,
   Animated,
   PanResponder,
   StyleSheet    
} from 'react-native';
import IterableInboxClickableRow from './IterableInboxClickableRow';
import Message from './messageType';

type SwipeableRowProps = {
   index: number,
   swipingCheck: Function,
   deleteMessage: Function,
   handleMessageSelect: Function,
   message: Message,
}

const SCREEN_WIDTH = Dimensions.get('window').width

const IterableInboxSwipeableRow = ({
   index,
   swipingCheck,
   deleteMessage,
   handleMessageSelect,
   message,
}: SwipeableRowProps) => {
   const position = useRef(new Animated.ValueXY()).current

   const { textContainer} = styles
   
   let [scrollStopped, setScrollStopped] = useState(false);
   const SCROLL_THRESHOLD = SCREEN_WIDTH / 15
   const FORCE_TO_OPEN_THRESHOLD = -SCREEN_WIDTH / 2
   const FORCING_DURATION = 350

   //stops scrolling and enables swiping when threshold is reached
   const enableScrollView = (isEnabled: boolean) => {
      if(scrollStopped !== isEnabled) {
         // swipingCheck(isEnabled)
         // setScrollStopped(isEnabled)
      }
   }

   //If user swipes, either complete swipe or reset 
   const userSwipedLeft = (gesture : any) => {
      if(gesture.dx < FORCE_TO_OPEN_THRESHOLD) {
         completeSwipe()   
      } else {
         resetPosition()
      }
   }

   const completeSwipe = () => {
      const x = -SCREEN_WIDTH
      Animated.timing(position, {
         toValue: {x, y: 0},
         duration: FORCING_DURATION,
         useNativeDriver: false   
      }).start(() => deleteMessage(message.messageId))
   }

   //
   const resetPosition = () => {
      Animated.timing(position, {
         toValue: { x: 0, y: 0 },
         duration: 200,
         useNativeDriver: false
      }).start()
   }
   
   const panResponder = useRef(
      PanResponder.create({
         onStartShouldSetPanResponder: () => false,
         onMoveShouldSetPanResponder: () => true,
         onPanResponderTerminationRequest: () => false,
         onPanResponderGrant: () => {
            position.setOffset({ 
               x: position.x._value, 
               y: 0 
            })
            position.setValue({ x: 0, y: 0 })
         },
         onPanResponderMove: (event, gesture) => {
            if(gesture.dx <= -SCROLL_THRESHOLD) {
               //enables swipeing when threshold is reached
               enableScrollView(true)
               //threshold value is deleted from movement
               const x = gesture.dx + SCROLL_THRESHOLD
               //position is set to the new value
               position.setValue({x, y: 0})
            }
         },
         onPanResponderRelease: (event, gesture) => {
            position.flattenOffset()
            if(gesture.dx < 0) {
               userSwipedLeft(gesture)
            }
         },
         onPanResponderTerminate: () => {
            Animated.spring(position, {
               toValue: {x: 0, y: 0},
               useNativeDriver: false
            }).start()
         }
      })
   ).current

   return(
      <Animated.View 
         style={[textContainer, position.getLayout()]}
         {...panResponder.panHandlers}>
         <IterableInboxClickableRow
            index={index} 
            message={message}
            handleMessageSelect={(index: number) => handleMessageSelect(index)}
         />   
      </Animated.View>   
   )
}

const styles = StyleSheet.create({
   textContainer: {
      width: '100%',
      elevation: 3,
      zIndex: 2
   }
})

export default IterableInboxSwipeableRow