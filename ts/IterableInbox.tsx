'use strict';
import React, { Component, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import IterableInboxMessageList from './IterableInboxMessageList';
import IterableInboxEmptyState from './IterableInboxEmptyState';
import IterableInboxMessageDisplay from './IterableInboxMessageDisplay';
import sampleMessages from './sampleMessageData.js';

const IterableInbox = () => {
   const inboxTitle = "Inbox";
   const [isDisplayMessage, setIsDisplayMessage] = useState(false);
   const [selectedMessageIdx, setSelectedMessageIdx] = useState(0);
   const [messages, setMessages] = useState(sampleMessages);

   let selectedMessage = messages[selectedMessageIdx];

   function handleMessageSelect(index: number, messages: Array<any>) {
      if(!messages[index].read) {
         messages[index].read = true
      }
      setMessages([...messages]);
      setIsDisplayMessage(true);
      setSelectedMessageIdx(index);
   }

   function returnToInbox() {
      setIsDisplayMessage(false);
   }
   
   function displayMessage(message: {[key: string]: any}) {
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
                  handleMessageSelect={(index: number) => handleMessageSelect(index, messages)}
               ></IterableInboxMessageList> : 
               <IterableInboxEmptyState></IterableInboxEmptyState>}
         </>)
   }

   return(
      <View style={styles.container}>
         {isDisplayMessage ? displayMessage(selectedMessage) : showMessageList()}
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

export default IterableInbox;