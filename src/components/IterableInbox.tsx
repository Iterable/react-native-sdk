import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Animated,
  NativeEventEmitter,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { InboxImpressionRowInfo } from '../InboxImpressionRowInfo';
import type { InboxRowViewModel } from '../InboxRowViewModel';
import { Iterable } from '../Iterable';
import {
  IterableInAppDeleteSource,
  IterableInAppLocation,
} from '../IterableInAppClasses';
import type { IterableInboxCustomizations } from '../IterableInboxCustomizations';
import IterableInboxDataModel from '../IterableInboxDataModel';
import IterableInboxEmptyState from './IterableInboxEmptyState';
import IterableInboxMessageDisplay from './IterableInboxMessageDisplay';
import IterableInboxMessageList from './IterableInboxMessageList';
import useAppStateListener from '../hooks/useAppStateListener';
import useDeviceOrientation from '../hooks/useDeviceOrientation';

const RNIterableAPI = NativeModules.RNIterableAPI;
const RNEventEmitter = new NativeEventEmitter(RNIterableAPI);

/**
 * The props type for {@link IterableInbox}.
 */
export interface IterableInboxProps {
  returnToInboxTrigger?: boolean;
  /**
   * To specify a custom layout for your inbox rows, when you instantate your
   * IterableInbox, assign a function to its messageListItemLayout prop. The
   * inbox will call this function for each of its rows, and it should return:
   *
   * 1. JSX that represents the custom layout for the row.
   * 2. The height of the row (must be the same for all rows).
   *
   * A row layout can reference the fields stored in the passed-in rowViewModel,
   * which is an instance of {@link InboxRowViewModel}.
   *
   * @example
   * ```tsx
   * const messageListItemLayout = (last: boolean, rowViewModel: InboxRowViewModel) => (
   *    <View style={rowViewModel.read ? readMessageContainer : unreadMessageContainer}>
   *      <Text>{messageTitle}</Text>
   *      <Text>{messageBody}</Text>
   *      <Text>{messageCreatedAt}</Text>
   *    </View>
   * )
   *
   * const Inbox = () => (
   *    <IterableInbox
   *      messageListItemLayout={(last: boolean, rowViewModel: InboxRowViewModel) => MessageListItemLayout(last, rowViewModel)}
   *    />
   * )
   *```
   */
  messageListItemLayout?: (
    last: boolean,
    rowViewModel: InboxRowViewModel
  ) => JSX.Element | null;
  /**
   * Customizations for the look/feel of the inbox.
   *
   * @example
   * ```tsx
   * const iterableInboxCustomization = {
   *    navTitle: 'Iterable',
   *    noMessagesTitle: 'No messages today',
   *    noMessagesBody: 'Come back later',
   * }
   *
   * <IterableInbox customizations={iterableInboxCustomization} />
   * ```
   */
  customizations?: IterableInboxCustomizations;
  /** Height of the tab bar */
  tabBarHeight?: number;
  /** Padding around the tab bar */
  tabBarPadding?: number;
  safeAreaMode?: boolean;
  /** Should the nav title be shown? */
  showNavTitle?: boolean;
}

/**
 * Renders an inbox for in app messages
 *
 * @param {IterableInboxProps} props - The props for the component
 *
 * @example
 * ```tsx
 * const iterableInboxCustomization = {
  navTitle: 'Iterable',
  noMessagesTitle: 'No messages today',
  noMessagesBody: 'Come back later',

  unreadIndicatorContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  unreadIndicator: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: 'orange',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },

  unreadMessageIconContainer: {
    paddingLeft: 0,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  readMessageIconContainer: {
    paddingLeft: 35,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  messageContainer: {
    paddingLeft: 10,
    width: '65%',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    paddingBottom: 10,
  },

  body: {
    fontSize: 15,
    color: 'lightgray',
    width: '65%',
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
    height: 200,
    borderStyle: 'solid',
    borderColor: 'red',
    borderTopWidth: 1,
  },
};

export const CustomizedInbox = (props: IterableInboxProps) => {
  return (
    <IterableInbox
      customizations={iterableInboxCustomization}
      {...props}
    />
  );
};
  * ```
* @remarks
* A mobile inbox displays a list of saved in-app messages that users can revisit at their convenience. This way, they can access messages right when they're relevant—for example, maybe pulling up a coupon while shopping.

Iterable's React Native SDK provides a default mobile inbox implementation. It includes a customizable user interface, and it saves events to Iterable as users view and interact with your in-app messages.
 *
 * @category Component
 */
