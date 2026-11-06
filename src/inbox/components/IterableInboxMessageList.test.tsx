import { act, render, waitFor } from '@testing-library/react-native';
import { FlatList } from 'react-native';

import { IterableInAppMessage } from '../../inApp';
import { IterableInAppTrigger } from '../../inApp/classes/IterableInAppTrigger';
import { IterableInAppTriggerType } from '../../inApp/enums/IterableInAppTriggerType';
import { IterableInboxDataModel } from '../classes/IterableInboxDataModel';
import type { IterableInboxRowViewModel } from '../types';

import { IterableInboxMessageList } from './IterableInboxMessageList';

/** Set by the mock so tests can simulate swipe end after mount. */
const iterableInboxMessageCellMockHooks: { endSwipe?: () => void } = {};

jest.mock('./IterableInboxMessageCell', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    IterableInboxMessageCell: (props: {
      rowViewModel: IterableInboxRowViewModel;
      swipingCheck: (swiping: boolean) => void;
    }) => {
      const { swipingCheck, rowViewModel } = props;
      React.useEffect(() => {
        swipingCheck(true);
        iterableInboxMessageCellMockHooks.endSwipe = () => swipingCheck(false);
        // Runs on mount; swipingCheck is stable (setState from IterableInboxMessageList).
      }, [swipingCheck]);
      return (
        <Text testID={`inbox-cell-${rowViewModel.inAppMessage.messageId}`}>
          {rowViewModel.inAppMessage.messageId}
        </Text>
      );
    },
  };
});

function makeRowViewModel(
  messageId: string,
  options?: { silentInbox?: boolean }
): IterableInboxRowViewModel {
  const silentInbox = options?.silentInbox ?? false;
  const trigger = new IterableInAppTrigger(
    silentInbox
      ? IterableInAppTriggerType.never
      : IterableInAppTriggerType.immediate
  );
  const inAppMessage = new IterableInAppMessage(
    messageId,
    1,
    trigger,
    undefined,
    undefined,
    true,
    undefined,
    undefined,
    false,
    0
  );

  return {
    title: 'title',
    read: false,
    inAppMessage,
  };
}

describe('IterableInboxMessageList', () => {
  const baseProps = {
    dataModel: new IterableInboxDataModel(),
    customizations: {},
    contentWidth: 300,
    isPortrait: true,
    messageListItemLayout: () => null,
    deleteRow: jest.fn(),
    handleMessageSelect: jest.fn(),
    updateVisibleMessageImpressions: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    iterableInboxMessageCellMockHooks.endSwipe = undefined;
  });

  it('should render one cell per rowViewModels', () => {
    // GIVEN three inbox rows
    const rowViewModels = [
      makeRowViewModel('a'),
      makeRowViewModel('b'),
      makeRowViewModel('c'),
    ];

    // WHEN the list is rendered
    const { getByTestId } = render(
      <IterableInboxMessageList {...baseProps} rowViewModels={rowViewModels} />
    );

    // THEN one mocked cell is rendered per row
    expect(getByTestId('inbox-cell-a')).toBeTruthy();
    expect(getByTestId('inbox-cell-b')).toBeTruthy();
    expect(getByTestId('inbox-cell-c')).toBeTruthy();
  });

  it('should call updateVisibleMessageImpressions with messageId and silentInbox from viewable items', () => {
    // GIVEN visible view tokens for a normal inbox row and a silent-inbox row
    const rowVisible = makeRowViewModel('msg-visible', { silentInbox: false });
    const rowSilent = makeRowViewModel('msg-silent', { silentInbox: true });

    const { UNSAFE_getByType } = render(
      <IterableInboxMessageList
        {...baseProps}
        rowViewModels={[rowVisible, rowSilent]}
      />
    );

    const flatList = UNSAFE_getByType(FlatList);

    // WHEN viewable items change
    flatList.props.onViewableItemsChanged({
      viewableItems: [
        {
          item: rowVisible,
          key: rowVisible.inAppMessage.messageId,
          index: 0,
          isViewable: true,
        },
        {
          item: rowSilent,
          key: rowSilent.inAppMessage.messageId,
          index: 1,
          isViewable: true,
        },
      ],
      changed: [],
    });

    // THEN impressions include messageId and silent-inbox flag
    expect(baseProps.updateVisibleMessageImpressions).toHaveBeenCalledWith([
      { messageId: 'msg-visible', silentInbox: false },
      { messageId: 'msg-silent', silentInbox: true },
    ]);
  });

  it('should drop view tokens without inAppMessage.messageId', () => {
    // GIVEN one valid row and a token whose item has no messageId
    const rowGood = makeRowViewModel('keep-me');

    const { UNSAFE_getByType } = render(
      <IterableInboxMessageList {...baseProps} rowViewModels={[rowGood]} />
    );

    const flatList = UNSAFE_getByType(FlatList);

    // WHEN viewable items include an invalid entry
    flatList.props.onViewableItemsChanged({
      viewableItems: [
        {
          item: {
            title: 'x',
            read: false,
            inAppMessage: {} as IterableInAppMessage,
          },
          key: 'bad',
          index: 0,
          isViewable: true,
        },
        {
          item: rowGood,
          key: rowGood.inAppMessage.messageId,
          index: 1,
          isViewable: true,
        },
      ],
      changed: [],
    });

    // THEN only the valid message is passed through
    expect(baseProps.updateVisibleMessageImpressions).toHaveBeenCalledWith([
      { messageId: 'keep-me', silentInbox: false },
    ]);
  });

  it('should disable scroll while swiping and re-enable when swipe ends', async () => {
    // GIVEN a list that reports swipe state via IterableInboxMessageCell (mock)
    const { UNSAFE_getByType } = render(
      <IterableInboxMessageList
        {...baseProps}
        rowViewModels={[makeRowViewModel('swipe-row')]}
      />
    );

    const flatList = UNSAFE_getByType(FlatList);

    // WHEN the cell mounts and signals swiping
    await waitFor(() => {
      expect(flatList.props.scrollEnabled).toBe(false);
    });

    // WHEN swipe ends
    await act(async () => {
      iterableInboxMessageCellMockHooks.endSwipe?.();
    });

    // THEN scrolling is allowed again
    await waitFor(() => {
      expect(flatList.props.scrollEnabled).toBe(true);
    });
  });
});
