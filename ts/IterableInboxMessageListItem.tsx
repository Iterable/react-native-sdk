'use strict'

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { InboxRowViewModel, IterableInboxCustomizations } from '.'

type MessageListItemProps = {
   last: boolean,
   rowViewModel: InboxRowViewModel,
   messageListItemLayout: Function,
   customizations: IterableInboxCustomizations,
   orientation: string
}

const defaultMessageListLayout = (
   last: boolean, 
   rowViewModel: InboxRowViewModel, 
   customizations: IterableInboxCustomizations,
   orientation: string
) => {
   const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title ?? ""
   const messageBody = rowViewModel.inAppMessage.inboxMetadata?.subtitle ?? ""
   const messageCreatedAt = rowViewModel.createdAt

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

   const resolvedStyles = {...styles, ...customizations}

   let {
      unreadIndicatorContainer,
      unreadIndicator,
      unreadMessageContainer,
      readMessageContainer,
      title,
      body,
      createdAt,
      messageRow
   } = resolvedStyles

   unreadIndicator = (orientation === 'LANDSCAPE') ? {...unreadIndicator, marginLeft: 40} : unreadIndicator
   readMessageContainer = (orientation === 'LANDSCAPE') ? {...readMessageContainer, paddingLeft: 65} : readMessageContainer 

   function messageRowStyle(rowViewModel: InboxRowViewModel) {
      return last ? {...messageRow, borderBottomWidth: 1} : messageRow 
   } 
   
   return(
      <View style={messageRowStyle(rowViewModel)}>
         <View style={unreadIndicatorContainer}>
            {rowViewModel.read ? null : <View style={unreadIndicator}/>}
         </View>
         <View style={rowViewModel.read ? readMessageContainer : unreadMessageContainer}>
            <Text style={title}>{messageTitle}</Text>
            <Text style={body}>{messageBody}</Text>
            <Text style={createdAt}>{messageCreatedAt}</Text>
         </View>
      </View>
   )
}

const IterableInboxMessageListItem = ({ 
   last, 
   rowViewModel, 
   messageListItemLayout, 
   customizations,
   orientation 
}: MessageListItemProps) => {

   return(
      messageListItemLayout(last, rowViewModel) ?
         messageListItemLayout(last, rowViewModel) :
         defaultMessageListLayout(last, rowViewModel, customizations, orientation)  
   )
}

export default IterableInboxMessageListItem