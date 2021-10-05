'use strict'

import React, { useState, useEffect } from 'react'
import { 
  Text, 
  View,
  ScrollView,  
  StyleSheet,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native'
import { WebView } from 'react-native-webview'
import Icon from 'react-native-vector-icons/Ionicons'

import { InboxRowViewModel, IterableHtmlInAppContent, IterableEdgeInsets } from '.'

type MessageDisplayProps = {
   rowViewModel: InboxRowViewModel,
   inAppContentPromise: Promise<IterableHtmlInAppContent>,
   returnToInbox: Function,
   contentWidth: number,
   isPortrait: boolean
}

const IterableInboxMessageDisplay = ({ 
   rowViewModel, 
   inAppContentPromise, 
   returnToInbox, 
   contentWidth,
   isPortrait
}: MessageDisplayProps) => {
   const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title
   const [inAppContent, setInAppContent] = useState<IterableHtmlInAppContent>(new IterableHtmlInAppContent(new IterableEdgeInsets(0, 0, 0, 0), ""))

   let {
      returnButtonContainer,
      returnButton,
      messageDisplayContainer,
      headline
   } = styles

   let updatedMessageDisplayContainer = {...messageDisplayContainer, width: contentWidth}

   headline = (!isPortrait) ? {...headline, paddingLeft: 45} : headline
   returnButton = (!isPortrait) ? {...returnButton, paddingLeft: 40} : returnButton
   returnButtonContainer = (!isPortrait) ? {...returnButtonContainer, marginTop: 10} : returnButtonContainer

   let JS = `
      const links = document.querySelectorAll('a')
      links.forEach(link => {
         if(link.href === 'iterable://dismiss') {
            link.onclick = clickLink
         }
      })
      function clickLink(data) {
         window.ReactNativeWebView.postMessage(data)
      }
   `

   useEffect(() => {
      inAppContentPromise.then(
         (value) => {
            setInAppContent(value)
         })
   })

   return(
      <View style={updatedMessageDisplayContainer}>
         <View style={returnButtonContainer}>
            <TouchableWithoutFeedback onPress={() => returnToInbox()}>
               <Icon 
                  name="ios-arrow-back"
                  style={returnButton} />
            </TouchableWithoutFeedback>
         </View>
         <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={headline}>
               {messageTitle}
            </Text>
            <WebView
               originWhiteList={['*']}
               source={{ html: inAppContent.html }} 
               style={{ width: contentWidth }}
               onMessage={(event) => returnToInbox()}
               injectedJavaScript={JS}
               onShouldStartLoadWithRequest={event => {
                  if(event.url.slice(0,4) === 'http') {
                     Linking.openURL(event.url)
                     return false
                  }
                  return true 
               }}
            />
         </ScrollView> 
      </View>
   )
}

const styles = StyleSheet.create({
   returnButtonContainer: {
      marginTop: 40,
      backgroundColor: 'whitesmoke'
   },

   contentContainer: {
      flex: 1,
      height: '50%'
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