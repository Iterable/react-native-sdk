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
            key = {rowViewModel.inAppMessage.messageId}
            dataModel = {dataModel}
            index = {index}
            last = {last}
            rowViewModel = {rowViewModel}
            customizations = {customizations}
            swipingCheck = {(swiping: boolean) => setSwiping(swiping)}
            messageListItemLayout = {messageListItemLayout}
            deleteRow = {(messageId: string) => deleteRow(messageId)}
            handleMessageSelect = {(messageId: string, index: number) => handleMessageSelect(messageId, index)}
            contentWidth = {contentWidth}
            isPortrait = {isPortrait}
         />
      )
   }

   function convertViewTokensToRowInfos(viewTokens: Array<ViewToken>): Array<InboxImpressionRowInfo> {
      return viewTokens.map(
         function(viewToken) {
            var inAppMessage = IterableInAppMessage.fromInApp(viewToken.item["inAppMessage"] as IterableInAppMessage)

            const impression = {
               messageId: inAppMessage.messageId,
               silentInbox: inAppMessage.isSilentInbox()
            } as InboxImpressionRowInfo

            return impression
         }
      )
   }

   function tempGetInAppMessagesFromViewTokens(viewTokens: Array<ViewToken>): Array<IterableInAppMessage> {
      return viewTokens.map(
         function(viewToken) {
            return IterableInAppMessage.fromInApp(viewToken.item["inAppMessage"] as IterableInAppMessage)
         }
      )
   }

   const inboxSessionViewabilityConfig: ViewabilityConfig = {
      minimumViewTime: 500,
      itemVisiblePercentThreshold: 50,
      waitForInteraction: false
   }

   const inboxSessionItemsChanged = useCallback((
      (info: {viewableItems: Array<ViewToken>, changed: Array<ViewToken>}) => {
         const rowInfos = convertViewTokensToRowInfos(info.viewableItems)
         const inAppMessages = tempGetInAppMessagesFromViewTokens(info.viewableItems)
         
         console.log("updateVisibleRows", inAppMessages.length, inAppMessages.map(
            function(impression) {
               return impression.inboxMetadata?.title ?? "<none>"
            })
         )

         dataModel.updateVisibleRows(rowInfos)
      }
   ), [])

   return (
      <FlatList
         scrollEnabled = {!swiping}
         data = {rowViewModels}
         renderItem = {({item, index}: {item: InboxRowViewModel, index: number }) => renderRowViewModel(item, index, index === rowViewModels.length - 1)}
         keyExtractor = {(item: InboxRowViewModel) => item.inAppMessage.messageId}
         viewabilityConfig = {inboxSessionViewabilityConfig}
         onViewableItemsChanged = {inboxSessionItemsChanged}
      />
   )
}

export default IterableInboxMessageList