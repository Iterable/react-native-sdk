"use strict"
import React, { Component } from "react"
import { 
   View, 
   Text, 
   StyleSheet, 
   Pressable 
} from "react-native"

type MessageCellProps = {
   message: {[key: string]: any},
   last: boolean 
}

const IterableInboxMessageCell = ({ message, last }: MessageCellProps) => {
   const unreadIndicator = "\u2022";
   const messageTitle = message.inboxMetadata.title
   const messageBody = message.inboxMetadata.subtitle
   const messageCreatedAt = message.createdAt

   function displayUnreadMessage() {
      return (
         <Pressable
            style={({ pressed }) => [
               (pressed) ? styles.pressedMessageCell : styles.messageCell
            ]}
         > 
            <View style={styles.unreadIndicatorContainer}>
               <View style={styles.unreadIndicator}/>
            </View>
            <View style={styles.unreadMessageContainer}>
               <Text style={styles.title}>{messageTitle}</Text>
               <Text style={styles.body}>{messageBody}</Text>
               <Text style={styles.timestamp}>{messageCreatedAt}</Text>
            </View>      
         </Pressable>)    
   }

   function displayReadMessage() {
      return (
         <View style={styles.messageCell}>
            <View style={styles.readMessageContainer}>
               <Text style={styles.title}>{messageTitle}</Text>
               <Text style={styles.body}>{messageBody}</Text>
               <Text style={styles.timestamp}>{messageCreatedAt}</Text>
            </View>   
         </View>)    
   }

   function displayUnreadLastMessage() {
      return (
         <View style={styles.lastMessageCell}>
            <View style={styles.unreadIndicatorContainer}>
                  <View style={styles.unreadIndicator}/>
            </View>
            <View style={styles.unreadMessageContainer}>
               <Text style={styles.title}>{messageTitle}</Text>
               <Text style={styles.body}>{messageBody}</Text>
               <Text style={styles.timestamp}>{messageCreatedAt}</Text>
            </View>    
         </View>)    
   }

   function displayReadLastMessage() {
      return (
         <View style={styles.lastMessageCell}>
            <View style={styles.readMessageContainer}>
               <Text style={styles.title}>{messageTitle}</Text>
               <Text style={styles.body}>{messageBody}</Text>
               <Text style={styles.timestamp}>{messageCreatedAt}</Text>
            </View>     
         </View>)    
   }

   return(
      <View>
         {last ? 
            (message.read ? displayReadLastMessage() : displayUnreadLastMessage()) :
            (message.read ? displayReadMessage() : displayUnreadMessage())}
      </View>   
   )
}

const styles = StyleSheet.create({
   unreadIndicatorContainer: {
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start'
   },

   unreadIndicator: {
      width: 15,
      height: 15,
      borderRadius: 15 / 2,
      backgroundColor: 'blue',
      marginLeft: 10,
      marginRight: 5,
      marginTop: 7
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

   pressedMessageCell: {
      flexDirection: 'row',
      backgroundColor: 'whitesmoke',
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

   pressedLastMessageCell: {
      flexDirection: 'row',
      backgroundColor: 'whitesmoke',
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

export default IterableInboxMessageCell;