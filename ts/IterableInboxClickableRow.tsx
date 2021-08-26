'use strict'

import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import IterableInboxMessageListItem from './IterableInboxMessageListItem'
import InboxRowViewModel from './InboxRowViewModel'
import Customization from './customizationType'

type MessageClickableRowProps = {
   index: number,
   message: InboxRowViewModel,
   messageListItemLayout: Function,
   customization: Customization,
   handleMessageSelect: Function,
}

const IterableInboxClickableRow = ({ 
   index, 
   message,
   messageListItemLayout,
   customization, 
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
            handleMessageSelect(message.inAppMessage.messageId, index)
         }}
      >
         <IterableInboxMessageListItem
            message={message}
            messageListItemLayout={messageListItemLayout}
            customization={customization} /> 
      </TouchableOpacity>
   )
}

export default IterableInboxClickableRow