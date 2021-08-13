"use strict"
import React, { Component, useState } from "react"
import IterableInboxMessageListItem from "./IterableInboxMessageListItem"
import { 
   View, 
   Text, 
   StyleSheet, 
   TouchableOpacity 
} from "react-native"
import Message from "./messageType"

type MessageClickableRowProps = {
   index: number,
   message: Message,
   handleMessageSelect: Function,
   last: boolean 
}

const IterableInboxClickableRow = ({ index, message, handleMessageSelect, last }: MessageClickableRowProps) => {
   const [active, setActive] = useState(false)
   const lastStyle = active ? styles.pressedLastMessageCell : styles.lastMessageCell
   const style = active ? styles.pressedMessageCell : styles.messageCell

   return(
      <TouchableOpacity
         style={last ? lastStyle : style}
         activeOpacity={1}
         onPress={() => {
            setActive(!active)
            handleMessageSelect(index)
         }}
      >
         <IterableInboxMessageListItem
            index={index} 
            message={message}
            last={last}
         /> 
      </TouchableOpacity>
   )   
}

const styles = StyleSheet.create({
   messageCell: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      width: '100%',
      borderStyle: 'solid',
      borderTopColor: 'lightgray',
      borderBottomColor: 'lightgray',
      borderWidth: 0,
      borderTopWidth: 1
   },

   pressedMessageCell: {
      flexDirection: 'row',
      backgroundColor: 'whitesmoke',
      paddingTop: 10,
      paddingBottom: 10,
      width: '100%',
      borderStyle: 'solid',
      borderTopColor: 'lightgray',
      borderBottomColor: 'lightgray',
      borderWidth: 0,
      borderTopWidth: 1
   },

   lastMessageCell: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: 70,
      width: '100%',
      borderStyle: 'solid',
      borderTopColor: 'lightgray',
      borderBottomColor: 'lightgray',
      borderWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1
   },

   pressedLastMessageCell: {
      flexDirection: 'row',
      backgroundColor: 'whitesmoke',
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: 70,
      width: '100%',
      borderStyle: 'solid',
      borderTopColor: 'lightgray',
      borderBottomColor: 'lightgray',
      borderWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1
   }
})

export default IterableInboxClickableRow