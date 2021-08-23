'use strict'

import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'

import IterableInboxMessageList from './IterableInboxMessageList'
import IterableInboxEmptyState from './IterableInboxEmptyState'
import IterableInboxMessageDisplay from './IterableInboxMessageDisplay'

import InboxRowViewModel from './InboxRowViewModel'
//import { IterableInboxDataModel } from './IterableInboxDataModel'
import IterableInAppMessage from './IterableInAppMessage'
import IterableInAppManager from './IterableInAppManager'
import Customization from './customizationType'
//import Message from './messageType'

type inboxProps = {
   customization: Customization
}

const IterableInbox = ({ 
   customization
}: inboxProps) => {
   const defaultInboxTitle = "Inbox"
   const [isDisplayMessage, setIsDisplayMessage] = useState<boolean>(false)
   const [selectedMessageId, setSelectedMessageId] = useState<string>("")
   const [messages, setMessages] = useState<IterableInAppMessage[]>([])

   const inAppManager = new IterableInAppManager()

   useEffect(() => {
      inAppManager.getInboxMessages().then(response => setMessages(response))
   }, [])

   const selectedMessage = messages.find(message => message.messageId === selectedMessageId)

   function handleMessageSelect(id: string, messages: IterableInAppMessage[]) {
      let newMessages = messages.map((message) => {
         return (message.messageId == id) ?
            {...message, read: true } : message
      })
      setMessages(newMessages)
      setIsDisplayMessage(true)
      setSelectedMessageId(id)
   }

   // function deleteMessage(id: string, messages: IterableInAppMessage[]) {
   //    let newMessages = messages.filter((message) => {
   //       return message.messageId !== id
   //    })
   //    //newMessages[newMessages.length - 1] = {...newMessages[newMessages.length - 1], last: true}
   //    setMessages(newMessages)
   //    //inAppManager.removeMessage(message.messageId)
   // }

   function returnToInbox() {
      setIsDisplayMessage(false)
   }
   
   function showMessageDisplay(message: IterableInAppMessage) {
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
               {customization.navTitle ? customization.navTitle : defaultInboxTitle}
            </Text>
            { messages.length ?
               <IterableInboxMessageList 
                  messages={messages}
                  customization={customization}
                  // deleteMessage={(id: string) => deleteMessage(id, messages)}
                  handleMessageSelect={(id: string) => handleMessageSelect(id, messages)}
               />  : 
               <IterableInboxEmptyState customization={customization} />
         </>)
   }

   return(
      <SafeAreaView style={styles.container}>     
         {isDisplayMessage ? showMessageDisplay(selectedMessage) : showMessageList()}
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