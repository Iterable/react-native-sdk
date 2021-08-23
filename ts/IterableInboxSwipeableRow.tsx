'use strict'

import React, { useState, useRef } from 'react'
import {
   View,
   Text,
   Dimensions,
   Animated,
   PanResponder,
   StyleSheet    
} from 'react-native'

import IterableInboxClickableRow from './IterableInboxClickableRow'
import InboxRowViewModel from './InboxRowViewModel'
import Customization from './customizationType'

type SwipeableRowProps = {
   index: number,
   message: InboxRowViewModel,
   customization: Customization,
   // swipingCheck: Function,
   deleteMessage: Function,
   handleMessageSelect: Function,
}

const SCREEN_WIDTH = Dimensions.get('window').width

const IterableInboxSwipeableRow = ({
   index,
   message,
   customization,
   //swipingCheck,
   deleteMessage,
   handleMessageSelect,
}: SwipeableRowProps) => {
   const position = useRef(new Animated.ValueXY()).current

   const { textContainer, deleteSlider, textStyle } = styles
   
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
      }).start(() => deleteMessage(message.inAppMessage.messageId))
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
      <View>
         <Animated.View style={deleteSlider}>
            <Text style={textStyle}>DELETE</Text>   
         </Animated.View>
         <Animated.View 
            style={[textContainer, position.getLayout()]}
            {...panResponder.panHandlers}
         >
            <IterableInboxClickableRow
               index={index}
               message={message}
               customization={customization}
               handleMessageSelect={(id: string, index: number) => handleMessageSelect(id, index)}
            />   
         </Animated.View>
      </View>   
   )
}

const styles = StyleSheet.create({
   textContainer: {
      width: '100%',
      zIndex: 2
   },

   deleteSlider: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 10,
      backgroundColor: 'red',
      position: 'absolute',
      elevation: 3,
      width: '100%',
      height: 100,
      zIndex: 1
   },

   textStyle: {
      fontWeight: 'bold',
      fontSize: 15,
      color: 'white'
   }
})

export default IterableInboxSwipeableRow