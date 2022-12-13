'use strict'

import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  NativeModules,
  NativeEventEmitter,
  Platform
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import {
   IterableInAppDeleteSource,
   IterableInAppLocation
} from './IterableInAppClasses'

import { Iterable } from './Iterable'

import IterableInboxEmptyState from './IterableInboxEmptyState'
import InboxImpressionRowInfo from './InboxImpressionRowInfo'
import useDeviceOrientation from './useDeviceOrientation'
import useAppStateListener from './useAppStateListener'
import IterableInboxCustomizations from './IterableInboxCustomizations'
import IterableInboxMessageList from './IterableInboxMessageList'
import IterableInboxMessageDisplay from './IterableInboxMessageDisplay'
import IterableInboxDataModel from './IterableInboxDataModel'
import InboxRowViewModel from './InboxRowViewModel'

import { useIsFocused } from '@react-navigation/native'

const RNIterableAPI = NativeModules.RNIterableAPI
const RNEventEmitter = new NativeEventEmitter(RNIterableAPI)

interface inboxProps {
  returnToInboxTrigger?: boolean
  messageListItemLayout?: Function
  customizations?: IterableInboxCustomizations
  tabBarHeight?: number
  tabBarPadding?: number
  safeAreaMode?: boolean
  showNavTitle?: boolean
}

