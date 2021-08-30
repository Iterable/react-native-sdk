'use strict'

import React, { useState } from 'react'
import { ScrollView } from 'react-native'

import IterableInboxSwipeableRow from './IterableInboxSwipeableRow'

import InboxRowViewModel from './InboxRowViewModel'
import Customization from './customizationType'

type MessageListProps = {
   rowViewModels: InboxRowViewModel[],
   customizations: Customization,
   deleteRow: Function,
   messageListItemLayout: Function,
   handleMessageSelect: Function 
}

const IterableInboxMessageList = ({ 
   rowViewModels,
   customizations, 
   deleteRow, 
   messageListItemLayout,
   handleMessageSelect 
}: MessageListProps) => {
   const [swiping, setSwiping] = useState(false)

   const renderMessageCells = (rowViewModels: InboxRowViewModel[]) => {
      return rowViewModels.map((rowViewModel, index) => {
         const last = index === rowViewModels.length - 1 ? true : false
         return (
            <IterableInboxSwipeableRow
               key={rowViewModel.inAppMessage.messageId}
               index={index}
               last={last}
               rowViewModel={rowViewModel}
               messageListItemLayout={messageListItemLayout}
               customizations={customizations}
               //swipingCheck={(swiping : boolean) => setSwiping(swiping)}
               deleteRow={(messageId: string) => deleteRow(messageId)}
               handleMessageSelect={(messageId: string, index: number) => handleMessageSelect(messageId, index)}
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