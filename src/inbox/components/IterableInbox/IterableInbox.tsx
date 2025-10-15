import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  NativeEventEmitter,
  NativeModules,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStateListener, useDeviceOrientation } from '../../../core';
// expo throws an error if this is not imported directly due to circular
// dependencies
// See: https://github.com/expo/expo/issues/35100
import { Iterable } from '../../../core/classes/Iterable';
import {
  IterableInAppDeleteSource,
  IterableInAppLocation,
} from '../../../inApp';

import { IterableInboxDataModel } from '../../classes';
import type {
  IterableInboxCustomizations,
  IterableInboxImpressionRowInfo,
  IterableInboxRowViewModel,
} from '../../types';
import { IterableInboxEmptyState } from '../IterableInboxEmptyState';
import { IterableInboxMessageDisplay } from '../IterableInboxMessageDisplay';
import {
  IterableInboxMessageList,
  type IterableInboxMessageListProps,
} from '../IterableInboxMessageList';
import {
  DEFAULT_HEADLINE_HEIGHT,
  HEADLINE_PADDING_LEFT_LANDSCAPE,
  HEADLINE_PADDING_LEFT_PORTRAIT,
} from './constants';
import { styles } from './IterableInbox.styles';

const RNIterableAPI = NativeModules.RNIterableAPI;
const RNEventEmitter = new NativeEventEmitter(RNIterableAPI);

