'use strict'

import React, { useState, useEffect } from 'react'
import {
   Text,
   View,
   ScrollView,
   StyleSheet,
   Platform,
   Linking,
   TouchableWithoutFeedback,
} from 'react-native'
import { WebView } from 'react-native-webview'
import Icon from 'react-native-vector-icons/Ionicons'

import { 
   InboxRowViewModel, 
   IterableHtmlInAppContent, 
   IterableEdgeInsets,
   IterableInAppLocation,
   IterableInAppCloseSource,
   IterableAction,  
   IterableActionContext,  
   Iterable 
} from '.'
  
import { IterableActionSource } from './Iterable'  

type MessageDisplayProps = {
   rowViewModel: InboxRowViewModel,
   inAppContentPromise: Promise<IterableHtmlInAppContent>,
   returnToInbox: Function,
   deleteRow: Function,
   contentWidth: number,
   isPortrait: boolean
}

const IterableInboxMessageDisplay = ({ 
   rowViewModel, 
   inAppContentPromise, 
   returnToInbox,
   deleteRow, 
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

   let updatedMessageDisplayContainer = { ...messageDisplayContainer, width: contentWidth }

   headline = (!isPortrait) ? { ...headline, paddingLeft: 45 } : headline
   returnButton = (!isPortrait) ? { ...returnButton, paddingLeft: 40 } : returnButton
   returnButtonContainer = { ...returnButtonContainer, marginTop: Platform.OS === 'android' ? 0 : 40 }
   returnButtonContainer = (!isPortrait) ? { ...returnButtonContainer, marginTop: 10 } : returnButtonContainer

   let JS = `
      const links = document.querySelectorAll('a')

      links.forEach(link => {
         link.class = link.href

         link.href = "javascript:void(0)"

         link.addEventListener("click", () => {
            window.ReactNativeWebView.postMessage(link.class)   
         })
      })
   `

   useEffect(() => {
      inAppContentPromise.then(
         (value) => {
            setInAppContent(value)
         })
   })

   const handleHTMLMessage = (event: any) => {
      let URL = event.nativeEvent.data

      if (URL === 'iterable://delete') {
         deleteRow(rowViewModel.inAppMessage.messageId)
      } else if (Iterable.savedConfig.urlHandler) {
         let action = new IterableAction("openUrl", URL, "")
         let source = IterableActionSource.inApp
         let context = new IterableActionContext(action, source)

         Iterable.savedConfig.urlHandler(event.nativeEvent.data, context)
      }

      if (URL.slice(0, 4) === 'http') {
         Linking.openURL(URL)
      }

      returnToInbox()
   }

   return (
      <View style={updatedMessageDisplayContainer}>
         <View style={returnButtonContainer}>
            <TouchableWithoutFeedback 
               onPress={() => {
                  returnToInbox()
                  Iterable.trackInAppClose(rowViewModel.inAppMessage, IterableInAppLocation.inbox, IterableInAppCloseSource.back)
               }}>
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
               onMessage={(event) => handleHTMLMessage(event)}
               injectedJavaScript={JS}
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