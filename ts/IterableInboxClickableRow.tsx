'use strict'

import React from 'react'
import { TouchableOpacity } from 'react-native'

import IterableInboxMessageListItem from './IterableInboxMessageListItem'
import InboxRowViewModel from './InboxRowViewModel'
import Customization from './customizationType'

type MessageClickableRowProps = {
   index: number,
   last: boolean,
   rowViewModel: InboxRowViewModel,
   messageListItemLayout: Function,
   customizations: Customization,
   handleMessageSelect: Function,
}

const IterableInboxClickableRow = ({ 
   index,
   last, 
   rowViewModel,
   messageListItemLayout,
   customizations, 
   handleMessageSelect 
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
            messageListItemLayout={messageListItemLayout}
            customizations={customizations} /> 
      </TouchableOpacity>
   )
}

export default IterableInboxClickableRow