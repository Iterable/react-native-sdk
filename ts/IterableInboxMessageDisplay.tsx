'use strict'

import React, { useState, useEffect } from 'react'
import { 
   Text, 
   View, 
   StyleSheet, 
   TouchableWithoutFeedback, 
   useWindowDimensions 
} from 'react-native'
import RenderHtml from 'react-native-render-html'
import Icon from 'react-native-vector-icons/Ionicons'

import { InboxRowViewModel, IterableHtmlInAppContent } from '.'
import { IterableEdgeInsets } from './IterableInAppClasses'

type MessageDisplayProps = {
   rowViewModel: InboxRowViewModel,
   inAppContentPromise: Promise<IterableHtmlInAppContent>,
   returnToInbox: Function
}

const IterableInboxMessageDisplay = ({ rowViewModel, inAppContentPromise, returnToInbox }: MessageDisplayProps) => {
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
            <RenderHtml contentWidth={width} source={inAppContent}/>
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
      height: '100%',
      backgroundColor: 'whitesmoke',
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