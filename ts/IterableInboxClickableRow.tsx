'use strict'

import React from 'react'
import { TouchableOpacity, ImageSourcePropType } from 'react-native'

import {
   InboxRowViewModel,
   IterableInboxMessageListItem,
   IterableInboxCustomizations
} from '.'

type MessageClickableRowProps = {
   index: number,
   last: boolean,
   rowViewModel: InboxRowViewModel,
   customizations: IterableInboxCustomizations,
   messageListItemLayout: Function,
   handleMessageSelect: Function,
   contentWidth: number,
   orientation: string
}

const IterableInboxClickableRow = ({ 
   index,
   last,
   rowViewModel,
   customizations, 
   messageListItemLayout,
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
            customizations={customizations}
            messageListItemLayout={messageListItemLayout}
            contentWidth={contentWidth}
            orientation={orientation} /> 
      </TouchableOpacity>
   )
}

export default IterableInboxClickableRow