'use strict'

import React, { useState } from 'react'
import {  ScrollView } from 'react-native'

import IterableInboxSwipeableRow from './IterableInboxSwipeableRow'
import IterableInboxEmptyState from './IterableInboxEmptyState'

import Message from './messageType'
import IterableInAppMessage from './IterableInAppMessage'
// import InboxRowViewModel from './InboxRowViewModel'
import Customization from './customizationType'

type MessageListProps = {
   messages: IterableInAppMessage[],
   customization: Customization
   //deleteMessage: Function,
   handleMessageSelect: Function 
}

const IterableInboxMessageList = ({ 
   messages,
   customization, 
   //deleteMessage, 
   handleMessageSelect 
}: MessageListProps) => {
   const [swiping, setSwiping] = useState(false)

   const renderMessageCells = (messages: IterableInAppMessage[]) => {
      return messages.map((message, index) => {
         return (
            <IterableInboxSwipeableRow
               key={message.messageId}
               customization={customization}
               //swipingCheck={(swiping : boolean) => setSwiping(swiping)}
               // deleteMessage={(id: string) => deleteMessage(id)}
               handleMessageSelect={(id: string) => handleMessageSelect(id)}
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