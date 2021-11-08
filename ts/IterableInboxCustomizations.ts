type IterableInboxCustomizations = {
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

   unreadMessageIconContainer: {
      paddingLeft: number,
      flexDirection: string,
      justifyContent: string
   },

   readMessageIconContainer: {
      paddingLeft: number,
      flexDirection: string,
      justifyContent: string
   },

   messageContainer: {
      paddingLeft: number,
      width: string,
      flexDirection: string,
      justifyContent: string
   },

   title: {
      fontSize: number,
      paddingBottom: number
   },

   body: {
      fontSize: number,
      color: string,
      width: string,
      flexWrap: string,
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
   } | undefined
}

export default IterableInboxCustomizations