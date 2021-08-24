'use strict'

import React from 'react'
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'

import Icon from 'react-native-vector-icons/Ionicons'
import InboxRowViewModel from './InboxRowViewModel'
import IterableInAppMessage from './IterableInAppMessage'

type MessageDisplayProps = {
   message: InboxRowViewModel,
   returnToInbox: Function
}

const IterableInboxMessageDisplay = ({ message, returnToInbox }: MessageDisplayProps) => {
   const messageTitle = message.inAppMessage.inboxMetadata?.title
   const html = message.inAppMessage.customPayload.html
   const { width } = useWindowDimensions()

   return(
      <View>
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
            <RenderHTML contentWidth={width} source={{ html }} />
         </View> 
      </View>
   )
}

const styles = StyleSheet.create({
   returnButtonContainer: {
      marginTop: 0
   },

   returnButton: {
      color: 'blue',
      fontSize: 40, 
      paddingLeft: 10
   },

   container: {
      //height: '100%',
      backgroundColor: 'whitesmoke', 
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