// 'use strict'

// import React from 'react'
// import { TouchableOpacity } from 'react-native'

// import {
//    InboxRowViewModel,
//    IterableInboxMessageListItem,
//    IterableInboxCustomizations,
//    IterableInboxDataModel
// } from '.'

type MessageClickableRowProps = {
   index: number,
   last: boolean,
   dataModel: IterableInboxDataModel,
   rowViewModel: InboxRowViewModel,
   customizations: IterableInboxCustomizations,
   messageListItemLayout: Function,
   handleMessageSelect: Function,
   isPortrait: boolean
}

const IterableInboxClickableRow = ({
   index,
   last,
   dataModel,
   rowViewModel,
   customizations,
   messageListItemLayout,
   handleMessageSelect,
   isPortrait
}: MessageClickableRowProps) => {

   return (
      // <TouchableOpacity
      //    activeOpacity={1}
      //    onPress={() => {
      //       handleMessageSelect(rowViewModel.inAppMessage.messageId, index)
      //    }}
      // >
         // <IterableInboxMessageListItem
         //    last={last}
         //    dataModel={dataModel}
         //    rowViewModel={rowViewModel}
         //    customizations={customizations}
         //    messageListItemLayout={messageListItemLayout}
         //    isPortrait={isPortrait} />
      // </TouchableOpacity>
   )
}

export default IterableInboxClickableRow