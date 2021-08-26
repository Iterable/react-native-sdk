type InboxCustomizations = {
   navTitle: string,
   noMessagesTitle: string,
   noMessagesBody: string,
 
   unreadIndicatorContainer: {
      height: string,
      flexDirection: string,
      justifyContent: string
   },
 
   unreadIndicator: { 
      width: number,
      height: number,
      borderRadius: number,
      backgroundColor: string,
      marginLeft: number,
      marginRight: number,
      marginTop: number
   },
 
   unreadMessageContainer: {
      paddingLeft: number
   },
 
   readMessageContainer: {
      paddingLeft: number
   },
 
   title: {
      fontSize: number,
      paddingBottom: number
   },
 
   body: {
      fontSize: number,
      color: string,
      paddingBottom: number
   },
 
   createdAt: {
      fontSize: number,
      color: string
   },
 
   messageRow: {
      flexDirection: string,
      backgroundColor: string,
      paddingTop: number,
      paddingBottom: number,
      width: string,
      height: number,
      borderStyle: string,
      borderColor: string,
      borderTopWidth: number
   }
}

export default InboxCustomization