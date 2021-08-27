'use strict'

import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'

import {
   IterableInboxMessageList,
   IterableInboxEmptyState,
   IterableInboxMessageDisplay,
   InboxRowViewModel,
   IterableInboxDataModel,
   IterableInboxCustomizations,
   IterableEdgeInsets,
   IterableHtmlInAppContent
} from '.'

type inboxProps = {
   messageListItemLayout: Function,
   customizations: IterableInboxCustomizations
}

const IterableInbox = ({ messageListItemLayout, customizations}: inboxProps) => {
   const defaultInboxTitle = "Inbox"
   const [isDisplayMessage, setIsDisplayMessage] = useState<boolean>(false)
   const [selectedMessageIdx, setSelectedMessageIdx] = useState<number>(0)
   const [rowViewModels, setRowViewModels] = useState<InboxRowViewModel[]>([])
   const selectedMessage = rowViewModels[selectedMessageIdx]
   const inboxDataModel = new IterableInboxDataModel()

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

   function getHtmlContentForRow(row: number) {
      return inboxDataModel.getHtmlContentForItem(row)
   }

   function test(id: string) {
      return inboxDataModel.getHtmlContentForMessageId(id)
   }

   function handleMessageSelect(id: string, index: number, messages: InboxRowViewModel[]) {
      let newMessages = messages.map((message) => {
         return (message.inAppMessage.messageId === id) ?
            {...message, read: true } : message
      })
      setRowViewModels(newMessages)
      inboxDataModel.setItemAsRead(index)

      setIsDisplayMessage(true)
      setSelectedMessageIdx(index)
   }

   // function deleteMessage(id: string, index: number, messages: InboxRowViewModel[]) {
   //    let newMessages = messages.filter((message) => {
   //       return message.inAppMessage.messageId !== id
   //    })
   //    inboxDataModel.deleteItem(index, inboxSwipe)
   //    //newMessages[newMessages.length - 1] = {...newMessages[newMessages.length - 1], last: true}
   //    setMessages(newMessages)
   // }

   function returnToInbox() {
      setIsDisplayMessage(false)
   }
   
   function showMessageDisplay(rowViewModel: InboxRowViewModel, index: number) {
      return (
         <IterableInboxMessageDisplay
            index={index}
            rowViewModel={rowViewModel}
            inAppContentPromise={test(rowViewModel.inAppMessage.messageId)}
            returnToInbox={() => returnToInbox()}
         ></IterableInboxMessageDisplay>)
   }

   function showMessageList() {
      return (
         <>
            <Text style={styles.headline}>
               {customizations.navTitle ? customizations.navTitle : defaultInboxTitle}
            </Text>
            { rowViewModels.length ?
               <IterableInboxMessageList 
                  rowViewModels={rowViewModels}
                  messageListItemLayout={messageListItemLayout}
                  customizations={customizations}
                  //deleteMessage={(id: string) => deleteMessage(id, messages)}
                  handleMessageSelect={(id: string, index: number) => handleMessageSelect(id, index, rowViewModels)}
               />  : 
               <IterableInboxEmptyState customizations={customizations} />
            }
         </>)
   }

   return(
      <SafeAreaView style={styles.container}>    
         {isDisplayMessage ? 
            showMessageDisplay(selectedMessage, selectedMessageIdx) : 
            showMessageList()}
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      height: '100%'
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