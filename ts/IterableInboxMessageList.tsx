'use strict'
import React, { ReactElement } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import IterableInboxMessageCell from './IterableInboxMessageCell'

type MessageListProps = {
   messages: Array<any>,
   handleMessageSelect: Function  
}

const IterableInboxMessageList = ({ messages, handleMessageSelect }: MessageListProps) => {

   function displayMessages() {
      return messages.map((message, index) => {
         let last = (index === messages.length - 1) ? true : false
         return (         
            <IterableInboxMessageCell
               key={index}
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