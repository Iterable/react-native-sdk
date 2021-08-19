'use strict'

import React, { useState } from 'react'
import {  ScrollView } from 'react-native'

import IterableInboxSwipeableRow from './IterableInboxSwipeableRow'
import IterableInboxEmptyState from './IterableInboxEmptyState'
import Message from './messageType'

type MessageListProps = {
   messages: Message[],
   customization: {[key: string]: any}
   deleteMessage: Function,
   handleMessageSelect: Function 
}

const IterableInboxMessageList = ({ 
   messages,
   customization, 
   deleteMessage, 
   handleMessageSelect 
}: MessageListProps) => {
   const [swiping, setSwiping] = useState(false)

   const renderMessageCells = (messages: Message[]) => {
      return messages.map((message, index) => {
         return (
            <IterableInboxSwipeableRow
               key={message.messageId}
               customization={customization}
               swipingCheck={(swiping : boolean) => setSwiping(swiping)}
               deleteMessage={(id: number) => deleteMessage(id)}
               handleMessageSelect={(id: number) => handleMessageSelect(id)}
               message={message}
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

export default IterableInboxMessageList