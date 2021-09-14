'use strict'

import React, { useState, useEffect } from 'react'
import {
   View, 
   Text, 
   SafeAreaView, 
   StyleSheet,
   Animated,
   useWindowDimensions
} from 'react-native'

import {
   IterableInboxMessageList,
   IterableInboxEmptyState,
   InboxRowViewModel,
   IterableInAppDeleteSource
} from '.'

import IterableInboxMessageDisplay from './IterableInboxMessageDisplay'
import IterableInboxDataModel from './IterableInboxDataModel'
import IterableInboxCustomizations from './IterableInboxCustomizations'

import { useOrientation } from './useOrientation'

type inboxProps = {
   messageListItemLayout: Function,
   customizations: IterableInboxCustomizations,
   tabBarHeight: number,
   tabBarPadding: number
}

const IterableInbox = ({
   messageListItemLayout, 
   customizations,
   tabBarHeight,
   tabBarPadding
}: inboxProps) => {
   const defaultInboxTitle = "Inbox"
   const [selectedRowViewModelIdx, setSelectedRowViewModelIdx] = useState<number>(0)
   const [rowViewModels, setRowViewModels] = useState<InboxRowViewModel[]>([])
   const [loading, setLoading] = useState<boolean>(true)
   const inboxDataModel = new IterableInboxDataModel()

   const SCREEN_WIDTH = useWindowDimensions().width
   const SCREEN_HEIGHT = useWindowDimensions().height
   const navTitleHeight = 80

   const [animatedValue, setAnimatedValue] = useState<any>(new Animated.Value(0))

   const orientation = useOrientation()

   let {
      loadingScreen,
      container,
      headline
   } = styles

   const updatedContainer = {...container, width: 2 * SCREEN_WIDTH, height: SCREEN_HEIGHT - navTitleHeight - 40}
   const messageListContainer = { width: SCREEN_WIDTH }
   
   headline = (orientation === 'PORTRAIT') ? {...headline, marginTop: 40} : {...headline, paddingLeft: 30}

   const fetchData = async () => {
      const newRowViewModels = await inboxDataModel.refresh()
      setRowViewModels(newRowViewModels)
   }

   useEffect(() => {
      fetchInboxMessages()
   }, [])

   const fetchInboxMessages = async () => {
      let newMessages = await inboxDataModel.refresh()

      newMessages = newMessages.map((message, index) => {
         return {...message, last: index === newMessages.length - 1}
      })

      setRowViewModels(newMessages)
      setLoading(false)
   }

   function getHtmlContentForRow(id: string) {
      return inboxDataModel.getHtmlContentForMessageId(id)
   }

   function handleMessageSelect(id: string, index: number, rowViewModels: InboxRowViewModel[]) {
      let newRowViewModels = rowViewModels.map((rowViewModel) => {
         return (rowViewModel.inAppMessage.messageId === id) ?
            {...rowViewModel, read: true } : rowViewModel
      })
      setRowViewModels(newRowViewModels)
      inboxDataModel.setMessageAsRead(id)
      setSelectedRowViewModelIdx(index)
      slideLeft()
   }

   const deleteRow = (messageId: string) => {
      inboxDataModel.deleteItemById(messageId, IterableInAppDeleteSource.inboxSwipe)
      fetchData()
   }

   function returnToInbox() {
      reset()
   }
   
   function showMessageDisplay(rowViewModelList: InboxRowViewModel[], index: number) {
      const selectedRowViewModel = rowViewModelList[index]

      return (
         selectedRowViewModel ?
            <IterableInboxMessageDisplay
               rowViewModel={selectedRowViewModel}
               inAppContentPromise={getHtmlContentForRow(selectedRowViewModel.inAppMessage.messageId)}
               returnToInbox={() => returnToInbox()}
            /> : null
      )
   }

   function showMessageList(loading: boolean) {
      return (
         <View style={messageListContainer}>
            <Text style={headline}>
               {customizations.navTitle ? customizations.navTitle : defaultInboxTitle}
            </Text>
            { rowViewModels.length ?
               <IterableInboxMessageList 
                  rowViewModels={rowViewModels}
                  customizations={customizations}
                  messageListItemLayout={messageListItemLayout}
                  deleteRow={(messageId: string) => deleteRow(messageId)}
                  handleMessageSelect={(messageId: string, index: number) => handleMessageSelect(messageId, index, rowViewModels)}
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
         /> 
   }

   const slideLeft = () => {
      Animated.timing(animatedValue, {
         toValue: 1,
         duration: 500,
         useNativeDriver: false
      }).start()
   }

   const reset = () => {
      Animated.timing(animatedValue, {
         toValue: 0,
         duration: 500,
         useNativeDriver: false
      }).start()  
   }

   return(
      <View style={updatedContainer}>
         <Animated.View
            style={{
               transform: [
                  {translateX: animatedValue.interpolate({
                     inputRange: [0, 1],
                     outputRange: [0, -SCREEN_WIDTH]
                  })}
               ],
               height: "100%",
               flexDirection: 'row',
               width: 2 * SCREEN_WIDTH,
               justifyContent: "flex-start",
            }}
         >
            {showMessageList(loading)}   
            {showMessageDisplay(rowViewModels, selectedRowViewModelIdx)}
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
      //height: '100%',
      alignItems: "center",
      justifyContent: "flex-start"
   },

   headline: {
      fontWeight: 'bold' ,
      fontSize: 40,
      width: '100%',
      height: 60,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      backgroundColor: 'whitesmoke'
   }
})

export default IterableInbox