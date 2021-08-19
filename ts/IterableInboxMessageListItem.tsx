'use strict'

import React from 'react'
import {
   View,
   Text,
   StyleSheet
} from 'react-native'

import Message from './messageType'

type MessageListItemProps = {
   message: Message,
   customization: {[key: string]: any}
}

const IterableInboxMessageListItem = ({ message, customization }: MessageListItemProps) => {
   const messageTitle = message.inboxMetadata.title
   const messageBody = message.inboxMetadata.subtitle
   const messageCreatedAt = message.createdAt

   const {
      unreadIndicator,
      unreadIndicatorContainer,
      title,
      body,
      createdAt,
      lastMessageRow,
      messageRow,
      readMessageContainer,
      unreadMessageContainer
   } = styles
   
   function updateStyle(element: string, elementStyling: {[key: string]: any}, customization: {[key: string]: any}) {
      return customization[element] ?
         {...elementStyling, ...customization[element]} :
         elementStyling
   }

   const unreadIndicatorContainerStyle = updateStyle('unreadIndicatorContainer', unreadIndicatorContainer, customization)
   const unreadIndicatorStyle = updateStyle('unreadIndicator', unreadIndicator, customization)
   const titleStyle = updateStyle('title', title, customization)
   const bodyStyle = updateStyle('body', body, customization)
   const createdAtStyle = updateStyle('createdAt', createdAt, customization)
   const lastMessageRowStyle = updateStyle('lastMessageRow', lastMessageRow, customization)
   const messageRowStyle = updateStyle('messageRow', messageRow, customization)

   return(
      <View style={message.last ? lastMessageRowStyle : messageRowStyle }>
         <View style={unreadIndicatorContainerStyle}>
            {message.read ? null : <View style={unreadIndicatorStyle}/>}
         </View>
         <View style={message.read ? readMessageContainer : unreadMessageContainer}>
            <Text style={titleStyle}>{messageTitle}</Text>
            <Text style={bodyStyle}>{messageBody}</Text>
            <Text style={createdAtStyle}>{messageCreatedAt}</Text>
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
      borderColor: 'lightgray',
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
      borderColor: 'lightgray',
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