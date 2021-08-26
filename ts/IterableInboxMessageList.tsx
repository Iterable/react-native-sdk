'use strict'

import React, { useState } from 'react'
import {  ScrollView } from 'react-native'

import IterableInboxSwipeableRow from './IterableInboxSwipeableRow'

import InboxRowViewModel from './InboxRowViewModel'
import Customization from './customizationType'

type MessageListProps = {
   messages: InboxRowViewModel[],
   messageListItemLayout: Function,
   customization: Customization
   //deleteMessage: Function,
   handleMessageSelect: Function 
}

const IterableInboxMessageList = ({ 
   messages,
   messageListItemLayout,
   customization, 
   //deleteMessage, 
   handleMessageSelect 
}: MessageListProps) => {
   const [swiping, setSwiping] = useState(false)

   const renderMessageCells = (messages: InboxRowViewModel[]) => {
      return messages.map((message, index) => {
         return (
            <IterableInboxSwipeableRow
               key={message.inAppMessage.messageId}
               index={index}
               message={message}
               messageListItemLayout={messageListItemLayout}
               customization={customization}
               //swipingCheck={(swiping : boolean) => setSwiping(swiping)}
               //deleteMessage={(id: string) => deleteMessage(id)}
               handleMessageSelect={(id: string, index: number) => handleMessageSelect(id, index)}
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