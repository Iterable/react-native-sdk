'use strict'

import React, { useState } from 'react'
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
            last={last}
            rowViewModel={rowViewModel}
            messageListItemLayout={messageListItemLayout}
            customizations={customizations} /> 
      </TouchableOpacity>
   )
}

export default IterableInboxClickableRow