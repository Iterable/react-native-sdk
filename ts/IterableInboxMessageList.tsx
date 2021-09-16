'use strict'

import React, { useState } from 'react'
import { ScrollView } from 'react-native'

import {
   InboxRowViewModel,
   IterableInboxCustomizations,
   IterableInboxSwipeableRow
} from '.'

type MessageListProps = {
   rowViewModels: InboxRowViewModel[],
   customizations: IterableInboxCustomizations,
   deleteRow: Function,
   messageListItemLayout: Function,
   handleMessageSelect: Function,
   contentWidth: number,
   height: number,
   orientation: string 
}

const IterableInboxMessageList = ({ 
   rowViewModels,
   customizations, 
   deleteRow, 
   messageListItemLayout,
   handleMessageSelect,
   contentWidth,
   height,
   orientation
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
               contentWidth={contentWidth}
               height={height}
               orientation={orientation}
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