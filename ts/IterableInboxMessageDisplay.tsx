'use strict'

import React from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import InboxRowViewModel from './InboxRowViewModel'

type MessageDisplayProps = {
   rowViewModel: InboxRowViewModel,
   returnToInbox: Function
}

const SCREEN_WIDTH = Dimensions.get('window').width

const IterableInboxMessageDisplay = ({ 
   message, 
   returnToInbox }: 
MessageDisplayProps) => {
   const messageTitle = message.inAppMessage.inboxMetadata?.title

   return(
      <View style={styles.messageDisplayContainer}>
         <View style={styles.returnButtonContainer}>
            <Icon 
               name="ios-arrow-back"
               style={styles.returnButton}
               onPress={() => returnToInbox()} />
         </View>
         <View style={styles.container}>
            <Text style={styles.headline}>
               {messageTitle}
            </Text>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   messageDisplayContainer: {
      width: SCREEN_WIDTH
   },

   returnButtonContainer: {
      marginTop: 0
   },

   returnButton: {
      color: 'blue',
      fontSize: 40, 
      paddingLeft: 10
   },

   container: {
      height: '100%',
      backgroundColor: 'white', 
      flexDirection: 'column',
      justifyContent: 'flex-start'
   },

   headline: {
      fontWeight: 'bold' ,
      fontSize: 40,
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      backgroundColor: 'whitesmoke'
   }
 })

export default IterableInboxMessageDisplay