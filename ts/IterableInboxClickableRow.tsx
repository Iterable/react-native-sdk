'use strict'

import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import {
   InboxRowViewModel,
   IterableInboxMessageListItem,
   IterableInboxCustomizations
} from '.'

type MessageClickableRowProps = {
   index: number,
   rowViewModel: InboxRowViewModel,
   // messageListItemLayout: Function,
   customizations: IterableInboxCustomizations,
   handleMessageSelect: Function,
}

const IterableInboxClickableRow = ({ 
   index, 
   rowViewModel,
   // messageListItemLayout,
   customizations, 
   handleMessageSelect 
}: MessageClickableRowProps) => {
   const [active, setActive] = useState(false)
   // const lastStyle = active ? styles.pressedLastMessageCell : styles.lastMessageCell
   // const style = active ? styles.pressedMessageCell : styles.messageCell
   
   return(
      <TouchableOpacity
         //style={message.last ? lastStyle : style}
         activeOpacity={1}
         onPress={() => {
            setActive(!active)
            handleMessageSelect(rowViewModel.inAppMessage.messageId, index)
         }}
      >
         <IterableInboxMessageListItem
            rowViewModel={rowViewModel}
            // messageListItemLayout={messageListItemLayout}
            customizations={customizations} /> 
      </TouchableOpacity>
   )
}

export default IterableInboxClickableRow