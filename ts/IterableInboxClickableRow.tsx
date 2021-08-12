"use strict"
import React, { Component, useState } from "react"
import IterableInboxMessageListItem from "./IterableInboxMessageListItem"
import { 
   View, 
   Text, 
   StyleSheet, 
   TouchableOpacity 
} from "react-native"

type MessageClickableRowProps = {
   index: number,
   message: {[key: string]: any},
   handleMessageSelect: Function,
   last: boolean 
}

const IterableInboxClickableRow = ({ index, message, handleMessageSelect, last }: MessageClickableRowProps) => {
   const [active, setActive] = useState(false)

   return(
      <TouchableOpacity
         style={
            last
               ? ((active) ? styles.pressedLastMessageCell : styles.lastMessageCell)
               : ((active) ? styles.pressedMessageCell : styles.messageCell)
         }
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