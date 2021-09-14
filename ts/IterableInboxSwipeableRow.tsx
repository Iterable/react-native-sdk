'use strict'

import React, { useState, useRef } from 'react'
import {
   View,
   Text,
   Dimensions,
   Animated,
   PanResponder,
   StyleSheet,
   useWindowDimensions
} from 'react-native'

import {
   InboxRowViewModel,
   IterableInboxClickableRow,
   IterableInboxCustomizations
} from '.'

import { useOrientation } from './useOrientation'

type SwipeableRowProps = {
   key: string,
   index: number,
   last: boolean,
   rowViewModel: InboxRowViewModel,
   messageListItemLayout: Function,
   customizations: IterableInboxCustomizations,
   // swipingCheck: Function,
   deleteRow: Function,
   handleMessageSelect: Function,
}

const IterableInboxSwipeableRow = ({
   index,
   last,
   rowViewModel,
   messageListItemLayout,
   customizations,
   //swipingCheck,
   deleteRow,
   handleMessageSelect,
}: SwipeableRowProps) => {
   const position = useRef(new Animated.ValueXY()).current

   const { textContainer, deleteSlider, textStyle } = styles

   const SCREEN_WIDTH = useWindowDimensions().width
   
   let [scrollStopped, setScrollStopped] = useState(false);

   const SCROLL_THRESHOLD = SCREEN_WIDTH / 15
   let FORCE_TO_OPEN_THRESHOLD = -SCREEN_WIDTH / 2
   const FORCING_DURATION = 350

   const orientation = useOrientation()

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
      }).start(() => deleteRow(rowViewModel.inAppMessage.messageId))
   }
   
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
               last={last}
               rowViewModel={rowViewModel}
               messageListItemLayout={messageListItemLayout}
               customizations={customizations}
               handleMessageSelect={(messageId: string, index: number) => handleMessageSelect(messageId, index)}
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