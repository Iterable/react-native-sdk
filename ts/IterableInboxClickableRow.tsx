'use strict'

import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import IterableInboxMessageListItem from './IterableInboxMessageListItem'
import InboxRowViewModel from './InboxRowViewModel'
import Customization from './customizationType'

type MessageClickableRowProps = {
   index: number,
   rowViewModel: InboxRowViewModel,
   customizations: Customization,
   handleMessageSelect: Function,
}

const IterableInboxClickableRow = ({ 
   index, 
   rowViewModel,
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
            customizations={customizations} 
            rowViewModel={rowViewModel} /> 
      </TouchableOpacity>
   )
}

export default IterableInboxClickableRow