'use strict'

import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'

import IterableInboxMessageList from './IterableInboxMessageList'
import IterableInboxEmptyState from './IterableInboxEmptyState'
import IterableInboxMessageDisplay from './IterableInboxMessageDisplay'

import InboxRowViewModel from './InboxRowViewModel'
import IterableInboxDataModel from './IterableInboxDataModel'
import Customization from './customizationType'

type inboxProps = {
   customization: Customization
}

const IterableInbox = ({ 
   customization
}: inboxProps) => {
   const defaultInboxTitle = "Inbox"
   const [isDisplayMessage, setIsDisplayMessage] = useState<boolean>(false)
   const [selectedMessageIdx, setSelectedMessageIdx] = useState<number>(0)
   const [messages, setMessages] = useState<InboxRowViewModel[]>([])
   const inboxDataModel = new IterableInboxDataModel()

   const fetchData = async () => {
      let newMessages = await inboxDataModel.refresh()
      newMessages = newMessages.map((message, index) => {
         if(index === newMessages.length - 1) {
            return {...message, last: true}
         } else {
            return {...message, last: false}
         }   
      })
      setMessages(newMessages)
   }

   const fetchHTML = async (index: number) => {
      return await inboxDataModel.getHtmlContentForItem(index)
   }

   useEffect(() => {
      fetchData()
   }, [])

   const selectedMessage = messages[selectedMessageIdx]

   function handleMessageSelect(id: string, index: number, messages: InboxRowViewModel[]) {
      let newMessages = messages.map((message) => {
         return (message.inAppMessage.messageId === id) ?
            {...message, read: true } : message
      })
      setMessages(newMessages)
      inboxDataModel.setItemAsRead(index)

      setIsDisplayMessage(true)
      setSelectedMessageIdx(index)
   }

   // function deleteMessage(id: string, index: number, messages: InboxRowViewModel[]) {
   //    let newMessages = messages.filter((message) => {
   //       return message.inAppMessage.messageId !== id
   //    })
   //    //inboxDataModel.deleteItem(index, inboxSwipe)
   //    //newMessages[newMessages.length - 1] = {...newMessages[newMessages.length - 1], last: true}
   //    setMessages(newMessages)
   // }

   function returnToInbox() {
      setIsDisplayMessage(false)
   }
   
   function showMessageDisplay(message: InboxRowViewModel, index: number) {
      return (
         <IterableInboxMessageDisplay
            index={index}
            message={message}
            html={fetchHTML(index)}
            returnToInbox={() => returnToInbox()}
         ></IterableInboxMessageDisplay>)
   }

   function showMessageList() {
      return (
         <>
            <Text style={styles.headline}>
               {customization.navTitle ? customization.navTitle : defaultInboxTitle}
            </Text>
            { messages.length ?
               <IterableInboxMessageList 
                  messages={messages}
                  customization={customization}
                  //deleteMessage={(id: string) => deleteMessage(id, messages)}
                  handleMessageSelect={(id: string, index: number) => handleMessageSelect(id, index, messages)}
               />  : 
               <IterableInboxEmptyState customization={customization} />
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