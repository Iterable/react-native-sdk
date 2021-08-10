'use strict';
import React, { ReactElement } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import IterableInboxMessageCell from './IterableInboxMessageCell';

type MessageListProps = {
   messages: Array<any>,
   handleMessageSelect: Function  
}

const IterableInboxMessageList = ({ messages, handleMessageSelect }: MessageListProps) => {
   function flaggedMessage(message: { [key: string]: any }, index: number) {
      return (index === messages.length - 1) ?
         <IterableInboxMessageCell
            index={index} 
            message={message}
            handleMessageSelect={(index: number) => handleMessageSelect(index, messages)} 
            last={true} /> :
         <IterableInboxMessageCell
            index={index} 
            message={message}
            handleMessageSelect={(index: number) => handleMessageSelect(index, messages)}  
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
   }
})

export default IterableInboxMessageList;