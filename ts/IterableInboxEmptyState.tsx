'use strict'

import React from 'react'
import { 
   View, 
   Text, 
   StyleSheet,
   useWindowDimensions
} from 'react-native'

import { IterableInboxCustomizations } from '.'

type emptyStateProps = {
   customizations: IterableInboxCustomizations,
   tabBarHeight: number,
   tabBarPadding: number,
   navTitleHeight: number,
   contentWidth: number,
   height: number,
   orientation: string
}

const IterableInboxEmptyState = ({ 
   customizations, 
   tabBarHeight,
   tabBarPadding, 
   navTitleHeight,
   height,
   orientation 
} : emptyStateProps) => {
   const defaultTitle = "No saved messages"
   const defaultBody = "Check again later!"
   
   const emptyStateTitle = customizations.noMessagesTitle
   const emptyStateBody = customizations.noMessagesBody

   let {
      container,
      title,
      body   
   } = styles

   container = {...container, height: height - navTitleHeight - tabBarHeight - tabBarPadding}

   if(orientation === 'LANDSCAPE') {
      container = {...container, height: height - navTitleHeight}
   }

   return(
      <View style={container}>
         <Text style={title}>
            {emptyStateTitle ? emptyStateTitle : defaultTitle}
         </Text>
         <Text style={body}>
            {emptyStateBody ? emptyStateBody : defaultBody}
         </Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      height: 0, 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'whitesmoke'
   },

   title: {
      fontWeight: 'bold',
      fontSize: 20,
      // paddingTop: 250,
      paddingBottom: 25
   },

   body: {
      fontSize: 15,
      color: 'grey'
   }
})

export default IterableInboxEmptyState