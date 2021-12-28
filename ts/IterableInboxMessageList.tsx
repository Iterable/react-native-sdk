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
   // const [visibleRowImpressions, setVisibleRowImpressions] = useState<InboxImpressionRowInfo[]>()

   useEffect(() => {
      getInitialMessageImpressions(messageListHeight, customizations.messageRow?.height, rowViewModels)
   }, [])

   // useEffect(() => {
   //    console.log(visibleRowImpressions)
   //    dataModel.updateVisibleRows(visibleRowImpressions)
   //    console.log("impressions sent")
   // }, [visibleRowImpressions])

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

   // function getInitialMessageImpressions(messageListHeight: number, messageRowHeight: number | undefined, rowViewModels: InboxRowViewModel[]) {
   //    let numMessages = Math.floor(messageListHeight / 120)

   //    if(messageRowHeight) {
   //       numMessages = Math.floor(messageListHeight / messageRowHeight)
   //    }

   //    let visibleRowViewModels = rowViewModels.slice(0, numMessages)

   //    setVisibleRowImpressions(visibleRowViewModels.map(rowViewModel => {
   //       const inAppMessage = new IterableInAppMessage(
   //          rowViewModel.inAppMessage.messageId,
   //          rowViewModel.inAppMessage.campaignId,
   //          rowViewModel.inAppMessage.trigger,
   //          rowViewModel.inAppMessage.createdAt,
   //          rowViewModel.inAppMessage.expiresAt,
   //          rowViewModel.inAppMessage.saveToInbox,
   //          rowViewModel.inAppMessage.inboxMetadata,
   //          rowViewModel.inAppMessage.customPayload,
   //          rowViewModel.inAppMessage.read,
   //          rowViewModel.inAppMessage.priorityLevel
   //        )

   //       const impression = {
   //          messageId: inAppMessage.messageId,
   //          silentInbox:  inAppMessage.isSilentInbox()
   //       } as InboxImpressionRowInfo

   //       return impression
   //    }))
   // }

   // function getInitialMessageImpressions() {
   //    let numMessages = Math.floor(messageListHeight / 120)

   //    if(customizations.messageRow?.height) {
   //       numMessages = Math.floor(messageListHeight / customizations.messageRow.height)
   //    }

   //    let viewableRowViewModels = rowViewModels.slice(0, numMessages)
   //    let impressions

   //    return viewableRowViewModels.map(rowViewModel => {
   //       const impression = {
   //          messageId: rowViewModel.inAppMessage.messageId,
   //          //silentInbox: rowViewModel.inAppMessage.isSilentInbox()
   //       } as InboxImpressionRowInfo
         
   //       return impression
   //    })
   // }

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