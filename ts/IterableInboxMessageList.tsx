'use strict'

import React, { useCallback, useEffect, useState } from 'react'
import { 
   ViewabilityConfig, 
   ViewToken, 
   FlatList 
} from 'react-native'

import {
   InboxRowViewModel,
   IterableInAppMessage,
   IterableInboxCustomizations,
   IterableInboxDataModel,
   IterableInboxMessageCell
} from '.'

//import InboxImpressionRowInfo from './InboxImpressionRowInfo'

type MessageListProps = {
   dataModel: IterableInboxDataModel,
   rowViewModels: InboxRowViewModel[],
   customizations: IterableInboxCustomizations,
   messageListItemLayout: Function,
   deleteRow: Function,
   handleMessageSelect: Function,
   getInitialMessageImpressions: Function,
   contentWidth: number,
   messageListHeight: number,
   isPortrait: boolean
}

const IterableInboxMessageList = ({
   dataModel,
   rowViewModels,
   customizations,
   messageListItemLayout,
   deleteRow,
   handleMessageSelect,
   getInitialMessageImpressions,
   contentWidth,
   messageListHeight,
   isPortrait
}: MessageListProps) => {
   const [swiping, setSwiping] = useState<boolean>(false)

   useEffect(() => {
      getInitialMessageImpressions(messageListHeight, customizations.messageRow.height, rowViewModels)
   }, [])

   function renderRowViewModel(rowViewModel: InboxRowViewModel, index: number, last: boolean) {
      return (
         <IterableInboxMessageCell
            key={rowViewModel.inAppMessage.messageId}
            index={index}
            last={last}
            dataModel={dataModel}
            rowViewModel={rowViewModel}
            customizations={customizations}
            swipingCheck={(swiping: boolean) => setSwiping(swiping)}
            messageListItemLayout={messageListItemLayout}
            deleteRow={(messageId: string) => deleteRow(messageId)}
            handleMessageSelect={(messageId: string, index: number) => handleMessageSelect(messageId, index)}
            contentWidth={contentWidth}
            isPortrait={isPortrait}
         />
      )
   }

   // function getRowInfosFromViewTokens(viewTokens: Array<ViewToken>): Array<InboxImpressionRowInfo> {
   //    //console.log(viewTokens)
      
   //    return viewTokens.map(
   //       function(viewToken) {
   //          var inAppMessage = IterableInAppMessage.fromViewToken(viewToken)
   //          //console.log(inAppMessage)
            
   //          const impression = {
   //             messageId: inAppMessage.messageId,
   //             silentInbox: inAppMessage.isSilentInbox()
   //          } as InboxImpressionRowInfo

   //          return impression
   //       }
   //    )
   // }

   const inboxSessionViewabilityConfig: ViewabilityConfig = {
      minimumViewTime: 500,
      itemVisiblePercentThreshold: 100,
      waitForInteraction: false
   }

   // const inboxSessionItemsChanged = useCallback((
   //    (info: {viewableItems: Array<ViewToken>, changed: Array<ViewToken>}) => {
   //       logCurrentVisibleRows(info)

   //       const rowInfos = getRowInfosFromViewTokens(info.viewableItems)

   //       //console.log(rowInfos)
   //       dataModel.updateVisibleRows(rowInfos)
   //    }
   // ), [])

   // function logCurrentVisibleRows(info: {viewableItems: Array<ViewToken>, changed: Array<ViewToken>}) {
   //    const rowInfos = getRowInfosFromViewTokens(info.viewableItems)
   //    const inAppMessages = info.viewableItems.map(IterableInAppMessage.fromViewToken)
      
   //    console.log("updateVisibleRows", inAppMessages.length, inAppMessages.map(
   //       function(impression) {
   //          return impression.inboxMetadata?.title ?? "<none>"
   //       })
   //    )
   // }

   return (
      <FlatList
         scrollEnabled={!swiping}
         data={rowViewModels}
         renderItem={({ item, index }: { item: InboxRowViewModel, index: number }) => renderRowViewModel(item, index, index === rowViewModels.length - 1)}
         keyExtractor={(item: InboxRowViewModel) => item.inAppMessage.messageId}
         viewabilityConfig={inboxSessionViewabilityConfig}
         //onViewableItemsChanged={inboxSessionItemsChanged}
      />
   )
}

export default IterableInboxMessageList