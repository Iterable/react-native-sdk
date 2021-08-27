'use strict'

import React, { useState } from 'react'
import {  ScrollView } from 'react-native'

import IterableInboxSwipeableRow from './IterableInboxSwipeableRow'

import InboxRowViewModel from './InboxRowViewModel'
import Customization from './customizationType'

type MessageListProps = {
   rowViewModels: InboxRowViewModel[],
   customizations: Customization
   onDelete: Function,
   handleMessageSelect: Function 
}

const IterableInboxMessageList = ({ 
   rowViewModels,
   customizations, 
   onDelete, 
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
               customizations={customizations}
               //swipingCheck={(swiping : boolean) => setSwiping(swiping)}
               onDelete={(id: string, index: number) => onDelete(id, index)}
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