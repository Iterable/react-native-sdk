import React from 'react'
import { render } from '@testing-library/react-native'
import IterableInboxMessageListItem from '../IterableInboxMessageListItem'

describe('messageRowStyle unit tests', () => {
   it('should render message list item', () => {
      const rowViewModel = {
         title: "CATS FOR SALE!!",
         subtitle: "in denver right meow",
         imageUrl: "https://placekitten.com/200/300",
         createdAt: new Date("1631047627319"),
         read: false,
         inAppMessage: {
            campaignId: 100,
            isSilentInbox: () => {return true}, 
            saveToInbox: true,
            inboxMetaData: {
               icon: "https://placekitten.com/200/300",
               subtitle: "in denver right meow",
               title: "CATS FOR SALE!!"       
            },
            messageId: "o10Q2BP8kIdu57xZcKujuwBWp9rhknWVLsMMAJK7E7",
            read: false,
            expiresAt: new Date("1638823627319"),
            trigger: {type: 2},
            priorityLevel: 100,
            customPayload: {}
         },
         last: false  
      }

      const messageListItemLayout = () => {
         return    
      }

      const customizations = {
        navTitle: "Iterable",
        noMessagesTitle: "No kittens today...",
        noMessagesBody: "Come through tomorrow!",
     
        unreadIndicatorContainer: {
           height: '100%',
           flexDirection: 'column',
           justifyContent: 'center'
        },
     
        unreadIndicator: { 
           width: 15,
           height: 15,
           borderRadius: 15 / 2,
           backgroundColor: 'orange',
           marginLeft: 10,
           marginRight: 10,
           marginTop: 7
        },
     
        unreadMessageIconContainer: {
           paddingLeft: 0
        },
     
        readMessageIconContainer: {
           paddingLeft: 35
        },
     
        messageContainer: {
           paddingLeft: 10
        },
     
        title: {
           fontSize: 22,
           fontFamily: 'Menlo',
           paddingBottom: 10
        },
     
        body: {
           fontSize: 15,
           fontFamily: 'Marker Felt',
           color: 'lightgray',
           paddingBottom: 10
        },
     
        createdAt: {
           fontSize: 12,
           fontFamily: 'Optima',
           color: 'red'
        },
     
        messageRow: {
           flexDirection: 'row',
           backgroundColor: 'white',
           paddingTop: 10,
           paddingBottom: 10,
           width: '100%',
           height: 100,
           borderStyle: 'solid',
           borderColor: 'orange',
           borderTopWidth: 1
        }    
      } 

      let messageListItem = render(
         <IterableInboxMessageListItem 
            last={true}
            rowViewModel={rowViewModel}
            messageListItemLayout={messageListItemLayout}
            customizations={customizations}
            isPortrait={true}
         />
      )
   })

})