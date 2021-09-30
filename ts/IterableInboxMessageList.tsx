'use strict'

import React from 'react'
import { ScrollView } from 'react-native'

import {
   InboxRowViewModel,
   IterableInboxCustomizations,
   IterableInboxSwipeableRow
} from '.'

type MessageListProps = {
   rowViewModels: InboxRowViewModel[],
   customizations: IterableInboxCustomizations,
   messageListItemLayout: Function,
   deleteRow: Function,
   handleMessageSelect: Function,
   contentWidth: number,
   isPortrait: boolean 
}

const IterableInboxMessageList = ({ 
   rowViewModels,
   customizations,
   messageListItemLayout, 
   deleteRow, 
   handleMessageSelect,
   contentWidth,
   isPortrait
}: MessageListProps) => {

   const renderMessageCells = (rowViewModels: InboxRowViewModel[]) => {
      return rowViewModels.map((rowViewModel, index) => {
         const last = index === rowViewModels.length - 1 ? true : false
         return (
            <IterableInboxSwipeableRow
               key={rowViewModel.inAppMessage.messageId}
               index={index}
               last={last}
               rowViewModel={rowViewModel}
               customizations={customizations}
               messageListItemLayout={messageListItemLayout}
               deleteRow={(messageId: string) => deleteRow(messageId)}
               handleMessageSelect={(messageId: string, index: number) => handleMessageSelect(messageId, index)}
               contentWidth={contentWidth}
               isPortrait={isPortrait}
            />
         )
      })
   } 

   return(
      <ScrollView>
         {renderMessageCells(rowViewModels)}
      </ScrollView>   
   )
}

export default IterableInboxMessageList