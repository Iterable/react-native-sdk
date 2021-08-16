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
import IterableInboxEmptyState from './IterableInboxEmptyState'
import Message from "./messageType"

type MessageListProps = {
   messages: Message[],
   deleteMessage: Function,
   //handleMessageSelect: Function 
}

const IterableInboxMessageList = ({ 
   messages, 
   deleteMessage, 
   //handleMessageSelect 
}: MessageListProps) => {
   const [swiping, setSwiping] = useState(false)

   const renderMessageCells = (messages: Message[]) => {
      return messages.map((message, index) => {
         return (
            <IterableInboxSwipeableRow
               key={message.messageId}
               index={index}
               swipingCheck={(swiping : boolean) => setSwiping(swiping)}
               deleteMessage={(id: number) => deleteMessage(id)}
               //handleMessageSelect={(index: number, messages: Message[]) => handleMessageSelect(index, messages)}
               message={message}
            />
         )
      })
   } 

   return(
      <ScrollView scrollEnabled={!swiping}>
         {messages.length ?
            renderMessageCells(messages) : 
            <IterableInboxEmptyState></IterableInboxEmptyState>}
      </ScrollView>   
   )
}

export default IterableInboxMessageList