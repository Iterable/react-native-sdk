"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"

function MessageCell(props) {
   const unreadIndicator = "\u2022" 
   const messageTitle = "CATS FOR SALE!! LIMITED TIME!!"
   const messageBody = "All this week!!"
   const messageTS = "Jul 13, 2021 at 3:33 PM"

   return(
      <View style={[(props.lastMessage) ? styles.lastMessageCell : styles.messageCell]}>
         <View style={styles.unreadIndicatorContainer}>
            <Text style={styles.unreadIndicator}>{unreadIndicator}</Text>
         </View>
         <View style={styles.messageContainer}>
            <Text style={styles.title}>{messageTitle}</Text>
            <Text style={styles.body}>{messageBody}</Text>
            <Text style={styles.timestamp}>{messageTS}</Text>
         </View>      
      </View>    
   )
}

const styles = StyleSheet.create({
   unreadIndicatorContainer: {
      height: '100%',
      flexDirection: 'column',
      //marginTop: 0,
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
      width: '100%',
      borderStyle: 'solid',
      borderTopColor: 'lightgray',
      borderBottomColor: 'lightgray',
      borderWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1
   },

   messageContainer: {
      paddingLeft: 5
   },

   title: {
      //fontWeight: 'bold',
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