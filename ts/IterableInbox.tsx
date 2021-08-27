'use strict'

import React, { useState, useEffect } from 'react'
import {
   View, 
   Text, 
   SafeAreaView, 
   StyleSheet,
   Animated,
   Dimensions
} from 'react-native'

import IterableInboxMessageList from './IterableInboxMessageList'
import IterableInboxEmptyState from './IterableInboxEmptyState'
import IterableInboxMessageDisplay from './IterableInboxMessageDisplay'

import InboxRowViewModel from './InboxRowViewModel'
import IterableInboxDataModel from './IterableInboxDataModel'
import Customization from './customizationType'

const SCREEN_WIDTH = Dimensions.get('window').width

type inboxProps = {
   messageListItemLayout: Function,
   customizations: Customization
}

const IterableInbox = ({
   messageListItemLayout, 
   customizations
}: inboxProps) => {
   const defaultInboxTitle = "Inbox"
   const [selectedMessageIdx, setSelectedMessageIdx] = useState<number>(0)
   const [messages, setMessages] = useState<InboxRowViewModel[]>([])
   const inboxDataModel = new IterableInboxDataModel()

   const [isReady, setIsReady] = useState<boolean>(false)
   const [animatedValue, setAnimatedValue] = useState<any>(new Animated.Value(0))

   const fetchData = async () => {
      const newMessages = await inboxDataModel.refresh()
      setMessages(newMessages)
   }

   useEffect(() => {
      fetchData()
   }, [])

   function handleMessageSelect(id: string, index: number, messages: InboxRowViewModel[]) {
      let newMessages = messages.map((message) => {
         return (message.inAppMessage.messageId === id) ?
            {...message, read: true } : message
      })
      setMessages(newMessages)
      inboxDataModel.setItemAsRead(index)
      setSelectedMessageIdx(index)
      slideLeft()
   }

   // function deleteMessage(id: string, index: number, messages: InboxRowViewModel[]) {
   //    let newMessages = messages.filter((message) => {
   //       return message.inAppMessage.messageId !== id
   //    })
   //    inboxDataModel.deleteItem(index, inboxSwipe)
   //    //newMessages[newMessages.length - 1] = {...newMessages[newMessages.length - 1], last: true}
   //    setMessages(newMessages)
   // }

   function returnToInbox() {
      reset()
   }
   
   function showMessageDisplay(messagesList: InboxRowViewModel[], index: number) {
      const selectedMessage = messagesList[index]

      return (
         selectedMessage ?
            <IterableInboxMessageDisplay
               message={selectedMessage}
               returnToInbox={() => returnToInbox()}
            /> : null
         )
   }

   function showMessageList() {
      return (
         <View style={styles.messageListContainer}>
            <Text style={styles.headline}>
               {customizations.navTitle ? customizations.navTitle : defaultInboxTitle}
            </Text>
            { messages.length ?
               <IterableInboxMessageList 
                  messages={messages}
                  messageListItemLayout={messageListItemLayout}
                  customizations={customizations}
                  //deleteMessage={(id: string) => deleteMessage(id, messages)}
                  handleMessageSelect={(id: string, index: number) => handleMessageSelect(id, index, messages)}
               />  : 
               <IterableInboxEmptyState customizations={customizations} />
            }
         </View>)
   }

   const slideLeft = () => {
      Animated.timing(animatedValue, {
         toValue: 1,
         duration: 500,
         useNativeDriver: false
      }).start()
   }

   const reset = () => {
      Animated.timing(animatedValue, {
         toValue: 0,
         duration: 500,
         useNativeDriver: false
      }).start()  
   }

   return(
      <SafeAreaView style={styles.container}>
         <Animated.View
            style={{
               transform: [
                  {translateX: animatedValue.interpolate({
                     inputRange: [0, 1],
                     outputRange: [0, -SCREEN_WIDTH]
                  })}
               ],
               height: "100%",
               flexDirection: 'row',
               width: 2 * SCREEN_WIDTH,
               justifyContent: "flex-start",
            }}
         >
            {showMessageList()}   
            {showMessageDisplay(messages, selectedMessageIdx)}
         </Animated.View>      
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: 2 * SCREEN_WIDTH,
      flexDirection: 'row',
      height: '100%',
      alignItems: "center",
      justifyContent: "flex-start"
   },

   messageListContainer: {
      width: SCREEN_WIDTH
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

export default IterableInbox