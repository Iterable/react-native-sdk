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
   IterableActionContext
} from '.'

import { Iterable, IterableActionSource } from './Iterable'

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

   const styles = StyleSheet.create({
      messageDisplayContainer: {
         height: '100%',
         backgroundColor: 'whitesmoke',
         flexDirection: 'column',
         justifyContent: 'flex-start'
      },

      header: {
         flexDirection: 'row',
         justifyContent: 'center',
         width: '100%'
      },

      returnButtonContainer: {
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
         width: '25%',
         marginLeft: 0,
         marginTop: 0
      },

      returnButton: {
         flexDirection: 'row',
         alignItems: 'center'
      },

      returnButtonIcon: {
         color: 'deepskyblue',
         fontSize: 40,
         paddingLeft: 0
      },

      returnButtonText: {
         color: 'deepskyblue',
         fontSize: 20
      },

      messageTitleContainer: {
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
         width: '75%',
         marginTop: 0
      },

      messageTitle: {
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         width: 0.5 * contentWidth,
      },

      messageTitleText: {
         fontWeight: 'bold',
         fontSize: 20,
         backgroundColor: 'whitesmoke'
      },
   
      contentContainer: {
         flex: 1,
      }
   })

   let {
      header,
      returnButtonContainer,
      returnButton,
      returnButtonIcon,
      returnButtonText,
      messageTitleContainer,
      messageTitleText,
      messageDisplayContainer
   } = styles

   let updatedMessageDisplayContainer = { ...messageDisplayContainer, width: contentWidth }

   // platform dependent styling
   //returnButtonContainer = { ...returnButtonContainer, marginTop: Platform.OS === 'android' ? 0 : 40 }
   //messageTitleContainer = { ...messageTitleContainer, marginTop: Platform.OS === 'android' ? 0 : 40 }

   // orientation dependent styling
   // returnButtonIcon = (!isPortrait) ? { ...returnButtonIcon, paddingLeft: 40 } : returnButtonIcon
   returnButtonContainer = (!isPortrait) ? { ...returnButtonContainer, marginLeft: 40 } : returnButtonContainer
   // messageTitleContainer = (!isPortrait) ? { ...messageTitleContainer, marginTop: 0 } : messageTitleContainer

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
      let mounted = true
      inAppContentPromise.then(
         (value) => {
            if(mounted) {
               setInAppContent(value)
            }
         })
      return () => {mounted = false}
   })

   function handleInAppLinkAction(event: any) {
      let URL = event.nativeEvent.data

      let action = new IterableAction("openUrl", URL, "")
      let source = IterableActionSource.inApp
      let context = new IterableActionContext(action, source)

      Iterable.trackInAppClick(rowViewModel.inAppMessage, IterableInAppLocation.inbox, URL)
      Iterable.trackInAppClose(rowViewModel.inAppMessage, IterableInAppLocation.inbox, IterableInAppCloseSource.link, URL) 

      if (URL === 'iterable://delete') { 
         returnToInbox(() => deleteRow(rowViewModel.inAppMessage.messageId))
      } else if(URL === 'iterable://dismiss') {
         returnToInbox()
      } else if (URL.slice(0, 4) === 'http') {
         returnToInbox(() => Linking.openURL(URL))
      } else {
         returnToInbox(() => {
            if(Iterable.savedConfig.urlHandler) {
               Iterable.savedConfig.urlHandler(URL, context)
            } 
         })
      }
   }

   return (
      <View style={updatedMessageDisplayContainer}>
         <View style={header}>
            <View style={returnButtonContainer}>
               <TouchableWithoutFeedback 
                  onPress={() => {
                     returnToInbox()
                     Iterable.trackInAppClose(rowViewModel.inAppMessage, IterableInAppLocation.inbox, IterableInAppCloseSource.back)
                  }}
               >
                  <View style={returnButton}>
                     <Icon name="ios-chevron-back" style={returnButtonIcon} />
                     <Text style={returnButtonText}>Inbox</Text>
                  </View>
               </TouchableWithoutFeedback>
            </View>  
            <View style={messageTitleContainer}>
               <View style={styles.messageTitle}>
                  <Text style={messageTitleText}>{messageTitle}</Text>
               </View>
            </View>
         </View>
         <ScrollView contentContainerStyle={styles.contentContainer}>
            <WebView
               originWhiteList={['*']}
               source={{ html: inAppContent.html }}
               style={{ width: contentWidth }}
               onMessage={(event) => handleInAppLinkAction(event)}
               injectedJavaScript={JS}
            />
         </ScrollView>
      </View>
   )
}



export default IterableInboxMessageDisplay