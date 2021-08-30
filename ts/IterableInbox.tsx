'use strict'

import React, { useState, useEffect } from 'react'
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
      setRowViewModels(newRowViewModels)
   }

   useEffect(() => {
      fetchData()
   }, [])

   const selectedMessage = rowViewModels[selectedMessageIdx]

   const handleMessageSelect = (
      messageId: string, 
      index: number, 
      rowViewModels: InboxRowViewModel[]
   ) => {
      let newRowViewModels = rowViewModels.map((rowViewModel) => {
         return (rowViewModel.inAppMessage.messageId === messageId) ?
            {...rowViewModel, read: true } : rowViewModel
      })
      setRowViewModels(newRowViewModels)
      inboxDataModel.setItemAsRead(index)

      setIsDisplayMessage(true)
      setSelectedMessageIdx(index)
   }

   const deleteRow = (messageId: string) => {
      inboxDataModel.deleteItemById(messageId, IterableInAppDeleteSource.inboxSwipe)
      fetchData()
   }

   function returnToInbox() {
      setIsDisplayMessage(false)
   }
   
   function showMessageDisplay(rowViewModel: InboxRowViewModel) {
      return (
         <IterableInboxMessageDisplay
            rowViewModel={rowViewModel}
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
                  deleteRow={(messageId: string) => deleteRow(messageId)}
                  handleMessageSelect={(messageId: string, index: number) => handleMessageSelect(messageId, index, rowViewModels)}
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