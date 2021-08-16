'use strict';
import React, { Component, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import IterableInboxMessageList from './IterableInboxMessageList'
import IterableInboxEmptyState from './IterableInboxEmptyState'
import IterableInboxMessageDisplay from './IterableInboxMessageDisplay'
import sampleMessages from './sampleMessageData.js'
import Message from "./messageType"
import { Alert } from 'react-native';

const IterableInbox = () => {
   const inboxTitle = "Inbox"
   const [isDisplayMessage, setIsDisplayMessage] = useState(false)
   const [selectedMessageIdx, setSelectedMessageIdx] = useState(0)
   const [messages, setMessages] = useState(flagLastMessage(sampleMessages))

   let selectedMessage = messages[selectedMessageIdx]

   function flagLastMessage(messages : Message[]) {
      return messages.map((message : Message, index : number) => {
         return (index === messages.length - 1) ? 
            {...message, last: true} : {...message, last: false}
      })
   }

   function handleMessageSelect(index: number, messages: Message[]) {
      const newMessages = messages.map((message : Message, messageIndex : number) => {
         return (messageIndex === index) ?
            {...message, read: true } : message
      })

      setMessages(newMessages)
      setIsDisplayMessage(true)
      setSelectedMessageIdx(index)
   }

   function deleteMessage(id: number, messages: Message[]) {
      const newMessages = messages.filter((message : Message) => {
         return id !== message.meessageId
      })

      setMessages(newMessages)
   }

   function returnToInbox() {
      setIsDisplayMessage(false)
   }
   
   function showMessageDisplay(message: Message) {
      return (
         <IterableInboxMessageDisplay 
            message={message}
            returnToInbox={returnToInbox}
         ></IterableInboxMessageDisplay>)
   }

   function showMessageList() {
      return (
         <>
            <Text style={styles.headline}>
               {inboxTitle}
            </Text>
            {messages.length ? 
               <IterableInboxMessageList 
                  messages={messages}
                  deleteMessage = {(id: number) => deleteMessage(id, messages)}
                  handleMessageSelect={(index: number) => handleMessageSelect(index, messages)}
               ></IterableInboxMessageList> : 
               <IterableInboxEmptyState></IterableInboxEmptyState>}
         </>)
   }

   return(
      <View style={styles.container}>
         {isDisplayMessage ? showMessageDisplay(selectedMessage) : showMessageList()}
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      height: '100%',
      backgroundColor: 'whitesmoke', 
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginTop: 50
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