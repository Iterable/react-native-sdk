'use strict'

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type emptyStateProps = {
   customization: {[key: string]: string}
}

const IterableInboxEmptyState = ({ customization } : emptyStateProps) => {
   const defaultTitle = "No saved messages"
   const defaultBody = "Check again later!"
   
   const title = customization.emptyStateTitle
   const body = customization.emptyStateBody

   return(
      <View style={styles.container}>
         <Text style={styles.title}>
            {title ? title : defaultTitle}
         </Text>
         <Text style={styles.subtitle}>
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

   subtitle: {
      fontSize: 15,
      color: 'grey'
   }
})

export default IterableInboxEmptyState