'use strict'
import React, { ReactElement } from 'react'
import { ScrollView, Text, StyleSheet, ProgressViewIOSComponent } from 'react-native'
import MessageCell from '../MessageCell/MessageCell'

type MessageListProps = {
   messages: Array<any>,
   updateMessage: Function  
}

const MessageList = ({ messages, handleMessageSelect }: MessageListProps) => {
   function flaggedMessage(message: { [key: string]: any }, index: number) {
      return (index === messages.length - 1) ?
         <MessageCell 
            index={index}
            message={message}
            handleMessageSelect={handleMessageSelect} 
            last={true} /> :
         <MessageCell
            index={index} 
            message={message}
            handleMessageSelect={handleMessageSelect} 
            last={false} />
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