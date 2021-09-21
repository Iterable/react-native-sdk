'use strict'

import React from 'react'
import { TouchableOpacity } from 'react-native'

import {
   InboxRowViewModel,
   IterableInboxMessageListItem,
   IterableInboxCustomizations
} from '.'

type MessageClickableRowProps = {
   index: number,
   last: boolean,
   rowViewModel: InboxRowViewModel,
   getHeight: Function,
   messageListItemLayout: Function,
   customizations: IterableInboxCustomizations,
   handleMessageSelect: Function,
   contentWidth: number,
   orientation: string
}

const IterableInboxClickableRow = ({ 
   index,
   last, 
   rowViewModel,
   getHeight,
   messageListItemLayout,
   customizations, 
   handleMessageSelect,
   contentWidth,
   orientation 
}: MessageClickableRowProps) => {

   return(
      <TouchableOpacity
         activeOpacity={1}
         onPress={() => {
            handleMessageSelect(rowViewModel.inAppMessage.messageId, index)
         }}
      >
         <IterableInboxMessageListItem
            last={last}
            rowViewModel={rowViewModel}
            getHeight={(layout: any) => getHeight(layout)}
            messageListItemLayout={messageListItemLayout}
            customizations={customizations}
            contentWidth={contentWidth}
            orientation={orientation} /> 
      </TouchableOpacity>
   )
}

export default IterableInboxClickableRow