import React from 'react'
import MessageList, { flaggedMessage, displayMessages } from '../../inbox/components/MessageList/MessageList'
import MessageCell from '../../inbox/components/MessageCell/MessageCell'
import sampleMessages from '../../inbox/sampleMessageData.js' 

beforeEach(() => {
   jest.clearAllMocks()
})

describe('flaggedMessage function test', () => {
   it('renders message cell with true flag if message is last in the list', () => {
      const messages = sampleMessages
      const message = sampleMessages[sampleMessages.length - 1]
      const index = messages.length - 1
      const result = <MessageCell key={index} message={message} last={true}/>
      expect(flaggedMessage(messages, message, index)).toEqual(result)
   })
    
   it('enders message cell with false flag if message is not last in the list', () => {
      const messages = sampleMessages
      const message = sampleMessages[0]
      const index = 0
      const result = <MessageCell key={index} message={message} last={false}/>
      expect(flaggedMessage(messages, message, index)).toEqual(result)
   })
})

describe('displayMessages function test', () => {
    it('renders message list with appropriately flagged message', () => {
       const messages = sampleMessages.slice(0,3)
       const result = [
          <MessageCell key={0} message={messages[0]} last={false}/>, 
          <MessageCell key={1} message={messages[1]} last={false}/>, 
          <MessageCell key={2} message={messages[2]} last={true}/>
        ]
       expect(displayMessages(messages)).toEqual(result)
    })
 })