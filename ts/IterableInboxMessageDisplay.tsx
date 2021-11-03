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

import { InboxRowViewModel, IterableHtmlInAppContent, IterableEdgeInsets } from '.'
import { Iterable, IterableAction, IterableActionSource, IterableActionContext } from './Iterable'
import { IterableInAppLocation, IterableInAppCloseSource } from './IterableInAppClasses'

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

   let updatedMessageDisplayContainer = {...messageDisplayContainer, width: contentWidth}

   headline = (!isPortrait) ? {...headline, paddingLeft: 45} : headline
   returnButton = (!isPortrait) ? {...returnButton, paddingLeft: 40} : returnButton
   returnButtonContainer = {...returnButtonContainer, marginTop: Platform.OS === 'android' ? 0 : 40}
   returnButtonContainer = (!isPortrait) ? {...returnButtonContainer, marginTop: 10} : returnButtonContainer

   let JS = `
      const links = document.querySelectorAll('a')
      links.forEach(link => {
         link.addEventListener("click", () => {
            window.ReactNativeWebView.postMessage(link.href)
         })
      })
   `

   let action = new IterableAction("", "", "")
   let source = IterableActionSource.inApp
   let context = new IterableActionContext(action, source)

   useEffect(() => {
      inAppContentPromise.then(
         (value) => {
            setInAppContent(value)
         })
   })

   const handleHTMLMessage = (event: any) => {
      let url = event.nativeEvent.data

      Iterable.trackInAppClick(rowViewModel.inAppMessage, IterableInAppLocation.inbox, url)
      
      if(url === 'iterable://delete') {
         deleteRow(rowViewModel.inAppMessage.messageId)
         returnToInbox()
      } else if(url === 'iterable://dismiss') {
         returnToInbox()
         Iterable.trackInAppClose(rowViewModel.inAppMessage, IterableInAppLocation.inbox, IterableInAppCloseSource.link, null)
      } else {
         if(Iterable.savedConfig.urlHandler && Iterable.savedConfig.urlHandler(url, context)) {
            Iterable.savedConfig.urlHandler(url, context)
            returnToInbox()
         }
      }
   }

   const openExternalURL = (event: any) => {
      if(event.url.slice(0,4) === 'http') {
         Linking.openURL(event.url)
         returnToInbox()
         return false
      }
      return true 
   }

   return(
      <View style={updatedMessageDisplayContainer}>
         <View style={returnButtonContainer}>
            <TouchableWithoutFeedback 
               onPress={() => {
                  returnToInbox()
                  Iterable.trackInAppClose(rowViewModel.inAppMessage, IterableInAppLocation.inbox, IterableInAppCloseSource.back, null)
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
               onShouldStartLoadWithRequest={(event) => openExternalURL(event)}
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