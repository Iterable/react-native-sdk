'use strict'
import React, { useState } from 'react'
import {
   View, 
   ScrollView,
   LayoutAnimation,  
   StyleSheet,
   TouchableHighlight,
   Animated 
} from 'react-native'
//import IterableInboxClickableRow from './IterableInboxClickableRow'
import IterableInboxSwipeableRow from './IterableInboxSwipeableRow'
import Message from "./messageType"

type MessageListProps = {
   messages: Message[],
   deleteMessage: Function,
   handleMessageSelect: Function  
}

const IterableInboxMessageList = ({ messages, deleteMessage, handleMessageSelect }: MessageListProps) => {
   const [swiping, setSwiping] = useState(false)

   const renderMessageCells = (messages: Message[]) => {
      return messages.map((message, index) => {
         return (
            <IterableInboxSwipeableRow
               key={message.messageId}
               index={index}
               swipingCheck={(swiping : boolean) => setSwiping(swiping)}
               deleteMessage={(id: number) => deleteMessage(id)}
               message={message}
               //cleanFromScreen={(index: number) => cleanFromScreen(index)}
            />
         )
      })
   } 

   return(
      <ScrollView scrollEnabled={!swiping}>
         {renderMessageCells(messages)}
      </ScrollView>   
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },

   messageContainer: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'pink',
      marginTop: 10,
      marginBottom: 10,
   },

   message: {
      width: '90%',
      height: '100%',
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center'
   },

   messageTitle: {
      fontWeight: 'bold'
   }
})

export default IterableInboxMessageList