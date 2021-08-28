'use strict'

import React, { useState, useEffect, useCallback } from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'

import IterableInboxMessageList from './IterableInboxMessageList'
import IterableInboxEmptyState from './IterableInboxEmptyState'
import IterableInboxMessageDisplay from './IterableInboxMessageDisplay'

import InboxRowViewModel from './InboxRowViewModel'
import { IterableInAppDeleteSource } from './IterableInAppClasses'
import IterableInboxDataModel from './IterableInboxDataModel'
import Customization from './customizationType'

type inboxProps = {
   messageListItemLayout: Function,
   customizations: Customization
}

const IterableInbox = ({
   messageListItemLayout, 
   customizations
}: inboxProps) => {
   const defaultInboxTitle = "Inbox"
   const [isDisplayMessage, setIsDisplayMessage] = useState<boolean>(false)
   const [selectedMessageIdx, setSelectedMessageIdx] = useState<number>(0)
   const [rowViewModels, setRowViewModels] = useState<InboxRowViewModel[]>([])

   const inboxDataModel = new IterableInboxDataModel()

   const fetchData = async () => {
      let newRowViewModels = await inboxDataModel.refresh()

      newRowViewModels = newRowViewModels.map((rowViewModel, index) => {
         return {...rowViewModel, last: index === newRowViewModels.length - 1}
      })

      setRowViewModels(newRowViewModels)
   }

   useEffect(() => {
      fetchData()
   }, [])

   const selectedMessage = rowViewModels[selectedMessageIdx]

   function handleMessageSelect(id: string, index: number, rowViewModels: InboxRowViewModel[]) {
      let newRowViewModels = rowViewModels.map((rowViewModel) => {
         return (rowViewModel.inAppMessage.messageId === id) ?
            {...rowViewModel, read: true } : rowViewModel
      })
      setRowViewModels(newRowViewModels)
      inboxDataModel.setItemAsRead(index)

      setIsDisplayMessage(true)
      setSelectedMessageIdx(index)
   }

   const deleteMessage = async (id: string, index: number, rowViewModels: InboxRowViewModel[]) => {
      await inboxDataModel.deleteItemById(id, IterableInAppDeleteSource.inboxSwipe)
      fetchData()
   }

   function returnToInbox() {
      setIsDisplayMessage(false)
   }
   
   function showMessageDisplay(message: InboxRowViewModel) {
      return (
         <IterableInboxMessageDisplay
            message={message}
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
                  customizations={customizations}
                  messageListItemLayout={messageListItemLayout}
                  deleteMessage={(id: string, index: number) => deleteMessage(id, index, rowViewModels)}
                  handleMessageSelect={(id: string, index: number) => handleMessageSelect(id, index, rowViewModels)}
               />  : 
               <IterableInboxEmptyState customizations={customizations} />
            }
         </>)
   }

   return(
      <SafeAreaView style={styles.container}>    
         {isDisplayMessage ? 
            showMessageDisplay(selectedMessage) : 
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