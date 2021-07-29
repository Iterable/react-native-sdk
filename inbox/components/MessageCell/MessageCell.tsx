"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"

type MessageCellProps = {
   message: {[key: string]: any},
   last: boolean 
}

const MessageCell = ({ message, last }: MessageCellProps) => {
   const unreadIndicator = "\u2022";
   const messageTitle = message.inboxMetaData.title
   const messageBody = message.inboxMetaData.subTitle
   const messageTS = message.createdAt

   function displayUnreadMessage() {
      return ( 
         <View style={last ? styles.lastMessageCell : styles.messageCell}>
            <View style={styles.unreadIndicatorContainer}>
               <Text style={styles.unreadIndicator}>{unreadIndicator}</Text>
            </View>
            <View style={styles.unreadMessageContainer}>
               <Text style={styles.title}>{messageTitle}</Text>
               <Text style={styles.body}>{messageBody}</Text>
               <Text style={styles.timestamp}>{messageTS}</Text>
            </View>      
         </View>)    
   }

   function displayReadMessage() {
      return ( 
         <View style={last ? styles.lastMessageCell : styles.messageCell}>
            <View style={styles.readMessageContainer}>
               <Text style={styles.title}>{messageTitle}</Text>
               <Text style={styles.body}>{messageBody}</Text>
               <Text style={styles.timestamp}>{messageTS}</Text>
            </View>      
         </View>)    
   }

   return(
      message.read ?
         displayReadMessage() :
         displayUnreadMessage()
   )
}

const styles = StyleSheet.create({
   unreadIndicatorContainer: {
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start'
   },

   unreadIndicator: {
      fontSize: 60,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      color: 'blue'
   },

   messageCell: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      width: '100%',
      borderStyle: 'solid',
      borderTopColor: 'lightgray',
      borderBottomColor: 'lightgray',
      borderWidth: 0,
      borderTopWidth: 1
   },

   lastMessageCell: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: 70,
      width: '100%',
      borderStyle: 'solid',
      borderTopColor: 'lightgray',
      borderBottomColor: 'lightgray',
      borderWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1
   },

   unreadMessageContainer: {
      paddingLeft: 5
   },

   readMessageContainer: {
      paddingLeft: 30
   },

   title: {
      fontSize: 22,
      paddingBottom: 10
   },

   body: {
      fontSize: 15,
      color: 'lightgray',
      paddingBottom: 10
   },

   timestamp: {
      fontSize: 12,
      color: 'lightgray'
   }
})

export default MessageCell;