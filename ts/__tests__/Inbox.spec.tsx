import React from 'react'
import Inbox, {showMessageList} from '../../inbox/Inbox'
import MessageList from '../../inbox/components/MessageList/MessageList'
import EmptyState from '../../inbox/components/EmptyState/EmptyState'
import sampleMessages from '../../inbox/sampleMessageData.js' 

import renderer from 'react-test-renderer'

beforeEach(() => {
   jest.clearAllMocks()
})

describe('Testing Inbox Component functionality', () => {
   it('Inbox renders correctly', () => {
      let component = renderer.create(
         <Inbox/>
      ).toJSON()
      expect(component).toMatchSnapshot()  
   })
})

describe('Testing showMessageList function', () => {
   it('renders message list when messages are present', () => {
      const messages = sampleMessages
      const result = <MessageList messages={sampleMessages}/>
      expect(showMessageList(messages)).toEqual(result)
   })
   
   it('renders empty state when there are no messages', () => {
      const messages = []
      const result = <EmptyState/>
      expect(showMessageList(messages)).toEqual(result)
   })
})