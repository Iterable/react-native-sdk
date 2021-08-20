'use strict'

import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import IterableInboxMessageListItem from './IterableInboxMessageListItem'
import Message from './messageType'

type MessageClickableRowProps = {
   message: Message,
   handleMessageSelect: Function,
}

const IterableInboxClickableRow = ({  
   message, 
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
            handleMessageSelect(message.messageId)
         }}
      >
         <IterableInboxMessageListItem message={message} /> 
      </TouchableOpacity>
   )   
}

export default IterableInboxClickableRow