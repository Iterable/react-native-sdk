import { useCallback, useRef, useState } from 'react';
import { type ViewabilityConfig, type ViewToken, FlatList } from 'react-native';

import { IterableInAppMessage } from '../../../inApp';

import { IterableInboxDataModel } from '../../classes';
import type {
  IterableInboxImpressionRowInfo,
  IterableInboxRowViewModel,
  IterableInboxCustomizations,
} from '../../types';
import {
  IterableInboxMessageCell,
  type IterableInboxMessageCellProps,
} from '../IterableInboxMessageCell';
import { useDeviceOrientation } from '../../../core/hooks/useDeviceOrientation';

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
  customizations?: IterableInboxCustomizations;
  /**
   * Function to update the visible message impressions.
   * @param rowInfos - Impression details for the rows to be updated.
   */
  updateVisibleMessageImpressions: (
    /** Impression details for the rows to be updated */
    rowInfos: IterableInboxImpressionRowInfo[]
  ) => void;
}

const inboxSessionViewabilityConfig: ViewabilityConfig = {
  minimumViewTime: 500,
  itemVisiblePercentThreshold: 100,
  waitForInteraction: false,
};

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

/**
 * A component that renders a list of inbox messages.
 */
export const IterableInboxMessageList = (
  props: IterableInboxMessageListProps
) => {
  const { rowViewModels, updateVisibleMessageImpressions } = props;
  const { width, isPortrait } = useDeviceOrientation();
  const [swiping, setSwiping] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  const handleViewableItemsChanged = useCallback(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      const rowInfos = getRowInfosFromViewTokens(info.viewableItems);
      updateVisibleMessageImpressions(rowInfos);
    },
    [updateVisibleMessageImpressions]
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
      }) => (
        <IterableInboxMessageCell
          key={item.inAppMessage.messageId}
          index={index}
          last={index === rowViewModels.length - 1}
          rowViewModel={item}
          swipingCheck={setSwiping}
          contentWidth={width}
          isPortrait={isPortrait}
          {...props}
        />
      )}
      keyExtractor={(item: IterableInboxRowViewModel) =>
        item.inAppMessage.messageId
      }
      viewabilityConfig={inboxSessionViewabilityConfig}
      onViewableItemsChanged={handleViewableItemsChanged}
      onLayout={() => {
        flatListRef.current?.recordInteraction();
      }}
    />
  );
};
