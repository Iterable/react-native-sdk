import { useCallback, useRef, useState } from 'react';
import { type ViewabilityConfig, type ViewToken, FlatList } from 'react-native';

import { IterableInAppMessage } from '../../inApp';

import { IterableInboxDataModel } from '../classes';
import type {
  IterableInboxImpressionRowInfo,
  IterableInboxRowViewModel,
  IterableInboxCustomizations,
} from '../types';
import {
  IterableInboxMessageCell,
  type IterableInboxMessageCellProps,
} from './IterableInboxMessageCell';

// TODO: Comment
export interface IterableInboxMessageListProps
  extends Pick<
    IterableInboxMessageCellProps,
    'deleteRow' | 'handleMessageSelect' | 'messageListItemLayout'
  > {
  dataModel: IterableInboxDataModel;
  rowViewModels: IterableInboxRowViewModel[];
  customizations: IterableInboxCustomizations;
  updateVisibleMessageImpressions: (
    /** Impression details for the rows to be updated */
    rowInfos: IterableInboxImpressionRowInfo[]
  ) => void;
  contentWidth: number;
  isPortrait: boolean;
}

// TODO: Comment
export const IterableInboxMessageList = ({
  dataModel,
  rowViewModels,
  customizations,
  messageListItemLayout,
  deleteRow,
  handleMessageSelect,
  updateVisibleMessageImpressions,
  contentWidth,
  isPortrait,
}: IterableInboxMessageListProps) => {
  const [swiping, setSwiping] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  function renderRowViewModel(
    rowViewModel: IterableInboxRowViewModel,
    index: number,
    last: boolean
  ) {
    return (
      <IterableInboxMessageCell
        key={rowViewModel.inAppMessage.messageId}
        index={index}
        last={last}
        dataModel={dataModel}
        rowViewModel={rowViewModel}
        customizations={customizations}
        swipingCheck={setSwiping}
        messageListItemLayout={messageListItemLayout}
        deleteRow={deleteRow}
        handleMessageSelect={handleMessageSelect}
        contentWidth={contentWidth}
        isPortrait={isPortrait}
      />
    );
  }

  function getRowInfosFromViewTokens(
    viewTokens: Array<ViewToken>
  ): Array<IterableInboxImpressionRowInfo> {
    return viewTokens.map(function (viewToken) {
      const inAppMessage = IterableInAppMessage.fromViewToken(viewToken);

      const impression = {
        messageId: inAppMessage.messageId,
        silentInbox: inAppMessage.isSilentInbox(),
      } as IterableInboxImpressionRowInfo;

      return impression;
    });
  }

  const inboxSessionViewabilityConfig: ViewabilityConfig = {
    minimumViewTime: 500,
    itemVisiblePercentThreshold: 100,
    waitForInteraction: false,
  };

  const inboxSessionItemsChanged = useCallback(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      const rowInfos = getRowInfosFromViewTokens(info.viewableItems);

      updateVisibleMessageImpressions(rowInfos);
    },
    // TODO: Figure out if we need the missing dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <FlatList
      ref={flatListRef}
      scrollEnabled={!swiping}
      data={rowViewModels}
      renderItem={({
        item,
        index,
      }: {
        item: IterableInboxRowViewModel;
        index: number;
      }) => renderRowViewModel(item, index, index === rowViewModels.length - 1)}
      keyExtractor={(item: IterableInboxRowViewModel) =>
        item.inAppMessage.messageId
      }
      viewabilityConfig={inboxSessionViewabilityConfig}
      onViewableItemsChanged={inboxSessionItemsChanged}
      onLayout={() => {
        flatListRef.current?.recordInteraction();
      }}
    />
  );
};

export default IterableInboxMessageList;
