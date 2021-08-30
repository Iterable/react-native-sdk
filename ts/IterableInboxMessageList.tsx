'use strict'

import React, { useState } from 'react'
import {  ScrollView } from 'react-native'

import {
   InboxRowViewModel,
   IterableInboxCustomizations,
   IterableInboxSwipeableRow
} from '.'

type MessageListProps = {
   rowViewModels: InboxRowViewModel[],
   //messageListItemLayout: Function,
   customizations: IterableInboxCustomizations
   //deleteMessage: Function,
   handleMessageSelect: Function 
}

const IterableInboxMessageList = ({ 
   rowViewModels,
   //messageListItemLayout,
   customizations,
   //deleteMessage, 
   handleMessageSelect 
}: MessageListProps) => {
   const [swiping, setSwiping] = useState(false)

   const renderMessageCells = (rowViewModels: InboxRowViewModel[]) => {
      return rowViewModels.map((rowViewModel, index) => {
         return (
            <IterableInboxSwipeableRow
               key={rowViewModel.inAppMessage.messageId}
               index={index}
               rowViewModel={rowViewModel}
               //messageListItemLayout={messageListItemLayout}
               customizations={customizations}
               //swipingCheck={(swiping : boolean) => setSwiping(swiping)}
               //deleteMessage={(id: string) => deleteMessage(id)}
               handleMessageSelect={(id: string, index: number) => handleMessageSelect(id, index)}
            />
         )
      })
   } 

   return(
      <ScrollView scrollEnabled={!swiping}>
         {renderMessageCells(rowViewModels)}
      </ScrollView>   
   )
}

export default IterableInboxMessageList