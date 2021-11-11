'use strict'

import React, { useCallback, useState } from 'react'
import { ViewabilityConfig, ViewToken, FlatList } from 'react-native'

import {
   InboxRowViewModel,
   IterableInAppMessage,
   IterableInboxCustomizations,
   IterableInboxDataModel,
   IterableInboxSwipeableRow
} from '.'

import InboxImpressionRowInfo from './InboxImpressionRowInfo'

type MessageListProps = {
   dataModel: IterableInboxDataModel,
   rowViewModels: InboxRowViewModel[],
   customizations: IterableInboxCustomizations,
   messageListItemLayout: Function,
   deleteRow: Function,
   handleMessageSelect: Function,
   contentWidth: number,
   isPortrait: boolean
}

const IterableInboxMessageList = ({
   dataModel,
   rowViewModels,
   customizations,
   messageListItemLayout,
   deleteRow,
   handleMessageSelect,
   contentWidth,
   isPortrait
}: MessageListProps) => {
   const [swiping, setSwiping] = useState<boolean>(false)

   function renderRowViewModel(rowViewModel: InboxRowViewModel, index: number, last: boolean) {
      return (
         <IterableInboxSwipeableRow
            key={rowViewModel.inAppMessage.messageId}
            dataModel={dataModel}
            index={index}
            last={last}
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

   function getInAppMessageFromViewToken(viewToken: ViewToken): IterableInAppMessage {
      return IterableInAppMessage.fromInApp(viewToken.item["inAppMessage"] as IterableInAppMessage)
   }

   // function getInAppMessagesFromViewTokens(viewTokens: Array<ViewToken>): Array<IterableInAppMessage> {
   //    return viewTokens.map(getInAppMessageFromViewToken)
   // }

   function getRowInfosFromViewTokens(viewTokens: Array<ViewToken>): Array<InboxImpressionRowInfo> {
      return viewTokens.map(
         function(viewToken) {
            var inAppMessage = getInAppMessageFromViewToken(viewToken)
            
            const impression = {
               messageId: inAppMessage.messageId,
               silentInbox: inAppMessage.isSilentInbox()
            } as InboxImpressionRowInfo

            return impression
         }
      )
   }

   const inboxSessionViewabilityConfig: ViewabilityConfig = {
      minimumViewTime: 500,
      itemVisiblePercentThreshold: 100,
      waitForInteraction: false
   }

   const inboxSessionItemsChanged = useCallback((
      (info: {viewableItems: Array<ViewToken>, changed: Array<ViewToken>}) => {
         // logCurrentVisibleRows(info)

         const rowInfos = getRowInfosFromViewTokens(info.viewableItems)

         dataModel.updateVisibleRows(rowInfos)
      }
   ), [])

   // function logCurrentVisibleRows(info: {viewableItems: Array<ViewToken>, changed: Array<ViewToken>}) {
   //    const rowInfos = getRowInfosFromViewTokens(info.viewableItems)
   //    const inAppMessages = getInAppMessagesFromViewTokens(info.viewableItems)
      
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
         onViewableItemsChanged={inboxSessionItemsChanged}
      />
   )
}

export default IterableInboxMessageList