export const IterableInbox = ({
  returnToInboxTrigger = true,
  messageListItemLayout = () => null,
  customizations = {} as IterableInboxCustomizations,
  tabBarHeight = 80,
  tabBarPadding = 20,
  safeAreaMode = true,
  showNavTitle = true,
}: IterableInboxProps) => {
  const defaultInboxTitle = 'Inbox';
  const inboxDataModel = new IterableInboxDataModel();

  let { height, width, isPortrait } = useDeviceOrientation();
  const appState = useAppStateListener();
  const isFocused = useIsFocused();

  const [selectedRowViewModelIdx, setSelectedRowViewModelIdx] =
    useState<number>(0);
  const [rowViewModels, setRowViewModels] = useState<InboxRowViewModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [animatedValue] = useState<any>(new Animated.Value(0));
  const [isMessageDisplay, setIsMessageDisplay] = useState<boolean>(false);

  const [visibleMessageImpressions, setVisibleMessageImpressions] = useState<
    InboxImpressionRowInfo[]
  >([]);

  const styles = StyleSheet.create({
    loadingScreen: {
      height: '100%',
      backgroundColor: 'whitesmoke',
    },

    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100%',
      width: 2 * width,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
    },

    messageListContainer: {
      height: '100%',
      width: width,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },

    headline: {
      fontWeight: 'bold',
      fontSize: 40,
      width: '100%',
      height: 60,
      marginTop: 0,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 30,
      backgroundColor: 'whitesmoke',
    },
  });

  let { loadingScreen, container, headline, messageListContainer } = styles;

  const navTitleHeight =
    headline.height + headline.paddingTop + headline.paddingBottom;
  headline = { ...headline, height: Platform.OS === 'android' ? 70 : 60 };
  headline = !isPortrait ? { ...headline, paddingLeft: 70 } : headline;

  //fetches inbox messages and adds listener for inbox changes on mount
  useEffect(() => {
    fetchInboxMessages();
    addInboxChangedListener();

    //removes listener for inbox changes on unmount and ends inbox session
    return () => {
      removeInboxChangedListener();
      inboxDataModel.endSession(visibleMessageImpressions);
    };
    //  TODO: figure out if missing dependency is a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //starts session when user is on inbox and app is active
  //ends session when app is in background or app is closed
  useEffect(() => {
    if (isFocused) {
      if (appState === 'active') {
        inboxDataModel.startSession(visibleMessageImpressions);
      } else if (
        (appState === 'background' && Platform.OS === 'android') ||
        appState === 'inactive'
      ) {
        inboxDataModel.endSession(visibleMessageImpressions);
      }
    }
    //  TODO: figure out if missing dependency is a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  //starts session when user is on inbox
  //ends session when user navigates away from inbox
  useEffect(() => {
    if (appState === 'active') {
      if (isFocused) {
        inboxDataModel.startSession(visibleMessageImpressions);
      } else {
        inboxDataModel.endSession(visibleMessageImpressions);
      }
    }
    //  TODO: figure out if missing dependency is a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  //updates the visible rows when visible messages changes
  useEffect(() => {
    inboxDataModel.updateVisibleRows(visibleMessageImpressions);
    //  TODO: figure out if missing dependency is a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleMessageImpressions]);

  //if return to inbox trigger is provided, runs the return to inbox animation whenever the trigger is toggled
  useEffect(() => {
    if (isMessageDisplay) {
      returnToInbox();
    }
    //  TODO: figure out if missing dependency is a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnToInboxTrigger]);

  function addInboxChangedListener() {
    RNEventEmitter.addListener('receivedIterableInboxChanged', () => {
      fetchInboxMessages();
    });
  }

  function removeInboxChangedListener() {
    RNEventEmitter.removeAllListeners('receivedIterableInboxChanged');
  }

  async function fetchInboxMessages() {
    let newMessages = await inboxDataModel.refresh();

    newMessages = newMessages.map((message, index) => {
      return { ...message, last: index === newMessages.length - 1 };
    });

    setRowViewModels(newMessages);
    setLoading(false);
  }

  function getHtmlContentForRow(id: string) {
    return inboxDataModel.getHtmlContentForMessageId(id);
  }

  function handleMessageSelect(
    id: string,
    index: number,
    models: InboxRowViewModel[]
  ) {
    let newRowViewModels = models.map((rowViewModel) => {
      return rowViewModel.inAppMessage.messageId === id
        ? { ...rowViewModel, read: true }
        : rowViewModel;
    });
    setRowViewModels(newRowViewModels);
    inboxDataModel.setMessageAsRead(id);
    setSelectedRowViewModelIdx(index);

    Iterable.trackInAppOpen(
      // TODO: Have a safety check for models[index].inAppMessage
      // @ts-ignore
      models[index].inAppMessage,
      IterableInAppLocation.inbox
    );

    slideLeft();
  }

  function deleteRow(messageId: string) {
    inboxDataModel.deleteItemById(
      messageId,
      IterableInAppDeleteSource.inboxSwipe
    );
    fetchInboxMessages();
  }

  function returnToInbox(callback?: Function) {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => typeof callback === 'function' && callback());
    setIsMessageDisplay(false);
  }

  function updateVisibleMessageImpressions(
    messageImpressions: InboxImpressionRowInfo[]
  ) {
    setVisibleMessageImpressions(messageImpressions);
  }

  function showMessageDisplay(
    rowViewModelList: InboxRowViewModel[],
    index: number
  ) {
    const selectedRowViewModel = rowViewModelList[index];

    return selectedRowViewModel ? (
      <IterableInboxMessageDisplay
        rowViewModel={selectedRowViewModel}
        inAppContentPromise={getHtmlContentForRow(
          selectedRowViewModel.inAppMessage.messageId
        )}
        returnToInbox={(callback: Function) => returnToInbox(callback)}
        deleteRow={(messageId: string) => deleteRow(messageId)}
        contentWidth={width}
        isPortrait={isPortrait}
      />
    ) : null;
  }

  function showMessageList(_loading: boolean) {
    return (
      <View style={messageListContainer}>
        {showNavTitle ? (
          <Text style={headline}>
            {customizations?.navTitle
              ? customizations?.navTitle
              : defaultInboxTitle}
          </Text>
        ) : null}
        {rowViewModels.length ? (
          <IterableInboxMessageList
            dataModel={inboxDataModel}
            rowViewModels={rowViewModels}
            customizations={customizations}
            messageListItemLayout={messageListItemLayout}
            deleteRow={(messageId: string) => deleteRow(messageId)}
            handleMessageSelect={(messageId: string, index: number) =>
              handleMessageSelect(messageId, index, rowViewModels)
            }
            updateVisibleMessageImpressions={(
              messageImpressions: InboxImpressionRowInfo[]
            ) => updateVisibleMessageImpressions(messageImpressions)}
            contentWidth={width}
            isPortrait={isPortrait}
          />
        ) : (
          renderEmptyState()
        )}
      </View>
    );
  }

  function renderEmptyState() {
    return loading ? (
      <View style={loadingScreen} />
    ) : (
      <IterableInboxEmptyState
        customizations={customizations}
        tabBarHeight={tabBarHeight}
        tabBarPadding={tabBarPadding}
        navTitleHeight={navTitleHeight}
        contentWidth={width}
        height={height}
        isPortrait={isPortrait}
      />
    );
  }

  function slideLeft() {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsMessageDisplay(true);
  }

  const inboxAnimatedView = (
    <Animated.View
      //  TODO: Change to use `StyleSheet.create` for styles, per best practices
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        transform: [
          {
            translateX: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -width],
            }),
          },
        ],
        height: '100%',
        flexDirection: 'row',
        width: 2 * width,
        justifyContent: 'flex-start',
      }}
    >
      {showMessageList(loading)}
      {showMessageDisplay(rowViewModels, selectedRowViewModelIdx)}
    </Animated.View>
  );

  return safeAreaMode ? (
    <SafeAreaView style={container}>{inboxAnimatedView}</SafeAreaView>
  ) : (
    <View style={container}>{inboxAnimatedView}</View>
  );
};

export default IterableInbox;
