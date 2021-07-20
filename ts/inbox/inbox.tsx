'use strict'
import React, { Component, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { IterableInAppManager } from '../IterableInAppClasses'
import MessageList from '@iterable/react-native-sdk/js/Inbox/components/MessageList/MessageList' 

function Inbox() {
   const messages = IterableInAppManager.getMessages();

   return(
      <View style={styles.container}>
         <Text style={styles.headline}>
            {message}
         </Text>
         <MessageList></MessageList>   
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