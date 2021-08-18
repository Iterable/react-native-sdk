'use strict'

import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import IterableInboxMessageListItem from './IterableInboxMessageListItem'
import Message from './messageType'

type MessageClickableRowProps = {
   index: number,
   message: Message,
   handleMessageSelect: Function,
}

const IterableInboxClickableRow = ({ 
   index, 
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
         <IterableInboxMessageListItem
            index={index} 
            message={message}
         /> 
      </TouchableOpacity>
   )   
}

export default IterableInboxClickableRow