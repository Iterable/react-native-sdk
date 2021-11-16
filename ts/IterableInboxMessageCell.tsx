'use strict'

import React, { useRef } from 'react'
import {
   View,
   Text,
   Animated,
   PanResponder,
   StyleSheet,
   TouchableOpacity
} from 'react-native'

import {
   InboxRowViewModel,
   IterableInboxMessageListItem,
   IterableInboxCustomizations,
   IterableInboxDataModel
} from '.'

type MessageCellProps = {
   key: string,
   index: number,
   last: boolean,
   dataModel: IterableInboxDataModel,
   rowViewModel: InboxRowViewModel,
   customizations: IterableInboxCustomizations,
   swipingCheck: Function,
   messageListItemLayout: Function,
   deleteRow: Function,
   handleMessageSelect: Function,
   contentWidth: number,
   isPortrait: boolean
}

const IterableInboxMessageCell = ({
   key,
   index,
   last,
   dataModel,
   rowViewModel,
   customizations,
   swipingCheck,
   messageListItemLayout,
   deleteRow,
   handleMessageSelect,
   contentWidth,
   isPortrait
}: MessageCellProps) => {
   const position = useRef(new Animated.ValueXY()).current

   let { textContainer, deleteSlider, textStyle } = styles

   deleteSlider = (isPortrait) ? deleteSlider : { ...deleteSlider, paddingRight: 40 }

   const scrollThreshold = contentWidth / 15
   const FORCING_DURATION = 350

   //If user swipes, either complete swipe or reset 
   const userSwipedLeft = (gesture: any) => {
      if (gesture.dx < -0.6 * contentWidth) {
         completeSwipe()
      } else {
         resetPosition()
         swipingCheck(false)
      }
   }

   const completeSwipe = () => {
      const x = -2000
      Animated.timing(position, {
         toValue: { x, y: 0 },
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
            position.setValue({ x: 0, y: 0 })
         },
         onPanResponderMove: (event, gesture) => {
            if (gesture.dx <= -scrollThreshold) {
               //enables swipeing when threshold is reached
               swipingCheck(true)

               //threshold value is deleted from movement
               const x = gesture.dx + scrollThreshold
               //position is set to the new value
               position.setValue({ x, y: 0 })
            }
         },
         onPanResponderRelease: (event, gesture) => {
            position.flattenOffset()
            if (gesture.dx < 0) {
               userSwipedLeft(gesture)
            }
         }
      })
   ).current

   return (
      <View>
         <View style={deleteSlider}>
            <Text style={textStyle}>DELETE</Text>
         </View>
         <Animated.View
            style={[textContainer, position.getLayout()]}
            {...panResponder.panHandlers}
         >
            <TouchableOpacity
               activeOpacity={1}
               onPress={() => {
                  handleMessageSelect(rowViewModel.inAppMessage.messageId, index)
               }}
            >
               <IterableInboxMessageListItem
                  last={last}
                  dataModel={dataModel}
                  rowViewModel={rowViewModel}
                  customizations={customizations}
                  messageListItemLayout={messageListItemLayout}
                  isPortrait={isPortrait} />
            </TouchableOpacity>
         </Animated.View>
      </View>
   )
}

const styles = StyleSheet.create({
   textContainer: {
      width: '100%',
      elevation: 2
   },

   deleteSlider: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 10,
      backgroundColor: 'red',
      position: 'absolute',
      elevation: 1,
      width: '100%',
      height: 120
   },

   textStyle: {
      fontWeight: 'bold',
      fontSize: 15,
      color: 'white'
   }
})

export default IterableInboxMessageCell