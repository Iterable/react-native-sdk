'use strict'

import React from 'react'
import { 
   View, 
   Text, 
   StyleSheet,
   useWindowDimensions
} from 'react-native'

import { IterableInboxCustomizations } from '.'
import { useOrientation } from './useOrientation'

type emptyStateProps = {
   customizations: IterableInboxCustomizations,
   tabBarHeight: number,
   tabBarPadding: number,
   navTitleHeight: number
}

const IterableInboxEmptyState = ({ 
   customizations, 
   tabBarHeight,
   tabBarPadding, 
   navTitleHeight 
} : emptyStateProps) => {
   const defaultTitle = "No saved messages"
   const defaultBody = "Check again later!"
   
   const emptyStateTitle = customizations.noMessagesTitle
   const emptyStateBody = customizations.noMessagesBody

   const orientation = useOrientation()

   const SCREEN_HEIGHT = useWindowDimensions().height

   let {
      container,
      title,
      body   
   } = styles

   let updatedContainer = {...container, height: SCREEN_HEIGHT }

   return(
      <View style={updatedContainer}>
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
      //height: '100%',
      backgroundColor: 'whitesmoke', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
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