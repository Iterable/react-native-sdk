import React from 'react'
import {
   View,
   Text,
   StyleSheet,
   Image,
   TouchableOpacity
} from 'react-native'
import {
   containerProps,
   imageProps,
   titleLabelProps,
   subTitleLabelProps,
   btnPrimaryProps,
   btnSecondaryProps
} from '../types/commonType';

type cardViewProps = containerProps & imageProps & titleLabelProps & subTitleLabelProps & btnPrimaryProps & btnSecondaryProps

const IterableCardView = (props: cardViewProps) => {
   return (
      <View style={{ borderWidth: 1, borderColor: 'black' }}>
         <Image source={{ uri: 'https://codesymphony.in/assets/projects/noobstrom/noob-web-4.png' }} style={{ height: 150, width: '100%' }} />
         <Text>{"hello world"}</Text>
         <Text>{"Subtitle"}</Text>
         <View>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 200, height: 50, borderRadius: 20, backgroundColor: '#A9A9A9' }}>
               <Text style={{ color: 'black' }}>{"Button 1"}</Text>
            </TouchableOpacity>
         </View>
      </View>
   )
}

export default IterableCardView