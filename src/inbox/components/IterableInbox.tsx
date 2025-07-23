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

import { useAppStateListener, useDeviceOrientation } from '../../core';
// expo throws an error if this is not imported directly due to circular
// dependencies
// See: https://github.com/expo/expo/issues/35100
import { Iterable } from '../../core/classes/Iterable';
import { IterableInAppDeleteSource, IterableInAppLocation } from '../../inApp';

import { IterableInboxDataModel } from '../classes';
import { ITERABLE_INBOX_COLORS } from '../constants';
import type {
  IterableInboxCustomizations,
  IterableInboxImpressionRowInfo,
  IterableInboxRowViewModel,
} from '../types';
import { IterableInboxEmptyState } from './IterableInboxEmptyState';
import { IterableInboxMessageDisplay } from './IterableInboxMessageDisplay';
import {
  IterableInboxMessageList,
  type IterableInboxMessageListProps,
} from './IterableInboxMessageList';
import { api, oldApi } from '../../api';

const RNIterableAPI =oldApi;
// const RNIterableAPI = NativeModules.RNIterableAPI;
const RNEventEmitter = new NativeEventEmitter(api);

const DEFAULT_HEADLINE_HEIGHT = 60;
const ANDROID_HEADLINE_HEIGHT = 70;
const HEADLINE_PADDING_LEFT_PORTRAIT = 30;
const HEADLINE_PADDING_LEFT_LANDSCAPE = 70;

/**
 * Props for the IterableInbox component.
 */
export interface IterableInboxProps
  extends Partial<
    Pick<IterableInboxMessageListProps, 'messageListItemLayout'>
  > {
  /**
   * Flag which, when switched, returns a user to their inbox from _within_ the
   * inbox component (from the details of the particular message to the message
   * list) if the inbox is already in view.
   *
   * @remarks
   * Let's say you have bottom tabs in your app, and one of them is the inbox.
   * If you click on a message, you may want to be able to return to the inbox
   * by clicking on the bottom tab inbox icon.
   *
   * If this prop is included and correctly set up, clicking on the bottom inbox
   * tab when a message is in focus will return the user to the inbox.
   *
   * If this prop is **NOT** included, clicking on the bottom inbox tab when a
   * message is in focus will have no effect.
   *
   * @example
   * ```tsx
   *  import { NavigationContainer } from '@react-navigation/native';
   *  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
   *  import { IterableInbox} from '@iterable/react-native-sdk/js/Iterable';
   *
   *  const Tab = createBottomTabNavigator();
   *
   *  const MyNavigation = () => {
   *    const [isInbox, setIsInbox] = useState<boolean>(false);
   *    const [returnToInboxTrigger, setReturnToInboxTrigger] = useState<boolean>(false);
   *
   *    return (
   *      <NavigationContainer>
   *        <Tab.Navigator>
   *          <Tab.Screen
   *            name="Home"
   *            component={Home}
   *            listeners={{tabPress: () => setIsInbox(false)}}
   *          />
   *          <Tab.Screen
   *            name="Inbox"
   *            listeners={{
   *              tabPress: () => {
   *                // if this is true, then the inbox is already displayed, so
   *                // go back to the message list if it is not already in view
   *                if (isInbox) {
   *                  setReturnToInboxTrigger(!returnToInboxTrigger);
   *                }
   *                setIsInbox(true);
   *              }
   *            }}
   *          >
   *            {() => (
   *              <IterableInbox
   *                returnToInboxTrigger={returnToInboxTrigger}
   *              />
   *            )}
   *          </Tab.Screen>
   *          <Tab.Screen
   *            name="Settings"
   *            component={Settings}
   *            listeners={{tabPress: () => setIsInbox(false)}}
   *          />
   *        </Tab.Navigator>
   *      </NavigationContainer>
   *    );
   *  }
   * ```
   */
  returnToInboxTrigger?: boolean;
  /** Customization for the look and feel of the inbox. */
  customizations?: IterableInboxCustomizations;
  /**
   * The height of the tab bar.
   *
   * If your app uses custom tab bar dimensions, provide this value to make sure that the inbox component lays out as expected.
   */
  tabBarHeight?: number;
  /**
   * The padding of the tab bar.
   *
   * If your app uses custom tab bar dimensions, provide this value to make sure that the inbox component lays out as expected.
   */
  tabBarPadding?: number;
  /**
   * Is safe area mode enabled?
   *
   * @remarks
   * This indicates whether or not the inbox should be displayed inside a React
   * Native [`SafeAreaView`](https://reactnative.dev/docs/safeareaview).
   *
   * If the parent of the inbox component is already inside a `SafeAreaView`, set
   * this to `false` as another `SafeAreaView` is not needed.
   *
   * @example
   * ```tsx
   *  // Safe area mode should be `true` as it is NOT already inside a `SafeAreaView`
   *  const MyInbox = () => <IterableInbox safeAreaMode={true} />;
   *
   *  // Safe area mode should be `false` as it is already inside a `SafeAreaView`
   *  const MyInbox = () => (
   *    <SafeAreaView>
   *      <IterableInbox safeAreaMode={false} />
   *    </SafeAreaView>
   *  );
   * ```
   */
  safeAreaMode?: boolean;
  /** Should the navigation title be shown? */
  showNavTitle?: boolean;
}

