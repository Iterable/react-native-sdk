'use strict'
import React, { ReactElement } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import IterableInboxMessageCell from './IterableInboxMessageCell'

type MessageListProps = {
   messages: Array<any>  
}

const IterableInboxMessageList = ({ messages }: MessageListProps) => {
   function flaggedMessage(message: { [key: string]: any }, index: number) {
      return (index === messages.length - 1) ?
         <IterableInboxMessageCell message={message} last={true} /> :
         <IterableInboxMessageCell message={message} last={false} />
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

export default IterableInboxMessageList;