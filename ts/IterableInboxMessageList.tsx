'use strict'

import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import IterableInboxClickableRow from './IterableInboxClickableRow'
import Message from "./messageType"

type MessageListProps = {
   messages: Message[],
   handleMessageSelect: Function  
}

const IterableInboxMessageList = ({ messages, handleMessageSelect }: MessageListProps) => {
   function displayMessages() {
      return messages.map((message, index) => {
         let last = index === messages.length - 1
         return (
            <IterableInboxClickableRow
               key={message.messageId}
               index={index}
               message={message}
               handleMessageSelect={(index: number) => handleMessageSelect(index, messages)}
               last={last} />)
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
   }
})

export default IterableInboxMessageList