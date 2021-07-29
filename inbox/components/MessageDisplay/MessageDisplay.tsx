'use strict'
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default function MessageDisplay() {
   const message = "YO YO YO";

   return(
      <View> 
         <View style={styles.returnButtonContainer}>
            <Icon name="ios-arrow-back" style={styles.returnButton}/>
         </View> 
         <View style={styles.container}>
            <Text style={styles.headline}>
               {message}
            </Text>
         </View>
      </View>  
   )
}

const styles = StyleSheet.create({
    returnButtonContainer: {
       marginTop: 0
    },

    returnButton: {
       color: 'blue',
       fontSize: 40, 
       paddingLeft: 10
    },

    container: {
       height: '100%',
       backgroundColor: 'whitesmoke', 
       flexDirection: 'column',
       justifyContent: 'flex-start'
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