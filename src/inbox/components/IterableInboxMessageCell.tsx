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

// TODO: Change to component
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
      color: 'lightgray',
      flexWrap: 'wrap',
      fontSize: 15,
      paddingBottom: 10,
      width: '85%',
    },

    createdAt: {
      color: 'lightgray',
      fontSize: 12,
    },

    messageContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 10,
      width: '75%',
    },

    messageRow: {
      backgroundColor: 'white',
      borderColor: 'lightgray',
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
      backgroundColor: 'blue',
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
    <View style={messageRowStyle(rowViewModel) as ViewStyle}>
      <View style={unreadIndicatorContainer as ViewStyle}>
        {rowViewModel.read ? null : <View style={unreadIndicator} />}
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
            // TODO: Use stylesheet according to best practices
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ height: 80, width: 80 }}
            source={{ uri: thumbnailURL }}
          />
        ) : null}
      </View>
      <View style={messageContainer as ViewStyle}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={title}>
          {messageTitle}
        </Text>
        <Text numberOfLines={3} ellipsizeMode="tail" style={body as TextStyle}>
          {messageBody}
        </Text>
        <Text style={createdAt}>{messageCreatedAt}</Text>
      </View>
    </View>
  );
}

// TODO: Comment
export interface IterableInboxMessageCellProps {
  index: number;
  last: boolean;
  dataModel: IterableInboxDataModel;
  rowViewModel: IterableInboxRowViewModel;
  customizations: IterableInboxCustomizations;
  swipingCheck: (
    /** Should swiping be enabled? */
    swiping: boolean
  ) => void;
  messageListItemLayout: (
    /** Is this the last message in the list? */
    isLast: boolean,
    rowViewModel: IterableInboxRowViewModel
  ) => [React.ReactNode, number] | undefined | null;
  deleteRow: (
    /** The ID of the message to delete */
    messageId: string
  ) => void;
  handleMessageSelect: (
    /** The ID of the message to select */
    messageId: string,
    /** The index of the message to select */
    index: number
  ) => void;
  contentWidth: number;
  isPortrait: boolean;
}

// TODO: Comment
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
      backgroundColor: 'red',
      elevation: 1,
      flexDirection: 'row',
      height: deleteSliderHeight,
      justifyContent: 'flex-end',
      paddingRight: 10,
      position: 'absolute',
      width: '100%',
    },

    textContainer: {
      elevation: 2,
      width: '100%',
    },

    textStyle: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold',
    },
  });

  const { textContainer, textStyle } = styles;
  let { deleteSlider } = styles;

  deleteSlider = isPortrait
    ? deleteSlider
    : { ...deleteSlider, paddingRight: 40 };

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
      <View style={deleteSlider}>
        <Text style={textStyle}>DELETE</Text>
      </View>
      <Animated.View
        style={[textContainer, position.getLayout()]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
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