/**
 * The `IterableInbox` component is responsible for displaying an inbox of messages.
 * It handles fetching messages, displaying them in a list, and showing individual message details.
 * It also manages the state of the inbox, including loading state, selected message, and visible message impressions.
 *
 * @example
 * ```tsx
 * const [visible, setVisible] = useState<boolean>(false);
 *
 * return (
 *  <>
 *    <Button title="Return to Inbox" onPress={() => setVisible(!visible)} />
 *    {visible && (
 *      <IterableInbox
 *        returnToInboxTrigger={visible}
 *        customizations={{
 *          navTitle: 'My Inbox',
 *          unreadIndicator: {
 *            backgroundColor: 'red',
 *            height: 10,
 *          }
 *        }}
 *        showNavTitle={true}
 *        tabBarHeight={80}
 *      />
 *    )}
 *  </>
 * )
 * ```
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

  const { height, width, isPortrait } = useDeviceOrientation();
  const appState = useAppStateListener();
  const isFocused = useIsFocused();

  const [selectedRowViewModelIdx, setSelectedRowViewModelIdx] =
    useState<number>(0);
  const [rowViewModels, setRowViewModels] = useState<
    IterableInboxRowViewModel[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [animatedValue] = useState<Animated.Value>(new Animated.Value(0));
  const [isMessageDisplay, setIsMessageDisplay] = useState<boolean>(false);

  const [visibleMessageImpressions, setVisibleMessageImpressions] = useState<
    IterableInboxImpressionRowInfo[]
  >([]);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'flex-start',
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      width: 2 * width,
    },

    headline: {
      backgroundColor: ITERABLE_INBOX_COLORS.CONTAINER_BACKGROUND,
      fontSize: 40,
      fontWeight: 'bold',
      height:
        Platform.OS === 'android'
          ? ANDROID_HEADLINE_HEIGHT
          : DEFAULT_HEADLINE_HEIGHT,
      marginTop: 0,
      paddingBottom: 10,
      paddingLeft: isPortrait
        ? HEADLINE_PADDING_LEFT_PORTRAIT
        : HEADLINE_PADDING_LEFT_LANDSCAPE,
      paddingTop: 10,
      width: '100%',
    },

    loadingScreen: {
      backgroundColor: ITERABLE_INBOX_COLORS.CONTAINER_BACKGROUND,
      height: '100%',
    },

    messageListContainer: {
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'flex-start',
      width: width,
    },
  });

  const navTitleHeight =
    DEFAULT_HEADLINE_HEIGHT +
    styles.headline.paddingTop +
    styles.headline.paddingBottom;

  //fetches inbox messages and adds listener for inbox changes on mount
  useEffect(() => {
    fetchInboxMessages();
    addInboxChangedListener();

    //removes listener for inbox changes on unmount and ends inbox session
    return () => {
      removeInboxChangedListener();
      inboxDataModel.endSession(visibleMessageImpressions);
    };
    //  MOB-10427: figure out if missing dependency is a bug
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
    //  MOB-10427: figure out if missing dependency is a bug
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
    //  MOB-10427: figure out if missing dependency is a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  //updates the visible rows when visible messages changes
  useEffect(() => {
    inboxDataModel.updateVisibleRows(visibleMessageImpressions);
    //  MOB-10427: figure out if missing dependency is a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleMessageImpressions]);

  //if return to inbox trigger is provided, runs the return to inbox animation whenever the trigger is toggled
  useEffect(() => {
    if (isMessageDisplay) {
      returnToInbox();
    }
    //  MOB-10427: figure out if missing dependency is a bug
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
    models: IterableInboxRowViewModel[]
  ) {
    const newRowViewModels = models.map((rowViewModel) => {
      return rowViewModel.inAppMessage.messageId === id
        ? { ...rowViewModel, read: true }
        : rowViewModel;
    });
    setRowViewModels(newRowViewModels);
    inboxDataModel.setMessageAsRead(id);
    setSelectedRowViewModelIdx(index);

    Iterable.trackInAppOpen(
      // MOB-10428: Have a safety check for models[index].inAppMessage
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

  function returnToInbox(callback?: () => void) {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => typeof callback === 'function' && callback());
    setIsMessageDisplay(false);
  }

  function updateVisibleMessageImpressions(
    messageImpressions: IterableInboxImpressionRowInfo[]
  ) {
    setVisibleMessageImpressions(messageImpressions);
  }

  function showMessageDisplay(
    rowViewModelList: IterableInboxRowViewModel[],
    index: number
  ) {
    const selectedRowViewModel = rowViewModelList[index];

    return selectedRowViewModel ? (
      <IterableInboxMessageDisplay
        rowViewModel={selectedRowViewModel}
        inAppContentPromise={getHtmlContentForRow(
          selectedRowViewModel.inAppMessage.messageId
        )}
        returnToInbox={returnToInbox}
        deleteRow={(messageId: string) => deleteRow(messageId)}
        contentWidth={width}
        isPortrait={isPortrait}
      />
    ) : null;
  }

  function showMessageList(_loading: boolean) {
    return (
      <View style={styles.messageListContainer}>
        {showNavTitle ? (
          <Text style={styles.headline}>
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
              messageImpressions: IterableInboxImpressionRowInfo[]
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
      <View style={styles.loadingScreen} />
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
      // MOB-10429: Change to use `StyleSheet.create` for styles, per best practices
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
    <SafeAreaView style={styles.container}>{inboxAnimatedView}</SafeAreaView>
  ) : (
    <View style={styles.container}>{inboxAnimatedView}</View>
  );
};
