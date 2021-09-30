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
   isPortrait: boolean
}

const IterableInboxClickableRow = ({ 
   index,
   last,
   rowViewModel,
   customizations, 
   messageListItemLayout,
   handleMessageSelect,
   isPortrait
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
            isPortrait={isPortrait} /> 
      </TouchableOpacity>
   )
}

export default IterableInboxClickableRow