const IterableInbox = ({
  returnToInboxTrigger = true,
  messageListItemLayout = () => { return null },
  customizations = {},
  tabBarHeight = 80,
  tabBarPadding = 20,
  safeAreaMode = true,
  showNavTitle = true
}: inboxProps): any => {
  const defaultInboxTitle = 'Inbox'
  const inboxDataModel = new IterableInboxDataModel()

  const { height, width, isPortrait } = useDeviceOrientation()
  const appState = useAppStateListener()
  const isFocused = useIsFocused()

  const [selectedRowViewModelIdx, setSelectedRowViewModelIdx] = useState<number>(0)
  const [rowViewModels, setRowViewModels] = useState<InboxRowViewModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [animatedValue] = useState<any>(new Animated.Value(0))
  const [isMessageDisplay, setIsMessageDisplay] = useState<boolean>(false)

  const [visibleMessageImpressions, setVisibleMessageImpressions] = useState<InboxImpressionRowInfo[]>([])

  const styles = StyleSheet.create({
    loadingScreen: {
      height: '100%',
      backgroundColor: 'whitesmoke'
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
      paddingRight: 0
    },

    messageListContainer: {
      height: '100%',
      width,
      flexDirection: 'column',
      justifyContent: 'flex-start'
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
      backgroundColor: 'whitesmoke'
    }
  })

  let {
    loadingScreen,
    container,
    headline,
    messageListContainer
  } = styles

  const navTitleHeight = headline.height + headline.paddingTop + headline.paddingBottom
  headline = { ...headline, height: Platform.OS === 'android' ? 70 : 60 }
  headline = (isPortrait != null) ? { ...headline, paddingLeft: 70 } : headline

  // fetches inbox messages and adds listener for inbox changes on mount
  useEffect(() => {
    void fetchInboxMessages()
    addInboxChangedListener()

    // removes listener for inbox changes on unmount and ends inbox session
    return () => {
      removeInboxChangedListener()
      void inboxDataModel.endSession(visibleMessageImpressions)
    }
  }, [])

  // starts session when user is on inbox and app is active
  // ends session when app is in background or app is closed
  useEffect(() => {
    if (isFocused) {
      if (appState === 'active') {
        inboxDataModel.startSession(visibleMessageImpressions)
      } else if ((appState === 'background' && Platform.OS === 'android') || appState === 'inactive') {
        void inboxDataModel.endSession(visibleMessageImpressions)
      }
    }
  }, [appState])

  // starts session when user is on inbox
  // ends session when user navigates away from inbox
  useEffect(() => {
    if (appState === 'active') {
      if (isFocused) {
        inboxDataModel.startSession(visibleMessageImpressions)
      } else {
        void inboxDataModel.endSession(visibleMessageImpressions)
      }
    }
  }, [isFocused])

  // updates the visible rows when visible messages changes
  useEffect(() => {
    inboxDataModel.updateVisibleRows(visibleMessageImpressions)
  }, [visibleMessageImpressions])

  // if return to inbox trigger is provided, runs the return to inbox animation whenever the trigger is toggled
  useEffect(() => {
    if (isMessageDisplay) {
      returnToInbox()
    }
  }, [returnToInboxTrigger])

  function addInboxChangedListener (): void {
    RNEventEmitter.addListener(
      'receivedIterableInboxChanged',
      () => {
        void fetchInboxMessages()
      }
    )
  }

  function removeInboxChangedListener (): void {
    RNEventEmitter.removeAllListeners('receivedIterableInboxChanged')
  }

  async function fetchInboxMessages (): Promise<void> {
    let newMessages = await inboxDataModel.refresh()

    newMessages = newMessages.map((message, index) => {
      return { ...message, last: index === newMessages.length - 1 }
    })

    setRowViewModels(newMessages)
    setLoading(false)
  }

  async function getHtmlContentForRow (id: string): Promise<IterableHtmlInAppContent> {
    return await inboxDataModel.getHtmlContentForMessageId(id)
  }

  function handleMessageSelect (id: string, index: number, rowViewModels: InboxRowViewModel[]): void {
    const newRowViewModels = rowViewModels.map((rowViewModel) => {
      return (rowViewModel.inAppMessage.messageId === id)
        ? { ...rowViewModel, read: true }
        : rowViewModel
    })
    setRowViewModels(newRowViewModels)
    inboxDataModel.setMessageAsRead(id)
    setSelectedRowViewModelIdx(index)

    Iterable.trackInAppOpen(rowViewModels[index].inAppMessage, IterableInAppLocation.inbox)

    slideLeft()
  }

  function deleteRow (messageId: string): void {
    inboxDataModel.deleteItemById(messageId, IterableInAppDeleteSource.inboxSwipe)
    void fetchInboxMessages()
  }

  function returnToInbox (callback?: Function): void {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start(() => typeof callback === 'function' && callback())
    setIsMessageDisplay(false)
  }

  function updateVisibleMessageImpressions (messageImpressions: InboxImpressionRowInfo[]): void {
    setVisibleMessageImpressions(messageImpressions)
  }

  function showMessageDisplay (rowViewModelList: InboxRowViewModel[], index: number): any {
    const selectedRowViewModel = rowViewModelList[index]

    return (
      (selectedRowViewModel != null)
        ? <IterableInboxMessageDisplay
               rowViewModel={selectedRowViewModel}
               inAppContentPromise={getHtmlContentForRow(selectedRowViewModel.inAppMessage.messageId)}
               returnToInbox={(callback: Function) => returnToInbox(callback)}
               deleteRow={(messageId: string) => deleteRow(messageId)}
               contentWidth={width}
               isPortrait={isPortrait}
            />
        : null
    )
  }

  function showMessageList (loading: boolean): any {
    return (
         <View style={messageListContainer}>
            {showNavTitle
              ? <Text style={headline}>
                  {(customizations?.navTitle != null) ? customizations?.navTitle : defaultInboxTitle}
               </Text>
              : null}
            {(rowViewModels.length > 0)
              ? <IterableInboxMessageList
                  dataModel={inboxDataModel}
                  rowViewModels={rowViewModels}
                  customizations={customizations}
                  messageListItemLayout={messageListItemLayout}
                  deleteRow={(messageId: string) => deleteRow(messageId)}
                  handleMessageSelect={(messageId: string, index: number) => handleMessageSelect(messageId, index, rowViewModels)}
                  updateVisibleMessageImpressions={(messageImpressions: InboxImpressionRowInfo[]) => updateVisibleMessageImpressions(messageImpressions)}
                  contentWidth={width}
                  isPortrait={isPortrait}
               />
              : renderEmptyState(customizations)
            }
         </View>)
  }

  function renderEmptyState (customizations: IterableInboxCustomizations): any {
    return loading
      ? <View style={loadingScreen} />
      : <IterableInboxEmptyState
            customizations={customizations}
            tabBarHeight={tabBarHeight}
            tabBarPadding={tabBarPadding}
            navTitleHeight={navTitleHeight}
            contentWidth={width}
            height={height}
            isPortrait={isPortrait}
         />
  }

  function slideLeft (): void {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start()
    setIsMessageDisplay(true)
  }

  const inboxAnimatedView =
      <Animated.View
         style={{
           transform: [
             {
               translateX: animatedValue.interpolate({
                 inputRange: [0, 1],
                 outputRange: [0, -width]
               })
             }
           ],
           height: '100%',
           flexDirection: 'row',
           width: 2 * width,
           justifyContent: 'flex-start'
         }}
      >
         {showMessageList(loading)}
         {showMessageDisplay(rowViewModels, selectedRowViewModelIdx)}
      </Animated.View>

  return (
    (safeAreaMode)
      ? <SafeAreaView style={container}>{inboxAnimatedView}</SafeAreaView>
      : <View style={container}>{inboxAnimatedView}</View>
  )
}

export default IterableInbox
