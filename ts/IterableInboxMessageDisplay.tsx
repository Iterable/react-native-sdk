'use strict'

import React, { useState, useEffect } from 'react'
import { 
  Text, 
  View, 
  Dimensions, 
  StyleSheet, 
  TouchableWithoutFeedback,
  useWindowDimensions 
} from 'react-native'
import RenderHtml from 'react-native-render-html'
import Icon from 'react-native-vector-icons/Ionicons'

import { InboxRowViewModel, IterableHtmlInAppContent, IterableEdgeInsets } from '.'

type MessageDisplayProps = {
   rowViewModel: InboxRowViewModel,
   inAppContentPromise: Promise<IterableHtmlInAppContent>
   returnToInbox: Function
}

const IterableInboxMessageDisplay = ({ rowViewModel, inAppContentPromise, returnToInbox }: MessageDisplayProps) => {
   const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title
   const [inAppContent, setInAppContent] = useState<IterableHtmlInAppContent>(new IterableHtmlInAppContent(new IterableEdgeInsets(0, 0, 0, 0), ""))
   
   const SCREEN_WIDTH = useWindowDimensions().width

   let {
      returnButtonContainer,
      returnButton,
      messageDisplayContainer,
      headline
   } = styles

   let updatedMessageDisplayContainer = {...messageDisplayContainer, width: SCREEN_WIDTH}

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
         <View style={messageDisplayContainer}>
            <Text style={headline}>
               {messageTitle}
            </Text>
            <RenderHtml contentWidth={SCREEN_WIDTH} source={inAppContent}/>
         </View> 
      </View>
   )
}

const styles = StyleSheet.create({
   returnButtonContainer: {
      marginTop: 40,
      backgroundColor: 'whitesmoke'
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