export const iterableInboxTestIds = {
  wrapper: 'inbox-wrapper',
  safeAreaView: 'inbox-safe-area-view',
  messageList: 'inbox-message-list',
  messageDisplay: 'inbox-message-display',
  headline: 'inbox-headline',
  loadingScreen: 'inbox-loading-screen',
  emptyState: 'inbox-empty-state',
  animatedView: 'inbox-animated-view',
  view: 'inbox-view',
};

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
export const IterableInbox = (props: IterableInboxProps) => {
  const {
    customizations = {} as IterableInboxCustomizations,
    returnToInboxTrigger = true,
    safeAreaMode = true,
    showNavTitle = true,
    tabBarHeight = 80,
    tabBarPadding = 20,
  } = props;
  const defaultInboxTitle = 'Inbox';
  const inboxDataModel = useMemo(() => new IterableInboxDataModel(), []);

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

  const containerStyle = [styles.container, { width: 2 * width }];

  //fetches inbox messages and adds listener for inbox changes on mount
  useEffect(() => {
    fetchInboxMessages();
    RNEventEmitter.addListener(
      'receivedIterableInboxChanged',
      fetchInboxMessages
    );

    //removes listener for inbox changes on unmount and ends inbox session
    return () => {
      RNEventEmitter.removeAllListeners('receivedIterableInboxChanged');
      inboxDataModel.endSession(visibleMessageImpressions);
    };
    //  MOB-10427: figure out if missing dependency is a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //starts session when user is on inbox
  //ends session when user navigates away from inbox
  useEffect(() => {
    if (isFocused && appState === 'active') {
      inboxDataModel.startSession(visibleMessageImpressions);
    }
    if (isFocused && ['background', 'inactive'].includes(appState)) {
      inboxDataModel.endSession(visibleMessageImpressions);
    }
  }, [appState, inboxDataModel, isFocused, visibleMessageImpressions]);

  //updates the visible rows when visible messages changes
  useEffect(() => {
    inboxDataModel.updateVisibleRows(visibleMessageImpressions);
  }, [inboxDataModel, visibleMessageImpressions]);

  //if return to inbox trigger is provided, runs the return to inbox animation whenever the trigger is toggled
  useEffect(() => {
    if (isMessageDisplay) {
      returnToInbox();
    }
    //  MOB-10427: figure out if missing dependency is a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnToInboxTrigger]);

  const slideLeft = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsMessageDisplay(true);
  }, [animatedValue, setIsMessageDisplay]);

  const fetchInboxMessages = useCallback(async () => {
    let newMessages = await inboxDataModel.refresh();

    newMessages = newMessages.map((message, index) => {
      return { ...message, last: index === newMessages.length - 1 };
    });

    setRowViewModels(newMessages);
    setLoading(false);
  }, [inboxDataModel, setRowViewModels, setLoading]);

  const handleMessageSelect = useCallback(
    (id: string, index: number, models: IterableInboxRowViewModel[]) => {
      const newRowViewModels = models.map((rowViewModel) => {
        return rowViewModel.inAppMessage.messageId === id
          ? { ...rowViewModel, read: true }
          : rowViewModel;
      });
      setRowViewModels(newRowViewModels);
      inboxDataModel.setMessageAsRead(id);
      setSelectedRowViewModelIdx(index);

      const inAppMessage = models?.[index]?.inAppMessage;

      if (inAppMessage) {
        Iterable.trackInAppOpen(inAppMessage, IterableInAppLocation.inbox);
      }

      slideLeft();
    },
    [inboxDataModel, setRowViewModels, setSelectedRowViewModelIdx, slideLeft]
  );

  const deleteRow = useCallback(
    (messageId: string) => {
      inboxDataModel.deleteItemById(
        messageId,
        IterableInAppDeleteSource.inboxSwipe
      );
      fetchInboxMessages();
    },
    [inboxDataModel, fetchInboxMessages]
  );

  const returnToInbox = useCallback(
    (callback?: () => void) => {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => typeof callback === 'function' && callback());
      setIsMessageDisplay(false);
    },
    [animatedValue]
  );

  const showMessageDisplay = useCallback(
    (rowViewModelList: IterableInboxRowViewModel[], index: number) => {
      const selectedRowViewModel = rowViewModelList[index];

      return selectedRowViewModel ? (
        <IterableInboxMessageDisplay
          rowViewModel={selectedRowViewModel}
          inAppContentPromise={inboxDataModel.getHtmlContentForMessageId(
            selectedRowViewModel.inAppMessage.messageId
          )}
          returnToInbox={returnToInbox}
          deleteRow={deleteRow}
          contentWidth={width}
          isPortrait={isPortrait}
        />
      ) : null;
    },
    [inboxDataModel, returnToInbox, deleteRow, width, isPortrait]
  );

  const renderEmptyState = useCallback(() => {
    return loading ? (
      <View
        testID={iterableInboxTestIds.loadingScreen}
        style={styles.loadingScreen}
      />
    ) : (
      <IterableInboxEmptyState
        customizations={customizations}
        tabBarHeight={tabBarHeight}
        tabBarPadding={tabBarPadding}
        navTitleHeight={
          DEFAULT_HEADLINE_HEIGHT +
          styles.headline.paddingTop +
          styles.headline.paddingBottom
        }
        contentWidth={width}
        height={height}
        isPortrait={isPortrait}
      />
    );
  }, [
    loading,
    customizations,
    tabBarHeight,
    tabBarPadding,
    width,
    height,
    isPortrait,
  ]);

  const showMessageList = useCallback(
    (_loading: boolean) => {
      return (
        <View style={[styles.messageListContainer, { width: width }]}>
          {showNavTitle ? (
            <Text
              style={[
                styles.headline,
                {
                  paddingLeft: isPortrait
                    ? HEADLINE_PADDING_LEFT_PORTRAIT
                    : HEADLINE_PADDING_LEFT_LANDSCAPE,
                },
              ]}
            >
              {customizations?.navTitle
                ? customizations?.navTitle
                : defaultInboxTitle}
            </Text>
          ) : null}
          {rowViewModels.length ? (
            <IterableInboxMessageList
              {...props}
              dataModel={inboxDataModel}
              rowViewModels={rowViewModels}
              deleteRow={deleteRow}
              handleMessageSelect={(messageId: string, index: number) =>
                handleMessageSelect(messageId, index, rowViewModels)
              }
              updateVisibleMessageImpressions={setVisibleMessageImpressions}
              contentWidth={width}
              isPortrait={isPortrait}
            />
          ) : (
            renderEmptyState()
          )}
        </View>
      );
    },
    [
      width,
      showNavTitle,
      isPortrait,
      customizations?.navTitle,
      rowViewModels,
      props,
      inboxDataModel,
      deleteRow,
      handleMessageSelect,
      renderEmptyState,
    ]
  );



  const inboxAnimatedView = useMemo(
    () => (
      <Animated.View
        testID="inbox-animated-view"
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
    ),
    [
      animatedValue,
      width,
      showMessageList,
      loading,
      showMessageDisplay,
      rowViewModels,
      selectedRowViewModelIdx,
    ]
  );

  return safeAreaMode ? (
    <SafeAreaView
      testID={iterableInboxTestIds.safeAreaView}
      style={containerStyle}
    >
      {inboxAnimatedView}
    </SafeAreaView>
  ) : (
    <View testID={iterableInboxTestIds.view} style={containerStyle}>
      {inboxAnimatedView}
    </View>
  );
};
