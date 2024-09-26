import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  NativeModules,
  NativeEventEmitter,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  IterableInAppDeleteSource,
  IterableInAppLocation,
} from './IterableInAppClasses';

import { Iterable } from './Iterable';

import IterableInboxEmptyState from './IterableInboxEmptyState';
import { type InboxImpressionRowInfo } from './InboxImpressionRowInfo';
import useDeviceOrientation from './useDeviceOrientation';
import useAppStateListener from './useAppStateListener';
import { type IterableInboxCustomizations } from './IterableInboxCustomizations';
import IterableInboxMessageList from './IterableInboxMessageList';
import IterableInboxMessageDisplay from './IterableInboxMessageDisplay';
import IterableInboxDataModel from './IterableInboxDataModel';
import { type InboxRowViewModel } from './InboxRowViewModel';

import { useIsFocused } from '@react-navigation/native';
import type IterableInAppMessage from './IterableInAppMessage';

const RNIterableAPI = NativeModules.RNIterableAPI;
const RNEventEmitter = new NativeEventEmitter(RNIterableAPI);

export interface IterableInboxProps {
  returnToInboxTrigger?: boolean;
  messageListItemLayout?: Function;
  customizations?: IterableInboxCustomizations;
  tabBarHeight?: number;
  tabBarPadding?: number;
  safeAreaMode?: boolean;
  showNavTitle?: boolean;
}

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
    //  TODO: Fix the exhaustive-deps rule
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
    //  TODO: Fix the exhaustive-deps rule
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
    //  TODO: Fix the exhaustive-deps rule
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  //updates the visible rows when visible messages changes
  useEffect(() => {
    inboxDataModel.updateVisibleRows(visibleMessageImpressions);
    //  TODO: Fix the exhaustive-deps rule
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleMessageImpressions]);

  //if return to inbox trigger is provided, runs the return to inbox animation whenever the trigger is toggled
  useEffect(() => {
    if (isMessageDisplay) {
      returnToInbox();
    }
    //  TODO: Fix the exhaustive-deps rule
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
    rows: InboxRowViewModel[]
  ) {
    const newRowViewModels = rows.map((rowViewModel) => {
      return rowViewModel.inAppMessage.messageId === id
        ? { ...rowViewModel, read: true }
        : rowViewModel;
    });
    setRowViewModels(newRowViewModels);
    inboxDataModel.setMessageAsRead(id);
    setSelectedRowViewModelIdx(index);

    Iterable.trackInAppOpen(
      // TODO: this could be undefined.  Find out what to do if it is.
      rows[index]?.inAppMessage as IterableInAppMessage,
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

  //   TODO: figure out if i can remove the loading parameter
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
      //  TODO: figure out why this is a best practice
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
