'use strict'

import React, { useCallback, useRef, useState } from 'react'
import {
  ViewabilityConfig,
  ViewToken,
  FlatList
} from 'react-native'

import InboxImpressionRowInfo from './InboxImpressionRowInfo'
import IterableInboxMessageCell from './IterableInboxMessageCell'
import InboxRowViewModel from './InboxRowViewModel'
import IterableInboxCustomizations from './IterableInboxCustomizations'

import IterableInAppMessage from './IterableInAppMessage'
import IterableInboxDataModel from './IterableInboxDataModel'

interface MessageListProps {
  dataModel: IterableInboxDataModel
  rowViewModels: InboxRowViewModel[]
  customizations: IterableInboxCustomizations
  messageListItemLayout: Function
  deleteRow: Function
  handleMessageSelect: Function
  updateVisibleMessageImpressions: Function
  contentWidth: number
  isPortrait: boolean
}

const IterableInboxMessageList = ({
  dataModel,
  rowViewModels,
  customizations,
  messageListItemLayout,
  deleteRow,
  handleMessageSelect,
  updateVisibleMessageImpressions,
  contentWidth,
  isPortrait
}: MessageListProps): any => {
  const [swiping, setSwiping] = useState<boolean>(false)
  const flatListRef = useRef<FlatList>(null)

  function renderRowViewModel (rowViewModel: InboxRowViewModel, index: number, last: boolean): any {
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

  function getRowInfosFromViewTokens (viewTokens: ViewToken[]): InboxImpressionRowInfo[] {
    return viewTokens.map(
      function (viewToken) {
        const inAppMessage = IterableInAppMessage.fromViewToken(viewToken)

        const impression: InboxImpressionRowInfo = {
          messageId: inAppMessage.messageId,
          silentInbox: inAppMessage.isSilentInbox()
        }

        return impression
      }
    )
  }

  const inboxSessionViewabilityConfig: ViewabilityConfig = {
    minimumViewTime: 500,
    itemVisiblePercentThreshold: 100,
    waitForInteraction: false
  }

  const inboxSessionItemsChanged = useCallback(
    (info: { viewableItems: ViewToken[], changed: ViewToken[] }) => {
      const rowInfos = getRowInfosFromViewTokens(info.viewableItems)

      updateVisibleMessageImpressions(rowInfos)
    }
    , [])

  return (
    <FlatList
      ref={flatListRef}
      scrollEnabled={!swiping}
      data={rowViewModels}
      renderItem={({ item, index }: { item: InboxRowViewModel, index: number }) => renderRowViewModel(item, index, index === rowViewModels.length - 1)}
      keyExtractor={(item: InboxRowViewModel) => item.inAppMessage.messageId}
      viewabilityConfig={inboxSessionViewabilityConfig}
      onViewableItemsChanged={inboxSessionItemsChanged}
      onLayout={() => { flatListRef.current?.recordInteraction() }}
    />
  )
}

export default IterableInboxMessageList
