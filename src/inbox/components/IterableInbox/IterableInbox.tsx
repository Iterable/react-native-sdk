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

import { Iterable } from '../../../core/classes/Iterable';
import { useAppStateListener } from '../../../core/hooks/useAppStateListener';
import { useDeviceOrientation } from '../../../core/hooks/useDeviceOrientation';
import { IterableInAppDeleteSource } from '../../../inApp/enums/IterableInAppDeleteSource';
import { IterableInAppLocation } from '../../../inApp/enums/IterableInAppLocation';
import { IterableInboxDataModel } from '../../classes/IterableInboxDataModel';
import type { IterableInboxCustomizations } from '../../types/IterableInboxCustomizations';
import type { IterableInboxImpressionRowInfo } from '../../types/IterableInboxImpressionRowInfo';
import type { IterableInboxRowViewModel } from '../../types/IterableInboxRowViewModel';
import { IterableInboxEmptyState } from '../IterableInboxEmptyState';
import { IterableInboxMessageDisplay } from '../IterableInboxMessageDisplay';
import { IterableInboxMessageList } from '../IterableInboxMessageList';
import { DEFAULT_HEADLINE_HEIGHT, HEADLINE_PADDING_LEFT_LANDSCAPE, HEADLINE_PADDING_LEFT_PORTRAIT } from './constants';
import { styles } from './IterableInbox.styles';
import type { IterableInboxProps } from './IterableInbox.types';



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

const defaultInboxTitle = 'Inbox';

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
  } = props;
  const inboxDataModel = useMemo(() => new IterableInboxDataModel(), []);

  const { width, isPortrait } = useDeviceOrientation();
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

  // Fetch inbox messages
  const fetchInboxMessages = useCallback(async () => {
    let newMessages = await inboxDataModel.refresh();

    newMessages = newMessages.map((message, index) => {
      return { ...message, last: index === newMessages.length - 1 };
    });

    setRowViewModels(newMessages);
    setLoading(false);
  }, [inboxDataModel, setRowViewModels, setLoading]);

  // Slide the message list to the left and show a single selected message
  const slideLeft = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsMessageDisplay(true);
  }, [animatedValue, setIsMessageDisplay]);

  // Select a message
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

  // Delete a message
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

  // Returm to the message list
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


  // The empty state -- the display when there are no messages
  const emptyState = useMemo(() => {
    return loading ? (
      <View
        testID={iterableInboxTestIds.loadingScreen}
        style={styles.loadingScreen}
      />
    ) : (
      <IterableInboxEmptyState
        {...props}
        navTitleHeight={
          DEFAULT_HEADLINE_HEIGHT +
          styles.headline.paddingTop +
          styles.headline.paddingBottom
        }
      />
    );
  }, [loading, props]);

  // A single message -- the display when a message is selected
  const messageDisplay = useMemo(() => {
    const selectedRowViewModel = rowViewModels[selectedRowViewModelIdx];

    return selectedRowViewModel ? (
      <IterableInboxMessageDisplay
        rowViewModel={selectedRowViewModel}
        inAppContentPromise={inboxDataModel.getHtmlContentForMessageId(
          selectedRowViewModel.inAppMessage.messageId
        )}
        returnToInbox={returnToInbox}
        deleteRow={deleteRow}
      />
    ) : null;
  }, [
    deleteRow,
    inboxDataModel,
    returnToInbox,
    rowViewModels,
    selectedRowViewModelIdx,
  ]);

  // The list of messages
  const messageList = useMemo(() => {
    const title = customizations?.navTitle
      ? customizations?.navTitle
      : defaultInboxTitle;

    const paddingLeft = isPortrait
      ? HEADLINE_PADDING_LEFT_PORTRAIT
      : HEADLINE_PADDING_LEFT_LANDSCAPE;

    return (
      <View style={[styles.messageListContainer, { width: width }]}>
        {showNavTitle ? (
          <Text style={[styles.headline, { paddingLeft }]}>{title}</Text>
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
          />
        ) : (
          emptyState
        )}
      </View>
    );
  }, [
    width,
    showNavTitle,
    isPortrait,
    customizations?.navTitle,
    rowViewModels,
    props,
    inboxDataModel,
    deleteRow,
    emptyState,
    handleMessageSelect,
  ]);

  // Animated view that contains the message list and message display
  const inboxAnimatedView = useMemo(
    () => (
      <Animated.View
        testID="inbox-animated-view"
        style={[
          styles.animatedView,
          {
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -width],
                }),
              },
            ],
            width: 2 * width,
          },
        ]}
      >
        {messageList}
        {messageDisplay}
      </Animated.View>
    ),
    [animatedValue, width, messageList, messageDisplay]
  );

  // Fetches inbox messages and adds listener for inbox changes on mount
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

  // Starts session when user is on inbox
  // Ends session when user navigates away from inbox
  useEffect(() => {
    if (isFocused && appState === 'active') {
      inboxDataModel.startSession(visibleMessageImpressions);
    }
    if (isFocused && ['background', 'inactive'].includes(appState)) {
      inboxDataModel.endSession(visibleMessageImpressions);
    }
  }, [appState, inboxDataModel, isFocused, visibleMessageImpressions]);

  // Updates the visible rows when visible messages changes
  useEffect(() => {
    inboxDataModel.updateVisibleRows(visibleMessageImpressions);
  }, [inboxDataModel, visibleMessageImpressions]);

  // If return to inbox trigger is provided, runs the return to inbox animation
  // whenever the trigger is toggled
  useEffect(() => {
    if (isMessageDisplay) {
      returnToInbox();
    }
    //  MOB-10427: figure out if missing dependency is a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnToInboxTrigger]);

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
