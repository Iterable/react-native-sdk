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

export const inboxMessageListTestIDs = {
  container: 'inbox-message-list',
} as const;

/**
 * Props for the IterableInboxMessageList component.
 */
export interface IterableInboxMessageListProps
  extends Pick<
    IterableInboxMessageCellProps,
    'deleteRow' | 'handleMessageSelect' | 'messageListItemLayout'
  > {
  /**
   * The data model for the inbox.
   */
  dataModel: IterableInboxDataModel;
  /**
   * The view models for the rows in the inbox.
   */
  rowViewModels: IterableInboxRowViewModel[];
  /**
   * Customizations for the inbox.
   */
  customizations: IterableInboxCustomizations;
  /**
   * Function to update the visible message impressions.
   * @param rowInfos - Impression details for the rows to be updated.
   */
  updateVisibleMessageImpressions: (
    /** Impression details for the rows to be updated */
    rowInfos: IterableInboxImpressionRowInfo[]
  ) => void;
  /**
   * The width of the content.
   */
  contentWidth: number;
  /**
   * Indicates if the device is in portrait mode.
   */
  isPortrait: boolean;
}

/**
 * A component that renders a list of inbox messages.
 */
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
    // MOB-10427: Figure out if we need the missing dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <FlatList
      testID={inboxMessageListTestIDs.container}
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
