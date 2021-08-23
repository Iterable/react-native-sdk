'use strict'

import React from 'react'
import {
   View,
   Text,
   StyleSheet
} from 'react-native'

import InboxRowViewModel from './InboxRowViewModel'
import Customization from './customizationType'

type MessageListItemProps = {
   message: InboxRowViewModel,
   customization: Customization
}

const IterableInboxMessageListItem = ({ message, customization }: MessageListItemProps) => {
   const messageTitle = message.inAppMessage.inboxMetadata.title
   const messageBody = message.inAppMessage.inboxMetadata.subtitle
   const messageCreatedAt = convertTS(message.createdAt)

   styles = {...styles, ...customization}

   function convertTS(ts: number) {
      let t = new Date(ts)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let year = t.getFullYear()
      let month = months[t.getMonth()]
      let day = t.getDate()
      let hour = t.getHours()
      let minute = t.getMinutes()
      let AMPM = "AM"

      if(hour === 12) {
         AMPM = "PM"
      }

      if(hour === 24) {
         hour -= 12
      }
      
      if(hour > 12 && hour < 24) {
         hour -= 12
         AMPM = "PM"
      }

      if(minute < 10) {
         return `${month} ${day}, ${year} at ${hour}:0${minute} ${AMPM}`
      }
      return `${month} ${day}, ${year} at ${hour}:${minute} ${AMPM}`
   }

   // function messageRowStyle(message: InboxRowViewModel) {
   //    return message.last ? {...messageRow, borderBottomWidth: 1} : messageRow 
   // } 

   const {
      unreadIndicatorContainer,
      unreadIndicator,
      unreadMessageContainer,
      readMessageContainer,
      title,
      body,
      createdAt,
      messageRow
   } = styles

   return(
      <View style={messageRow}>
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

let styles = StyleSheet.create({
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
   }
})

export default IterableInboxMessageListItem