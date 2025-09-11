import { useRef } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type PanResponderGestureState,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { IterableInboxDataModel } from '../classes';
import type {
  IterableInboxCustomizations,
  IterableInboxRowViewModel,
} from '../types';
import { ITERABLE_INBOX_COLORS } from '../constants';

export const inboxMessageCellTestIDs = {
  container: 'inbox-message-cell',
  unreadIndicator: 'inbox-message-cell-unread-indicator',
  thumbnail: 'inbox-message-cell-thumbnail',
  textContainer: 'inbox-message-cell-text-container',
  title: 'inbox-message-cell-title',
  body: 'inbox-message-cell-body',
  createdAt: 'inbox-message-cell-created-at',
  deleteSlider: 'inbox-message-cell-delete-slider',
  selectButton: 'inbox-message-cell-select-button',
} as const;


/**
 * Renders a default layout for a message list item in the inbox.
 *
 * TODO: Change to component
 *
 * @param last - Indicates if this is the last item in the list.
 * @param dataModel - The data model containing the message data.
 * @param rowViewModel - The view model for the current row.
 * @param customizations - Custom styles and configurations.
 * @param isPortrait - Indicates if the device is in portrait mode.
 */
function defaultMessageListLayout(
  last: boolean,
  dataModel: IterableInboxDataModel,
  rowViewModel: IterableInboxRowViewModel,
  customizations: IterableInboxCustomizations,
  isPortrait: boolean
) {
  const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title ?? '';
  const messageBody = rowViewModel.inAppMessage.inboxMetadata?.subtitle ?? '';
  const messageCreatedAt =
    dataModel.getFormattedDate(rowViewModel.inAppMessage) ?? '';
  const thumbnailURL = rowViewModel.imageUrl;

  const styles = StyleSheet.create({
    body: {
      color: ITERABLE_INBOX_COLORS.TEXT_MUTED,
      flexWrap: 'wrap',
      fontSize: 15,
      paddingBottom: 10,
      width: '85%',
    },

    createdAt: {
      color: ITERABLE_INBOX_COLORS.TEXT_MUTED,
      fontSize: 12,
    },

    messageContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 10,
      width: '75%',
    },

    messageRow: {
      backgroundColor: ITERABLE_INBOX_COLORS.CONTAINER_BACKGROUND_LIGHT,
      borderColor: ITERABLE_INBOX_COLORS.BORDER,
      borderStyle: 'solid',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 150,
      paddingBottom: 10,
      paddingTop: 10,
      width: '100%',
    },

    readMessageThumbnailContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 30,
    },

    title: {
      fontSize: 22,
      paddingBottom: 10,
      width: '85%',
    },

    unreadIndicator: {
      backgroundColor: ITERABLE_INBOX_COLORS.UNREAD,
      borderRadius: 15 / 2,
      height: 15,
      marginLeft: 10,
      marginRight: 5,
      marginTop: 10,
      width: 15,
    },

    unreadIndicatorContainer: {
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'flex-start',
    },

    unreadMessageThumbnailContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 10,
    },
  });

  const resolvedStyles = { ...styles, ...customizations };

  const {
    unreadIndicatorContainer,
    unreadMessageThumbnailContainer,
    title,
    body,
    createdAt,
    messageRow,
  } = resolvedStyles;
  let { unreadIndicator, readMessageThumbnailContainer, messageContainer } =
    resolvedStyles;

  unreadIndicator = !isPortrait
    ? { ...unreadIndicator, marginLeft: 40 }
    : unreadIndicator;
  readMessageThumbnailContainer = !isPortrait
    ? { ...readMessageThumbnailContainer, paddingLeft: 65 }
    : readMessageThumbnailContainer;
  messageContainer = !isPortrait
    ? { ...messageContainer, width: '90%' }
    : messageContainer;

  function messageRowStyle(_rowViewModel: IterableInboxRowViewModel) {
    return last ? { ...messageRow, borderBottomWidth: 1 } : messageRow;
  }

  return (
    <View testID={inboxMessageCellTestIDs.container} style={messageRowStyle(rowViewModel) as ViewStyle}>
      <View style={unreadIndicatorContainer as ViewStyle}>
        {rowViewModel.read ? null : <View testID={inboxMessageCellTestIDs.unreadIndicator} style={unreadIndicator} />}
      </View>
      <View
        style={
          (rowViewModel.read
            ? readMessageThumbnailContainer
            : unreadMessageThumbnailContainer) as ViewStyle
        }
      >
        {thumbnailURL ? (
          <Image
            testID={inboxMessageCellTestIDs.thumbnail}
            // MOB-10429: Use stylesheet according to best practices
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ height: 80, width: 80 }}
            source={{ uri: thumbnailURL }}
          />
        ) : null}
      </View>
      <View testID={inboxMessageCellTestIDs.textContainer} style={messageContainer as ViewStyle}>
        <Text testID={inboxMessageCellTestIDs.title} numberOfLines={1} ellipsizeMode="tail" style={title}>
          {messageTitle}
        </Text>
        <Text testID={inboxMessageCellTestIDs.body} numberOfLines={3} ellipsizeMode="tail" style={body as TextStyle}>
          {messageBody}
        </Text>
        <Text testID={inboxMessageCellTestIDs.createdAt} style={createdAt}>{messageCreatedAt}</Text>
      </View>
    </View>
  );
}

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
  customizations: IterableInboxCustomizations;

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
  messageListItemLayout: (
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



/**
 * Component which renders a single message cell in the Iterable inbox.
 */
export const IterableInboxMessageCell = ({
  index,
  last,
  dataModel,
  rowViewModel,
  customizations,
  swipingCheck,
  messageListItemLayout,
  deleteRow,
  handleMessageSelect,
  contentWidth,
  isPortrait,
}: IterableInboxMessageCellProps) => {
  const position = useRef(new Animated.ValueXY()).current;

  let deleteSliderHeight = customizations.messageRow?.height
    ? customizations.messageRow.height
    : 150;

  if (messageListItemLayout(last, rowViewModel)) {
    deleteSliderHeight =
      messageListItemLayout(last, rowViewModel)?.[1] ?? deleteSliderHeight;
  }

  const styles = StyleSheet.create({
    deleteSlider: {
      alignItems: 'center',
      backgroundColor: ITERABLE_INBOX_COLORS.DESTRUCTIVE,
      elevation: 1,
      flexDirection: 'row',
      height: deleteSliderHeight,
      justifyContent: 'flex-end',
      paddingRight: 10,
      position: 'absolute',
      width: '100%',
      ...(isPortrait ? {} : { paddingRight: 40 }),
    },

    textContainer: {
      elevation: 2,
      width: '100%',
    },

    textStyle: {
      color: ITERABLE_INBOX_COLORS.TEXT_INVERSE,
      fontSize: 15,
      fontWeight: 'bold',
    },
  });

  const scrollThreshold = contentWidth / 15;
  const FORCING_DURATION = 350;

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
      <View style={styles.deleteSlider} testID={inboxMessageCellTestIDs.deleteSlider}>
        <Text style={styles.textStyle}>DELETE</Text>
      </View>
      <Animated.View
        style={[styles.textContainer, position.getLayout()]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
        testID={inboxMessageCellTestIDs.selectButton}
          activeOpacity={1}
          onPress={() => {
            handleMessageSelect(rowViewModel.inAppMessage.messageId, index);
          }}
        >
          {messageListItemLayout(last, rowViewModel)
            ? messageListItemLayout(last, rowViewModel)?.[0]
            : defaultMessageListLayout(
                last,
                dataModel,
                rowViewModel,
                customizations,
                isPortrait
              )}
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};
