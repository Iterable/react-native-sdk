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
}

const IterableInboxMessageListItem = ({ index, message }: MessageListItemProps) => {
   const messageTitle = message.inboxMetadata.title
   const messageBody = message.inboxMetadata.subtitle
   const messageCreatedAt = message.createdAt

   const {
      unreadIndicatorContainer, 
      unreadIndicator, 
      readMessageContainer, 
      unreadMessageContainer,
      title,
      body,
      createdAt,
      messageRow,
      lastMessageRow
   } = styles
   
   return(
      <View style={message.last ? lastMessageRow : messageRow }>
         <View style={unreadIndicatorContainer}>
            {message.read ? null : <View style={unreadIndicator}/>}
         </View>
         <View style={message.read ? readMessageContainer : unreadMessageContainer}>
            <Text style={title}>{messageTitle}</Text>
            <Text style={body}>{messageBody}</Text>
            <Text style={createdAt}>{messageCreatedAt}</Text>
         </View>
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
   },

   messageRow: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      width: '100%',
      height: 100,
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
      height: 100,
      borderStyle: 'solid',
      borderTopColor: 'lightgray',
      borderBottomColor: 'lightgray',
      borderWidth: 0,
      borderTopWidth: 1
   },

   lastMessageRow: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      width: '100%',
      height: 100,
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
      width: '100%',
      height: 100,
      borderStyle: 'solid',
      borderTopColor: 'lightgray',
      borderBottomColor: 'lightgray',
      borderWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1
   }
})

export default IterableInboxMessageListItem