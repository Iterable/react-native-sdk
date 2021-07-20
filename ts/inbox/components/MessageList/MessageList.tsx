'use strict'
import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import MessageCell from '@iterable/react-native-sdk/js/Inbox/components/MessageCell/MessageCell'

function MessageList() {
   return(
      <ScrollView style={styles.container}>
         <MessageCell lastMessage={false}></MessageCell>
         <MessageCell lastMessage={false}></MessageCell>
         <MessageCell lastMessage={false}></MessageCell>
         <MessageCell lastMessage={false}></MessageCell>
         <MessageCell lastMessage={false}></MessageCell>
         <MessageCell lastMessage={false}></MessageCell>
         <MessageCell lastMessage={false}></MessageCell>
         <MessageCell lastMessage={false}></MessageCell>
         <MessageCell lastMessage={false}></MessageCell>
         <MessageCell lastMessage={false}></MessageCell>           
         <MessageCell lastMessage={true}></MessageCell>
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