'use strict'

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Customization from './customizationType'

type emptyStateProps = {
   customizations: Customization
}

const IterableInboxEmptyState = ({ customizations } : emptyStateProps) => {
   const defaultTitle = "No saved messages"
   const defaultBody = "Check again later!"
   
   const title = customizations.noMessagesTitle
   const body = customizations.noMessagesBody

   return(
      <View style={styles.container}>
         <Text style={styles.title}>
            {title ? title : defaultTitle}
         </Text>
         <Text style={styles.body}>
            {body ? body : defaultBody}
         </Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      height: '100%',
      backgroundColor: 'whitesmoke', 
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
   },

   title: {
      fontWeight: 'bold',
      fontSize: 20,
      paddingTop: 250,
      paddingBottom: 25
   },

   body: {
      fontSize: 15,
      color: 'grey'
   }
})

export default IterableInboxEmptyState