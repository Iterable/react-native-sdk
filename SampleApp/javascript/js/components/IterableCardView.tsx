// @ts-nocheck
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

   const imgURI = props?.imgSrc ? props.imgSrc : 'https://codesymphony.in/assets/projects/noobstrom/noob-web-4.png';
   const cardBorderRadius = props.borderRadius ? props.borderRadius : 10;

   return (
      <View style={{
         marginBottom: 10,
         borderRadius: cardBorderRadius,
         backgroundColor: props?.backgroundColor ? props?.backgroundColor : '#E4E4E4',
         shadowColor: props?.shadowColor ? props?.shadowColor : '#470000',
         shadowOffset: { 
            width: props?.shadowWidth ? props?.shadowWidth : 0, 
            height: props?.shadowHeight ? props?.shadowHeight : 1 
         },
         shadowOpacity: props?.shadowOpacity ? props?.shadowOpacity : 0.2,
         elevation: 1
      }}>
         <View style={{ height: 150, width: '100%' }}>
            <Image source={{ uri: imgURI }} style={{ height: props?.imgHeight ? props?.imgHeight : '100%', width: props?.imgWidth ? props?.imgWidth : '100%' }} />
         </View>
         <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: props?.titleFontSize ? props?.titleFontSize : 18, color: props?.titleTextColor ? props?.titleTextColor : 'black', marginVertical: 10, fontWeight: '700' }}>
               {props?.titleText ? props?.titleText : 'Card View Title'}
            </Text>
            <Text style={{ fontSize: props?.subTitleFontSize ? props?.subTitleFontSize : 16, color: props?.subTitleTextColor ? props?.subTitleTextColor : 'black', marginVertical: 6 }}>
               {props?.subTitleText ? props?.subTitleText : "Lorem ipsum dummy text, Lorem ipsum dummy text, Lorem ipsum dummy text, Lorem ipsum dummy text"}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 18 }}>
               <TouchableOpacity onPress={() => props?.btnPrimaryOnClick ? props?.btnPrimaryOnClick() : null} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ 
                     fontSize: props?.btnPrimaryFontSize ? props?.btnPrimaryFontSize : 14, 
                     color: props?.btnPrimaryTextColor ? props?.btnPrimaryTextColor : 'black', 
                     fontWeight: 'bold' 
                  }}>
                     {props?.btnPrimaryText ? props.btnPrimaryText : "Learn more"}
                  </Text>
               </TouchableOpacity>
               {props?.isShowbtnSecondary ? <TouchableOpacity onPress={() => props?.btnSecondaryOnClick ? props?.btnSecondaryOnClick() : null} style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                  <Text style={{
                     fontSize: props?.btnSecondaryFontSize ? props?.btnSecondaryFontSize : 14, 
                     color: props?.btnSecondaryTextColor ? props?.btnSecondaryTextColor : 'black', 
                     fontWeight: 'bold'
                  }}>
                     {props?.btnSecondaryText ? props?.btnSecondaryText : "action"}
                  </Text>
               </TouchableOpacity> : null}
            </View>
         </View>
      </View>
   )
}

export default IterableCardView