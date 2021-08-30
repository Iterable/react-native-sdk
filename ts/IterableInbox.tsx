'use strict'

import React, { useState, useEffect } from 'react'
import {
   View, 
   Text, 
   SafeAreaView, 
   StyleSheet,
   Animated,
   Dimensions
} from 'react-native'

import {
   IterableInboxMessageList,
   IterableInboxEmptyState,
   IterableInboxMessageDisplay,
   InboxRowViewModel,
   IterableInboxDataModel,
   IterableInboxCustomizations,
   IterableInAppDeleteSource,
} from '.'

const SCREEN_WIDTH = Dimensions.get('window').width

type inboxProps = {
   messageListItemLayout: Function,
   customizations: IterableInboxCustomizations
}

const IterableInbox = ({
   messageListItemLayout, 
   customizations
}: inboxProps) => {
   const defaultInboxTitle = "Inbox"
   const [selectedRowViewModelIdx, setSelectedRowViewModelIdx] = useState<number>(0)
   const [rowViewModels, setRowViewModels] = useState<InboxRowViewModel[]>([])
   const inboxDataModel = new IterableInboxDataModel()

   const [animatedValue, setAnimatedValue] = useState<any>(new Animated.Value(0))

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

   function showMessageList() {
      return (
         <View style={styles.messageListContainer}>
            <Text style={styles.headline}>
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
               <IterableInboxEmptyState customizations={customizations} />
            }
         </View>)
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
      <SafeAreaView style={styles.container}>
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
            {showMessageList()}   
            {showMessageDisplay(rowViewModels, selectedRowViewModelIdx)}
         </Animated.View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: 2 * SCREEN_WIDTH,
      flexDirection: 'row',
      height: '100%',
      alignItems: "center",
      justifyContent: "flex-start"
   },

   messageListContainer: {
      width: SCREEN_WIDTH
   },

   headline: {
      fontWeight: 'bold' ,
      fontSize: 40,
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      backgroundColor: 'whitesmoke'
   }
})

export default IterableInbox