'use strict'

import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import IterableInboxMessageListItem from './IterableInboxMessageListItem'
import IterableInAppMessage from './IterableInAppMessage'
//import Message from './messageType'
import Customization from './customizationType'

type MessageClickableRowProps = {
   message: IterableInAppMessage,
   customization: Customization,
   handleMessageSelect: Function,
}

const IterableInboxClickableRow = ({  
   message,
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
            handleMessageSelect(message.messageId)
         }}
      >
         <IterableInboxMessageListItem
            customization={customization} 
            message={message} /> 
      </TouchableOpacity>
   )
}

export default IterableInboxClickableRow