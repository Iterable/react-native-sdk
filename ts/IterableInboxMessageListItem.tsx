'use strict'

import React from 'react'
import {
   View,
   Text,
   Image,
   ViewStyle,
   TextStyle,
   StyleSheet
} from 'react-native'

import { InboxRowViewModel, IterableInboxCustomizations, IterableInboxDataModel } from '.'

type MessageListItemProps = {
   last: boolean,
   dataModel: IterableInboxDataModel,
   rowViewModel: InboxRowViewModel,
   customizations: IterableInboxCustomizations,
   messageListItemLayout: Function,
   isPortrait: boolean
}

const defaultMessageListLayout = (
   last: boolean,
   dataModel: IterableInboxDataModel,
   rowViewModel: InboxRowViewModel,
   customizations: IterableInboxCustomizations,
   isPortrait: boolean
) => {
   const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title ?? ""
   const messageBody = rowViewModel.inAppMessage.inboxMetadata?.subtitle ?? ""
   const messageCreatedAt = dataModel.getFormattedDate(rowViewModel.inAppMessage) ?? ""
   const iconURL = rowViewModel.imageUrl

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
         marginTop: 10
      },

      unreadMessageIconContainer: {
         paddingLeft: 10,
         flexDirection: 'column',
         justifyContent: 'center'
      },

      readMessageIconContainer: {
         paddingLeft: 30,
         flexDirection: 'column',
         justifyContent: 'center'
      },

      messageContainer: {
         paddingLeft: 10,
         width: '75%',
         flexDirection: 'column',
         justifyContent: 'center'
      },

      title: {
         fontSize: 22,
         paddingBottom: 10
      },

      body: {
         fontSize: 15,
         color: 'lightgray',
         width: '85%',
         flexWrap: "wrap",
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
         height: 120,
         borderStyle: 'solid',
         borderColor: 'lightgray',
         borderTopWidth: 1
      }
   })

   const resolvedStyles = { ...styles, ...customizations }

   let {
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

   unreadIndicator = (!isPortrait) ? { ...unreadIndicator, marginLeft: 40 } : unreadIndicator
   readMessageIconContainer = (!isPortrait) ? { ...readMessageIconContainer, paddingLeft: 65 } : readMessageIconContainer
   messageContainer = (!isPortrait) ? { ...messageContainer, width: '90%' } : messageContainer

   function messageRowStyle(rowViewModel: InboxRowViewModel) {
      return last ? { ...messageRow, borderBottomWidth: 1 } : messageRow
   }

   return (
      <View style={messageRowStyle(rowViewModel) as ViewStyle} >
         <View style={unreadIndicatorContainer as ViewStyle}>
            {rowViewModel.read ? null : <View style={unreadIndicator} />}
         </View>
         <View style={(rowViewModel.read ? readMessageIconContainer : unreadMessageIconContainer) as ViewStyle}>
            {iconURL ? <Image style={{ height: 80, width: 80 }} source={{ uri: iconURL }} /> : null}
         </View>
         <View style={messageContainer as ViewStyle}>
            <Text style={title}>{messageTitle as TextStyle}</Text>
            <Text numberOfLines={2} ellipsizeMode='tail' style={body as TextStyle}>{messageBody}</Text>
            <Text style={createdAt}>{messageCreatedAt as TextStyle}</Text>
         </View>
      </View>
   )
}

const IterableInboxMessageListItem = ({
   last,
   dataModel,
   rowViewModel,
   customizations,
   messageListItemLayout,
   isPortrait
}: MessageListItemProps) => {
   return (
      messageListItemLayout(last, rowViewModel) ? messageListItemLayout(last, rowViewModel) : defaultMessageListLayout(last, dataModel, rowViewModel, customizations, isPortrait)
   )
}

export default IterableInboxMessageListItem