type Message = {
    campaignId: number,
    messageId: number,
    createdAt: string,
    expiresAt: string,
    content: {
       html: string,
       inAppDisplaySettings: {
          top: {
             percentage: number
          },
          right: {
             percentage: number
          },
          bottom: {
             percentage: number    
          },
          left: {
             percentage: number    
          }
       }   
    },
    saveToInbox: boolean,
    inboxMetadata: {
       title: string,
       subtitle: string,
       icon: string    
    },
    customPayload: any,
    read: boolean,
    priorityLevel: number,
    last: boolean
 }

 export default Message