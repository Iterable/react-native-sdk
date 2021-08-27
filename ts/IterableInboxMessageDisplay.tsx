'use strict'

import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/Ionicons'

import { InboxRowViewModel, IterableHtmlInAppContent } from '.'
import { IterableEdgeInsets } from './IterableInAppClasses'

type MessageDisplayProps = {
   index: number,
   rowViewModel: InboxRowViewModel,
   inAppContentPromise: Promise<IterableHtmlInAppContent>,
   returnToInbox: Function
}

const IterableInboxMessageDisplay = ({ index, rowViewModel, inAppContentPromise, returnToInbox }: MessageDisplayProps) => {
   const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title
   const { width } = useWindowDimensions()
   const [inAppContent, setInAppContent] = useState<IterableHtmlInAppContent>(new IterableHtmlInAppContent(new IterableEdgeInsets(0, 0, 0, 0), ""))
   
   useEffect(() => {
      inAppContentPromise.then(
         (value) => {
            setInAppContent(value)
         })
   })

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
            <Text>{inAppContent?.html}</Text>
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
      fontWeight: 'bold',
      fontSize: 40,
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      backgroundColor: 'whitesmoke'
   }
 })

export default IterableInboxMessageDisplay