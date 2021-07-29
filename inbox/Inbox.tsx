'use strict'
import React, { Component, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MessageList from './components/MessageList/MessageList'
import EmptyState from './components/EmptyState/EmptyState'
import MessageDisplay from './components/MessageDisplay/MessageDisplay'
import sampleMessages from './sampleMessageData.js' 

const Inbox = () => {
   const inboxTitle = "Inbox";
   const [isDisplayMessage, setIsDisplayMessage] = useState(false);
   const [selectedMessageIdx, setSelectedMessageIdx] = useState(0);
   const [messages, setMessages] = useState(sampleMessages);

   function handleMessageSelect(index) {
      let updatedMessages = messages;
      let updatedMessage = messages[index];

      if(!updatedMessage.read) {
         updatedMessage.read = true
      }
      
      updatedMessages[index] = updatedMessage;
      setMessages([...updatedMessages]);
      setIsDisplayMessage(true);
      setSelectedMessageIdx(index);
   }

   function displayMessage() {
      return <MessageDisplay></MessageDisplay>
   }   

   function showMessageList() {
      return (
         <> 
            <Text style={styles.headline}>
               {inboxTitle}
            </Text>  
            {messages.length ? 
            <MessageList 
               messages={messages}
               handleMessageSelect={handleMessageSelect}
            ></MessageList> : 
            <EmptyState></EmptyState>}
         </>)
   }

   return(
      <View style={styles.container}>
         {isDisplayMessage ? displayMessage() : showMessageList()}
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

export default Inbox;