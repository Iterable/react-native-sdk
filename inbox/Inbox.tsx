'use strict'
import React, { Component, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MessageList from './components/MessageList/MessageList'
import EmptyState from './components/EmptyState/EmptyState'
import sampleMessages from './sampleMessageData.js' 

const Inbox = () => {
   const message = "Inbox";
   const [messages, setMessages] = useState(sampleMessages);

   function showMessageList() {
      return messages.length ? <MessageList messages={messages}></MessageList> : <EmptyState></EmptyState>
   }

   return(
      <View style={styles.container}>
         <Text style={styles.headline}>
            {message}
         </Text>
         {showMessageList()}
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