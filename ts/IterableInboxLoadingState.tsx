'use strict'

import React from 'react'
import { View, Image, StyleSheet, DatePickerIOS } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'

const IterableInboxLoadingState = () => {
   return(
      <View style={styles.container}>
         <Image 
            style={{height: 100, width: 100}} 
            source={require('./circle-of-dots-png.png')} 
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      height: '100%',
      backgroundColor: 'whitesmoke', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
   },
})

export default IterableInboxLoadingState