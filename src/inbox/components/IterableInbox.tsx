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

import {
  Iterable,
  useAppStateListener,
  useDeviceOrientation,
} from '../../core';
import { IterableInAppDeleteSource, IterableInAppLocation } from '../../inApp';

import { IterableInboxDataModel } from '../classes';
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
import { ITERABLE_INBOX_COLORS } from '../constants';

const RNIterableAPI = NativeModules.RNIterableAPI;
const RNEventEmitter = new NativeEventEmitter(RNIterableAPI);

const DEFAULT_HEADLINE_HEIGHT = 60;

// TODO: Comment
export interface IterableInboxProps
  extends Partial<
    Pick<IterableInboxMessageListProps, 'messageListItemLayout'>
  > {
  returnToInboxTrigger?: boolean;
  customizations?: IterableInboxCustomizations;
  tabBarHeight?: number;
  tabBarPadding?: number;
  safeAreaMode?: boolean;
  showNavTitle?: boolean;
}

// TODO: Comment
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
      height: Platform.OS === 'android' ? 70 : DEFAULT_HEADLINE_HEIGHT,
      marginTop: 0,
      paddingBottom: 10,
      paddingLeft: isPortrait ? 30 : 70,
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

  const { headline } = styles;
  const navTitleHeight =
    DEFAULT_HEADLINE_HEIGHT + headline.paddingTop + headline.paddingBottom;

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
      // TODO: Have a safety check for models[index].inAppMessage
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
    <SafeAreaView style={styles.container}>{inboxAnimatedView}</SafeAreaView>
  ) : (
    <View style={styles.container}>{inboxAnimatedView}</View>
  );
};