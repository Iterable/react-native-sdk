import { useMemo, useRef } from 'react';
import {
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
  type PanResponderGestureState
} from 'react-native';

import { IterableInboxDataModel } from '../../classes';
import type {
  IterableInboxCustomizations,
  IterableInboxRowViewModel,
} from '../../types';
import { inboxMessageCellTestIDs } from './constants';
import { DefaultMessageListLayout } from './DefaultMessageListLayout';
import { styles } from './IterableInboxMessageCell.styles';

/**
 * Props for the IterableInboxMessageCell component.
 */
export interface IterableInboxMessageCellProps {
  /**
   * The index of the message cell.
   */
  index: number;

  /**
   * Indicates if this is the last message cell in a list.
   */
  last: boolean;

  /**
   * The data model for the inbox message.
   */
  dataModel: IterableInboxDataModel;

  /**
   * The view model for the inbox row.
   */
  rowViewModel: IterableInboxRowViewModel;

  /**
   * Customizations for the inbox message cell.
   */
  customizations?: IterableInboxCustomizations;

  /**
   * Function to check if swiping should be enabled.
   * @param swiping - Should swiping be enabled?
   */
  swipingCheck: (swiping: boolean) => void;

  /**
   * Function to specify a layout for the message row.
   *
   * @remarks
   * To specify a custom layout for your inbox rows, when you instantiate your
   * `IterableInbox`, assign a function to its `messageListItemLayout` prop. The
   * inbox will call this function for each of its rows, and it should return:
   *
   * 1. JSX that represents the custom layout for the row.
   * 2. The height of the row (must be the same for all rows).
   *
   * @param isLast - Is this the last message in the list?
   * @param rowViewModel - The view model for the inbox row.
   *
   * @returns A tuple containing a React node and a number, or undefined/null.
   *
   * @example
   * ```tsx
   *  const ROW_HEIGHT = 100;
   *
   *  // Custom layout for the message row
   *  const renderCustomLayout = (
   *    isLast: boolean,
   *    rowViewModel: IterableInboxRowViewModel,
   *  ) => {
   *    return [
   *      // Component shown in the message row
   *      <View>
   *        <Text>Title: {rowViewModel.inAppMessage.inboxMetadata?.title}</Text>
   *        <Text>Body: {rowViewModel.inAppMessage.inboxMetadata?.subtitle}</Text>
   *        <Text>Date: {rowViewModel.createdAt}</Text>
   *        <Text>Has been read: {rowViewModel.read === true}</Text>
   *      </View>,
   *     // Height of the row
   *      ROW_HEIGHT,
   *    ];
   *  }
   *
   *  <IterableInbox messageListItemLayout={renderCustomLayout} />
   * ```
   */
  messageListItemLayout?: (
    isLast: boolean,
    rowViewModel: IterableInboxRowViewModel
  ) => [React.ReactNode, number] | undefined | null;

  /**
   * Function to delete a message row.
   * @param messageId - The ID of the message to delete.
   */
  deleteRow: (messageId: string) => void;

  /**
   * Function to handle message selection.
   * @param messageId - The ID of the message to select.
   * @param index - The index of the message to select.
   */
  handleMessageSelect: (messageId: string, index: number) => void;

  /**
   * The width of the content.
   */
  contentWidth: number;

  /**
   * Indicates if the device is in portrait mode.
   */
  isPortrait: boolean;
}

const FORCING_DURATION = 350;

/**
 * Component which renders a single message cell in the Iterable inbox.
 */
export const IterableInboxMessageCell = ({
  index,
  last,
  dataModel,
  rowViewModel,
  customizations = {} as IterableInboxCustomizations,
  swipingCheck,
  messageListItemLayout = () => null,
  deleteRow,
  handleMessageSelect,
  contentWidth,
  isPortrait,
}: IterableInboxMessageCellProps) => {
  const position = useRef(new Animated.ValueXY()).current;
  const deleteSliderHeight = useMemo(() => {
    let height = customizations.messageRow?.height
      ? customizations.messageRow.height
      : 150;

    if (messageListItemLayout(last, rowViewModel)) {
      height = messageListItemLayout(last, rowViewModel)?.[1] ?? height;
    }

    return height;
  }, [
    customizations.messageRow?.height,
    last,
    messageListItemLayout,
    rowViewModel,
  ]);

  const scrollThreshold = contentWidth / 15;

  //If user swipes, either complete swipe or reset
  function userSwipedLeft(gesture: PanResponderGestureState) {
    if (gesture.dx < -0.6 * contentWidth) {
      completeSwipe();
    } else {
      resetPosition();
    }
  }

  function completeSwipe() {
    const x = -2000;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: FORCING_DURATION,
      useNativeDriver: false,
    }).start(() => deleteRow(rowViewModel.inAppMessage.messageId));
  }

  function resetPosition() {
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_event, gestureState) => {
        const { dx, dy } = gestureState;
        // return true if user is swiping, return false if it's a single click
        return Math.abs(dx) !== 0 && Math.abs(dy) !== 0;
      },
      onMoveShouldSetPanResponderCapture: (_event, gestureState) => {
        const { dx, dy } = gestureState;
        // return true if user is swiping, return false if it's a single click
        return Math.abs(dx) !== 0 && Math.abs(dy) !== 0;
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_event, gesture) => {
        if (gesture.dx <= -scrollThreshold) {
          //enables swipeing when threshold is reached
          swipingCheck(true);
          //threshold value is deleted from movement
          const x = gesture.dx;
          //position is set to the new value
          position.setValue({ x, y: 0 });
        }
      },
      onPanResponderRelease: (_event, gesture) => {
        position.flattenOffset();
        if (gesture.dx < 0) {
          userSwipedLeft(gesture);
        } else {
          resetPosition();
        }
        swipingCheck(false);
      },
    })
  ).current;

  return (
    <>
      <View
        testID={inboxMessageCellTestIDs.deleteSlider}
        style={[
          styles.deleteSlider,
          { height: deleteSliderHeight },
          // eslint-disable-next-line react-native/no-inline-styles
          isPortrait ? {} : { paddingRight: 40 },
        ]}
      >
        <Text style={styles.textStyle}>DELETE</Text>
      </View>
      <Animated.View
        testID={inboxMessageCellTestIDs.container}
        style={[styles.textContainer, position.getLayout()]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          testID={inboxMessageCellTestIDs.select}
          activeOpacity={1}
          onPress={() =>
            handleMessageSelect(rowViewModel.inAppMessage.messageId, index)
          }
        >
          {messageListItemLayout?.(last, rowViewModel)?.[0] ?? (
            <DefaultMessageListLayout
              last={last}
              dataModel={dataModel}
              rowViewModel={rowViewModel}
              customizations={customizations}
              isPortrait={isPortrait}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};
