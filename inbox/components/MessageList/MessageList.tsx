'use strict'
import React, { ReactElement } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import MessageCell from '../MessageCell/MessageCell'

type MessageListProps = {
   messages: Array<any>  
}

export const flaggedMessage = (messages: Array<any>, message: { [key: string]: any }, index: number) => {
   return (index === messages.length - 1) ?
      <MessageCell key={index} message={message} last={true} /> :
      <MessageCell key={index} message={message} last={false} />
}

export const displayMessages = (messages: Array<any>) => {
   return messages.map((message, index) => {
      return flaggedMessage(messages, message, index)
   })
}

const MessageList = ({ messages }: MessageListProps) => {
   return(
      <ScrollView style={styles.container}>
         {displayMessages(messages)}
      </ScrollView>   
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // backgroundColor: '',
      // width: '100%'
   }
})

export default MessageList;