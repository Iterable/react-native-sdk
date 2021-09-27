'use strict'

import React, { useState, useEffect, useRef } from 'react'
import { 
  Text, 
  View,
  ScrollView,  
  StyleSheet,
  Alert,
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
   orientation: string
}

const IterableInboxMessageDisplay = ({ 
   rowViewModel, 
   inAppContentPromise, 
   returnToInbox, 
   contentWidth, 
   orientation 
}: MessageDisplayProps) => {
   const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title
   const [inAppContent, setInAppContent] = useState<IterableHtmlInAppContent>(new IterableHtmlInAppContent(new IterableEdgeInsets(0, 0, 0, 0), ""))

   let webview = null

   let sampleHTML = `
      <html>
         <head>
         </head>
         <body>
            <script>
               function clickLink(data) {
                  setTimeout(function() {
                     window.ReactNativeWebView.postMessage(data)
                  }, 0)
               }
            </script>
            <div class="modal-container" style="display: flex; flex-direction: column; font-size: 20pt; justify-content: center; align-items: center; margin: auto; width: 100%; border: none; padding: none;background:#ffffff">
               <p><a href="iterable://dismiss" onClick={clickLink('cats')}>CLICK ME!!</a></p>
            </div>
         </body>
      </html>
   `

   let {
      returnButtonContainer,
      returnButton,
      messageDisplayContainer,
      headline
   } = styles

   let updatedMessageDisplayContainer = {...messageDisplayContainer, width: contentWidth}

   headline = (orientation === 'LANDSCAPE') ? {...headline, paddingLeft: 45} : headline
   returnButton = (orientation === 'LANDSCAPE') ? {...returnButton, paddingLeft: 40} : returnButton
   returnButtonContainer = (orientation === 'LANDSCAPE') ? {...returnButtonContainer, marginTop: 10} : returnButtonContainer

   useEffect(() => {
      inAppContentPromise.then(
         (value) => {
            setInAppContent(value)
         })
   })

   const handleWebViewNavigationStateChange = (newNavState : any) => {
      const { url } = newNavState
      console.log("url: ", url)
      // if(!url) return
      // if(url.includes('iterable://dismiss')) {
      returnToInbox()
   }

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
               onNavigationStateChange={(newNavState: any) => handleWebViewNavigationStateChange(newNavState)}
               ref={(ref) => (webview = ref)}
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