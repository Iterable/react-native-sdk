'use strict'
import React, { ReactElement } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import MessageCell from '../MessageCell/MessageCell'

type MessageListProps = {
   messages: Array<any>  
}

const MessageList = ({ messages }: MessageListProps) => {
   function flaggedMessage(message: { [key: string]: any }, index: number) {
      return (index === messages.length - 1) ?
         <MessageCell key={index} message={message} last={true} /> :
         <MessageCell key={index} message={message} last={false} />
   }

   function displayMessages() {
      return messages.map((message, index) => {
         return flaggedMessage(message, index)
      })
   }

   return(
      <ScrollView style={styles.container}>
         {displayMessages()}
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