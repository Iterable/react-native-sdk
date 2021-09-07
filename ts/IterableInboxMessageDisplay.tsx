'use strict'

import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import RenderHtml from 'react-native-render-html'
import Icon from 'react-native-vector-icons/Ionicons'

import { InboxRowViewModel, IterableHtmlInAppContent, IterableEdgeInsets } from '.'

type MessageDisplayProps = {
   rowViewModel: InboxRowViewModel,
   inAppContentPromise: Promise<IterableHtmlInAppContent>
   returnToInbox: Function
}

const SCREEN_WIDTH = Dimensions.get('window').width

const IterableInboxMessageDisplay = ({ rowViewModel, inAppContentPromise, returnToInbox }: MessageDisplayProps) => {
   const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title
   const [inAppContent, setInAppContent] = useState<IterableHtmlInAppContent>(new IterableHtmlInAppContent(new IterableEdgeInsets(0, 0, 0, 0), ""))
   
   useEffect(() => {
      inAppContentPromise.then(
         (value) => {
            setInAppContent(value)
         })
   })

   return(
      <View style={styles.messageDisplayContainer}>
         <View style={styles.returnButtonContainer}>
            <TouchableWithoutFeedback onPress={() => returnToInbox()}>
               <Icon 
                  name="ios-arrow-back"
                  style={styles.returnButton} />
            </TouchableWithoutFeedback>
         </View>
         <View style={styles.messageDisplayContainer}>
            <Text style={styles.headline}>
               {messageTitle}
            </Text>
            <RenderHtml contentWidth={SCREEN_WIDTH} source={inAppContent}/>
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

   messageDisplayContainer: {
      width: SCREEN_WIDTH,
      height: '100%',
      backgroundColor: 'white', 
      flexDirection: 'column',
      justifyContent: 'flex-start'
   },

   headline: {
      fontWeight: 'bold',
      fontSize: 30,
      width: '100%',
      flexWrap: "wrap",
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      backgroundColor: 'whitesmoke'
   }
 })

export default IterableInboxMessageDisplay