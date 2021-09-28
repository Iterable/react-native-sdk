"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"

const EmptyState = () => {
   const title = "No saved messages"
   const subTitle = "Check again later!"

   return(
      <View style={styles.container}>
         <Text testID="title" style={styles.title}>
            {title}    
         </Text>
         <Text testID="subtitle" style={styles.subTitle}>
            {subTitle}    
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

    subTitle: {
       fontSize: 15,
       color: 'grey'
    }
 })

export default EmptyState;