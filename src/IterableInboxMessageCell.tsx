import { useRef } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import type { InboxRowViewModel } from './InboxRowViewModel';
import type { IterableInboxCustomizations } from './inbox/IterableInboxCustomizations';

import IterableInboxDataModel from './IterableInboxDataModel';

// TODO: Change to component
function defaultMessageListLayout(
  last: boolean,
  dataModel: IterableInboxDataModel,
  rowViewModel: InboxRowViewModel,
  customizations: IterableInboxCustomizations,
  isPortrait: boolean
) {
  const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title ?? '';
  const messageBody = rowViewModel.inAppMessage.inboxMetadata?.subtitle ?? '';
  const messageCreatedAt =
    dataModel.getFormattedDate(rowViewModel.inAppMessage) ?? '';
  const thumbnailURL = rowViewModel.imageUrl;

  let styles = StyleSheet.create({
    unreadIndicatorContainer: {
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },

    unreadIndicator: {
      width: 15,
      height: 15,
      borderRadius: 15 / 2,
      backgroundColor: 'blue',
      marginLeft: 10,
      marginRight: 5,
      marginTop: 10,
    },

    unreadMessageThumbnailContainer: {
      paddingLeft: 10,
      flexDirection: 'column',
      justifyContent: 'center',
    },

    readMessageThumbnailContainer: {
      paddingLeft: 30,
      flexDirection: 'column',
      justifyContent: 'center',
    },

    messageContainer: {
      paddingLeft: 10,
      width: '75%',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    title: {
      fontSize: 22,
      width: '85%',
      paddingBottom: 10,
    },

    body: {
      fontSize: 15,
      color: 'lightgray',
      width: '85%',
      flexWrap: 'wrap',
      paddingBottom: 10,
    },

    createdAt: {
      fontSize: 12,
      color: 'lightgray',
    },

    messageRow: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      width: '100%',
      height: 150,
      borderStyle: 'solid',
      borderColor: 'lightgray',
      borderTopWidth: 1,
    },
  });

  const resolvedStyles = { ...styles, ...customizations };

  let {
    unreadIndicatorContainer,
    unreadIndicator,
    unreadMessageThumbnailContainer,
    readMessageThumbnailContainer,
    messageContainer,
    title,
    body,
    createdAt,
    messageRow,
  } = resolvedStyles;

  unreadIndicator = !isPortrait
    ? { ...unreadIndicator, marginLeft: 40 }
    : unreadIndicator;
  readMessageThumbnailContainer = !isPortrait
    ? { ...readMessageThumbnailContainer, paddingLeft: 65 }
    : readMessageThumbnailContainer;
  messageContainer = !isPortrait
    ? { ...messageContainer, width: '90%' }
    : messageContainer;

  function messageRowStyle(_rowViewModel: InboxRowViewModel) {
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
type MessageCellProps = {
  index: number;
  last: boolean;
  dataModel: IterableInboxDataModel;
  rowViewModel: InboxRowViewModel;
  customizations: IterableInboxCustomizations;
  swipingCheck: Function;
  messageListItemLayout: Function;
  deleteRow: Function;
  handleMessageSelect: Function;
  contentWidth: number;
  isPortrait: boolean;
};

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
}: MessageCellProps) => {
  const position = useRef(new Animated.ValueXY()).current;

  let deleteSliderHeight = customizations.messageRow?.height
    ? customizations.messageRow.height
    : 150;

  if (messageListItemLayout(last, rowViewModel)) {
    deleteSliderHeight = messageListItemLayout(last, rowViewModel)[1];
  }

  const styles = StyleSheet.create({
    textContainer: {
      width: '100%',
      elevation: 2,
    },

    deleteSlider: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 10,
      backgroundColor: 'red',
      position: 'absolute',
      elevation: 1,
      width: '100%',
      height: deleteSliderHeight,
    },

    textStyle: {
      fontWeight: 'bold',
      fontSize: 15,
      color: 'white',
    },
  });

  let { textContainer, deleteSlider, textStyle } = styles;

  deleteSlider = isPortrait
    ? deleteSlider
    : { ...deleteSlider, paddingRight: 40 };

  const scrollThreshold = contentWidth / 15;
  const FORCING_DURATION = 350;

  //If user swipes, either complete swipe or reset
  function userSwipedLeft(gesture: any) {
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
            ? messageListItemLayout(last, rowViewModel)[0]
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

export default IterableInboxMessageCell;
