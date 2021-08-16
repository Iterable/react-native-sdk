'use strict'

import React from 'react'
import {
   View,
   Text,
   StyleSheet
} from 'react-native'
import Message from './messageType'

type MessageListItemProps = {
   index: number,
   message: Message,
   last: boolean 
}

const IterableInboxMessageListItem = ({ index, message, last }: MessageListItemProps) => {
   const unreadIndicator = "\u2022"
   const messageTitle = message.inboxMetadata.title
   const messageBody = message.inboxMetadata.subtitle
   const messageCreatedAt = message.createdAt
   
   return(
      <>
         <View style={styles.unreadIndicatorContainer}>
            {message.read ? null : <View style={styles.unreadIndicator}/>}
         </View>
         <View style={message.read ? styles.readMessageContainer : styles.unreadMessageContainer}>
            <Text style={styles.title}>{messageTitle}</Text>
            <Text style={styles.body}>{messageBody}</Text>
            <Text style={styles.createdAt}>{messageCreatedAt}</Text>
         </View>
      </>  
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

   createdAt: {
      fontSize: 12,
      color: 'lightgray'
   }
})

export default IterableInboxMessageListItem