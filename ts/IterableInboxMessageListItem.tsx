'use strict'

import React from 'react'
import {
   View,
   Text,
   Image,
   StyleSheet
} from 'react-native'

import { InboxRowViewModel, IterableInboxCustomizations } from '.'

type MessageListItemProps = {
   last: boolean,
   rowViewModel: InboxRowViewModel,
   messageListItemLayout: Function,
   customizations: IterableInboxCustomizations
}

const defaultMessageListLayout = (
   last: boolean,
   rowViewModel: InboxRowViewModel, 
   customizations: IterableInboxCustomizations
) => {
   const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title ?? ""
   const messageBody = rowViewModel.inAppMessage.inboxMetadata?.subtitle ?? ""
   const messageCreatedAt = rowViewModel.createdAt
   const iconURL = rowViewModel.imageUrl

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

      unreadMessageIconContainer: {
         paddingLeft: 10
      },

      readMessageIconContainer: {
         paddingLeft: 30
      },
   
      messageContainer: {
         paddingLeft: 10
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

   const resolvedStyles = {...styles, ...customizations}

   const {
      unreadIndicatorContainer,
      unreadIndicator,
      unreadMessageIconContainer,
      readMessageIconContainer,
      messageContainer,
      title,
      body,
      createdAt,
      messageRow
   } = resolvedStyles

   function messageRowStyle(rowViewModel: InboxRowViewModel) {
      return last ? {...messageRow, borderBottomWidth: 1} : messageRow 
   }
      
   return(
      <View style={messageRowStyle(rowViewModel)}>
         <View style={unreadIndicatorContainer}>
            {rowViewModel.read ? null : <View style={unreadIndicator}/>}
         </View>
         <View style={rowViewModel.read ? readMessageIconContainer : unreadMessageIconContainer}>
            <Image style={{height: 80, width: 80}} source={{uri: iconURL}}/>
         </View>
         <View style={messageContainer}>
            <Text style={title}>{messageTitle}</Text>
            <Text style={body}>{messageBody}</Text>
            <Text style={createdAt}>{messageCreatedAt}</Text>
         </View>
      </View>
   )
}

const IterableInboxMessageListItem = ({ last, rowViewModel, messageListItemLayout, customizations }: MessageListItemProps) => {
   return (
      messageListItemLayout(last, rowViewModel) ?
         messageListItemLayout(last, rowViewModel) :
         defaultMessageListLayout(last, rowViewModel, customizations)  
   )
}

export default IterableInboxMessageListItem