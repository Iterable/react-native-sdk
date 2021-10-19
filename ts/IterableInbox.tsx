'use strict'

import React, { useState, useEffect } from 'react'
import {
   View, 
   Text, 
   StyleSheet,
   Animated,
   NativeModules,
   NativeEventEmitter,
} from 'react-native'

import {
   IterableInboxMessageList,
   IterableInboxEmptyState,
   InboxRowViewModel,
   IterableInAppDeleteSource
} from '.'

// import IterableInboxMessageDisplay from './IterableInboxMessageDisplay'
import IterableInboxDataModel from './IterableInboxDataModel'
import IterableInboxCustomizations from './IterableInboxCustomizations'

import useAppStateListener from './useAppStateListener'
import useDeviceOrientation from './useDeviceOrientation'
import InboxImpressionRowInfo from './InboxImpressionRowInfo'

const RNIterableAPI = NativeModules.RNIterableAPI
const RNEventEmitter = new NativeEventEmitter(RNIterableAPI)

type inboxProps = {
   messageListItemLayout?: Function,
   customizations?: IterableInboxCustomizations,
   tabBarHeight?: number,
   tabBarPadding?: number
}

const IterableInbox = ({
   messageListItemLayout = () => {return null}, 
   customizations = {} as IterableInboxCustomizations,
   tabBarHeight = 80,
   tabBarPadding = 20
}: inboxProps) => {
   const defaultInboxTitle = "Inbox"
   const inboxDataModel = new IterableInboxDataModel()
   const appState = useAppStateListener()

   let { height, width, isPortrait } = useDeviceOrientation()

   const [screenWidth, setScreenWidth] = useState<number>(width)
   const [selectedRowViewModelIdx, setSelectedRowViewModelIdx] = useState<number>(0)
   const [rowViewModels, setRowViewModels] = useState<InboxRowViewModel[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [animatedValue, setAnimatedValue] = useState<any>(new Animated.Value(0))
   const [isMessageDisplay, setIsMessageDisplay] = useState<boolean>(false)
  
   let {
      loadingScreen,
      container,
      headline
   } = styles

   const navTitleHeight = headline.height + headline.paddingTop + headline.paddingBottom
   const updatedContainer = {...container, width: 2 * width, height: height - navTitleHeight - 40}
   const messageListContainer = { width: width }
   
   headline = (isPortrait) ? {...headline, marginTop: 40} : {...headline, paddingLeft: 65}

   useEffect(() => {
      fetchInboxMessages()
      // addInboxChangedListener()

      // return () => {
      //    removeInboxChangedListener()
      // }
   }, [])

   // useEffect(() => {
   //    if (appState === 'active') {
   //       // inboxDataModel.startSession()
   //    } else {
   //       // inboxDataModel.endSession()
   //    }
   // }, [appState])

   // useEffect(() => {
   //    setScreenWidth(width)
   //    if(isMessageDisplay) { 
   //       slideLeft() 
   //    } 
   // }, [width])

   // function addInboxChangedListener() {
   //    RNEventEmitter.addListener(
   //       "receivedIterableInboxChanged",
   //       () => {
   //          fetchInboxMessages()
   //       }
   //   )
   // }

   // function removeInboxChangedListener() {
   //    RNEventEmitter.removeAllListeners("receivedIterableInboxChanged")
   // }

   const fetchInboxMessages = async () => {
      let newMessages = await inboxDataModel.refresh()

      newMessages = newMessages.map((message, index) => {
         return {...message, last: index === newMessages.length - 1}
      })

      setRowViewModels(newMessages)
      setLoading(false)
   }

   // function getHtmlContentForRow(id: string) {
   //    return inboxDataModel.getHtmlContentForMessageId(id)
   // }

   // function handleMessageSelect(id: string, index: number, rowViewModels: InboxRowViewModel[]) {
   //    let newRowViewModels = rowViewModels.map((rowViewModel) => {
   //       return (rowViewModel.inAppMessage.messageId === id) ?
   //          {...rowViewModel, read: true } : rowViewModel
   //    })
   //    setRowViewModels(newRowViewModels)
   //    inboxDataModel.setMessageAsRead(id)
   //    setSelectedRowViewModelIdx(index)
   //    slideLeft()
   // }

   // const deleteRow = (messageId: string) => {
   //    inboxDataModel.deleteItemById(messageId, IterableInAppDeleteSource.inboxSwipe)
   //    fetchInboxMessages()
   // }

   // function returnToInbox() {
   //    reset()
   // }
   
   // function showMessageDisplay(rowViewModelList: InboxRowViewModel[], index: number) {
   //    const selectedRowViewModel = rowViewModelList[index]

   //    return (
   //       selectedRowViewModel ?
   //          <IterableInboxMessageDisplay
   //             rowViewModel={selectedRowViewModel}
   //             inAppContentPromise={getHtmlContentForRow(selectedRowViewModel.inAppMessage.messageId)}
   //             returnToInbox={() => returnToInbox()}
   //             contentWidth={width}
   //             isPortrait={isPortrait}
   //          /> : null
   //    )
   // }

   function showMessageList(loading: boolean) {
      return (
         <View style={messageListContainer}>
            <Text style={headline}>
               {customizations?.navTitle ? customizations?.navTitle : defaultInboxTitle}
            </Text>
            { rowViewModels.length ?
               <IterableInboxMessageList
                  dataModel = {inboxDataModel}
                  rowViewModels={rowViewModels}
                  customizations={customizations}
                  messageListItemLayout={messageListItemLayout}
                  // deleteRow={(messageId: string) => deleteRow(messageId)}
                  // handleMessageSelect={(messageId: string, index: number) => handleMessageSelect(messageId, index, rowViewModels)}
                  // contentWidth={width}
                  isPortrait={isPortrait}
               />  :
               renderEmptyState()
            }   
         </View>)
   }

   function renderEmptyState() {
      return loading ? 
         <View style={loadingScreen} /> : 
         <IterableInboxEmptyState 
            customizations={customizations} 
            tabBarHeight={tabBarHeight}
            tabBarPadding={tabBarPadding}
            navTitleHeight={navTitleHeight}
            contentWidth={width}
            height={height}
            isPortrait={isPortrait}
         /> 
   }

   // const slideLeft = () => {
   //    Animated.timing(animatedValue, {
   //       toValue: 1,
   //       duration: 500,
   //       useNativeDriver: false
   //    }).start()
   //    setIsMessageDisplay(true)
   // }

   // const reset = () => {
   //    Animated.timing(animatedValue, {
   //       toValue: 0,
   //       duration: 500,
   //       useNativeDriver: false
   //    }).start()
   //    setIsMessageDisplay(false)  
   // }

   // function updateCurrentVisibleRows() {
   //    // inboxDataModel.updateVisibleRows(getCurrentVisibleRows())
   // }

   // function getCurrentVisibleRows(): InboxImpressionRowInfo[] {

   //    return []
   // }

   return(
      <View style={updatedContainer}>
         <Animated.View
            style={{
               transform: [
                  {translateX: animatedValue.interpolate({
                     inputRange: [0, 1],
                     outputRange: [0, -screenWidth]
                  })}
               ],
               height: "100%",
               flexDirection: 'row',
               width: 2 * screenWidth,
               justifyContent: "flex-start",
            }}
         >
            {showMessageList(loading)}
            {/* {showMessageDisplay(rowViewModels, selectedRowViewModelIdx)} */}
         </Animated.View>
      </View>
   )
}

const styles = StyleSheet.create({
   loadingScreen: {
      height: '100%',
      backgroundColor: 'whitesmoke'
   },

   container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
   },

   headline: {
      fontWeight: 'bold' ,
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

export default IterableInbox